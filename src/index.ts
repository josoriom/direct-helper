import { getTransform } from 'integral-transforms';

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
  public parameters: Parameter[];
  public constructor(prediction: Signal[]) {
    this.prediction = JSON.parse(JSON.stringify(prediction));
    this.signals = getSignals(prediction);
    this.couplings = getCouplings(prediction);
    this.parameters = [];
    this.label = undefined;
    this.smiles = undefined;
    this.mf = undefined;
    this.spectrum = undefined;
    this.type = undefined;
  }

  public getSignals() {
    return this.signals;
  }

  public getDummyTarget(options: ITOptions = {}) {
    const { kernelLength = 7 } = options;
    const spectrum = this.spectrum?.y;
    const y = getTransform(spectrum as number[], {
      kernelLength,
    });
    return {
      x: this.spectrum?.x as number[],
      y,
    };
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
    let parameters: Parameter[] = [];
    for (const coupling of couplings) {
      parameters.push({
        type: 'coupling',
        atoms: coupling.ids,
        atomIDs: setAtomIDs(coupling.ids, signals),
        value: {
          prediction: coupling.coupling,
          assessment: coupling.coupling,
          selected: coupling.selected,
        },
      });
    }
    for (const atom of signals) {
      parameters.push({
        type: 'delta',
        atoms: atom.diaIDs,
        atomIDs: setAtomIDs(atom.diaIDs, signals),
        value: {
          prediction: atom.delta,
          assessment: atom.delta,
          selected: atom.selected,
        },
      });
    }
    this.parameters = parameters;
    return parameters;
  }

  public suggestBoundaries(options: ErrorOption = {}) {
    const parameters = this.getParameters();
    const { error = 0.1 } = options;
    const result: Parameter[] = [];
    for (const parameter of parameters) {
      let atom: Parameter = {
        atoms: parameter.atoms,
        type: parameter.type,
        value: {
          prediction: parameter.value.prediction,
          assessment: parameter.value.prediction,
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

  public getBoundaries(
    parameters?: Parameter[] | any[],
    options: ErrorOption = {},
  ) {
    const { error = 0.1 } = options;
    this.signals = getSignals(this.prediction);
    if (parameters) {
      const currentParameters = this.getParameters();
      for (let i = 0; i < parameters.length; i++) {
        currentParameters[i].value.assessment = parameters[i].assessment;
        currentParameters[i].value.selected = parameters[i].selected;
        currentParameters[i].value.lower = parameters[i].lower;
        currentParameters[i].value.upper = parameters[i].upper;
      }
      this.parameters = currentParameters;
    } else {
      this.parameters = this.suggestBoundaries({ error });
    }
    this.updateSignals(this.parameters);
    const result: Boundaries = { lower: [], upper: [] };
    for (const parameter of this.parameters) {
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
    return (parameters: number[]) => {
      for (const coupling of couplings) {
        if (!coupling.selected) continue;
        coupling.coupling = parameters[counter];
        counter++;
      }
      for (const atom of result) {
        const relatedAtoms = findCoupling(atom.diaIDs[0], couplings);
        if (atom.selected) {
          atom.delta = parameters[counter];
          counter++;
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
      const deltaIndex: number = this.signals.findIndex(
        (item: { diaIDs: string[] }) => item.diaIDs[0] === atoms[0],
      );
      if (parameter.type === 'delta') {
        this.signals[deltaIndex].selected = parameter.value.selected;
        this.signals[deltaIndex].delta = parameter.value.assessment;
      } else if (parameter.type === 'coupling') {
        const jOneIndex = getCouplingIndex(
          atoms[1],
          parameter.value.prediction,
          this.prediction[deltaIndex].j,
        );
        const delta2Index: number = this.signals.findIndex(
          (item: { diaIDs: string[] }) => item.diaIDs[0] === atoms[1],
        );
        const jTwoIndex = getCouplingIndex(
          atoms[0],
          parameter.value.prediction,
          this.prediction[delta2Index].j,
        );
        for (const index of jOneIndex) {
          this.signals[deltaIndex].j[index].selected = parameter.value.selected;
          this.signals[deltaIndex].j[index].coupling =
            parameter.value.assessment;
        }

        for (const index of jTwoIndex) {
          this.signals[delta2Index].j[index].selected =
            parameter.value.selected;
          this.signals[delta2Index].j[index].coupling =
            parameter.value.assessment;
        }
      }
    }
    this.couplings = getCouplings(this.signals);
  }
}

function getCouplingIndex(
  id: string,
  value: number,
  couplings: {
    assignment: string[];
    coupling: number;
    diaID: string;
    distance: number;
    multiplicity: string;
    selected?: boolean;
  }[],
): number[] {
  let counter = 0;
  let couplingId = [];
  for (let coupling of couplings) {
    if (coupling.diaID === id) {
      if (coupling.coupling === value) {
        couplingId.push(counter);
        continue;
      }
      if (coupling.coupling.toPrecision(2) === value.toPrecision(2)) {
        couplingId.push(counter);
      }
    }
    counter++;
  }
  return couplingId;
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
interface ErrorOption {
  error?: number;
}

/**
 * Integral transforms options
 */
interface ITOptions {
  shape?: string;
  kernelLength?: number;
  nbPoints?: number;
  shapeOptions?: {
    width: number;
    height: number;
    center: number;
  };
}
