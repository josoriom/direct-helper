import { Boundaries } from './types/Boundaries';
import { Coupling } from './types/Coupling';
import { Molecule } from './types/Molecule';
import { Parameter } from './types/Parameter';
import { Signal } from './types/Signal';
import { getCouplings } from './utilities/getCouplings';
import { getSignals } from './utilities/getSignals';
import { roundTo } from './utilities/roundTo';

/**
 * DIviding RECTangles manager for NMR spectra optimization
 * @param {Array} prediction - Prediction obtained with SPINUS
 */
export default class DirectManager {
  public label?: string;
  public smiles?: string;
  public mf?: string;
  public spectrum?: {
    x: number[];
    y: number[];
  };
  public type?: string;
  public prediction: Signal[];
  public signals: Signal[];
  public couplings: Coupling[];
  public constructor(prediction: Signal[]) {
    this.prediction = JSON.parse(JSON.stringify(prediction));
    this.signals = getSignals(prediction);
    this.couplings = getCouplings(prediction);
    this.label = undefined;
    this.smiles = undefined;
    this.mf = undefined;
    this.spectrum = undefined;
    this.type = undefined;
  }

  public getSignals() {
    return this.signals;
  }

  public loadMolecule(molecule: Molecule) {
    this.label = molecule.label;
    this.smiles = molecule.smiles;
    this.mf = molecule.mf;
    this.spectrum = molecule.spectrum;
    this.type = molecule.type;
  }

  public getParameters() {
    const signals = this.signals.slice();
    const couplings = this.couplings.slice();
    let result: Parameter[] = [];
    for (const coupling of couplings) {
      result.push({
        type: 'coupling',
        atoms: coupling.ids,
        atomIDs: setAtomIDs(coupling.ids, signals),
        value: { prediction: coupling.coupling, selected: coupling.selected },
      });
    }
    for (const atom of signals) {
      result.push({
        type: 'delta',
        atoms: atom.diaIDs,
        atomIDs: setAtomIDs(atom.diaIDs, signals),
        value: { prediction: atom.delta, selected: atom.selected },
      });
    }
    return result;
  }

  public suggestBoundaries(options: Options = {}) {
    const parameters = this.getParameters();
    const { error = 0.1 } = options;
    const result: Parameter[] = [];
    for (const parameter of parameters) {
      let atom: Parameter = {
        atoms: parameter.atoms,
        type: parameter.type,
        value: {
          prediction: parameter.value.prediction,
          lower: roundTo(parameter.value.prediction - error),
          upper: roundTo(parameter.value.prediction + error),
          selected: parameter.value.selected,
        },
        atomIDs: parameter.atomIDs,
      };
      result.push(atom);
    }
    return result;
  }

  public getBoundaries(parameters?: Parameter[], options: Options = {}) {
    const { error = 0.1 } = options;
    this.signals = getSignals(this.prediction);
    parameters = parameters
      ? parameters
      : this.suggestBoundaries({ error: error });
    this.updateSignals(parameters);
    const result: Boundaries = { lower: [], upper: [] };
    for (const parameter of parameters) {
      if (!parameter.value.selected) continue;
      result.lower.push(parameter.value.lower as number);
      result.upper.push(parameter.value.upper as number);
    }
    return result;
  }

  public tidyUpParameters() {
    const result = this.signals.slice();
    const couplings = this.couplings.slice();
    let counter = 0;
    return function (parameters: number[]) {
      for (const coupling of couplings) {
        if (!coupling.selected) continue;
        coupling.coupling = parameters[counter++];
      }
      for (const atom of result) {
        const relatedAtoms = findCoupling(atom.diaIDs[0], couplings);
        if (atom.selected) {
          atom.delta = parameters[counter++];
        }

        for (const jcoupling of atom.j) {
          const coupling = findCoupling(jcoupling.diaID, relatedAtoms);
          jcoupling.coupling =
            coupling.length === 0 ? jcoupling.coupling : coupling[0].coupling;
        }
      }
      counter = 0;
      return result;
    };
  }

  public updateSignals(parameters?: Parameter[]) {
    if (parameters === undefined) return;
    for (const parameter of parameters) {
      const atoms = parameter.atoms;
      for (const atom of atoms) {
        const deltaIndex: number = this.signals.findIndex(
          (item: { diaIDs: string[] }) => item.diaIDs[0] === atom,
        );
        if (parameter.type === 'delta') {
          this.signals[deltaIndex].selected = parameter.value.selected;
        } else if (parameter.type === 'coupling') {
          const jId = atoms.filter((item) => item !== atom)[0];
          const jIndex = this.signals[deltaIndex].j.findIndex(
            (item) => item.diaID === jId,
          );
          this.signals[deltaIndex].j[jIndex].selected =
            parameter.value.selected;
        }
      }
    }
    this.couplings = getCouplings(this.signals);
  }
}

function findCoupling(id: string, couplings: Coupling[]) {
  const result: Coupling[] = [];
  for (let coupling of couplings) {
    for (let value of coupling.ids) {
      if (value === id) result.push(coupling);
    }
  }
  return result;
}

function setAtomIDs(atomIDs: string[], prediction: Signal[]) {
  const IDs = prediction.map((item) => item.diaIDs[0]);
  const result: string[] = [];
  for (const atomID of atomIDs) {
    const index = IDs.indexOf(atomID);
    result.push(`H${index + 1}`);
  }
  return result;
}

/**
 * @default options.error [0.001]
 */
interface Options {
  error?: number;
}
