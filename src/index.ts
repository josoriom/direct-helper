import { Boundaries } from './types/Boundaries';
import { Coupling } from './types/Coupling';
import { Parameter } from './types/Parameter';
import { ProtonSignal } from './types/ProtonSignal';
import { getCouplings } from './utilities/getCouplings';
import { roundTo } from './utilities/roundTo';

/**
 * DIviding RECTangles manager for NMR spectra optimization
 * @param {Array} prediction - Prediction obtained with SPINUS
 */
export default class DirectManager {
  public prediction: ProtonSignal[];
  public couplings: Coupling[];
  public constructor(prediction: ProtonSignal[]) {
    this.prediction = prediction.slice();
    this.couplings = getCouplings(prediction);
  }

  public getParameters() {
    const prediction = this.prediction.slice();
    const couplings = this.couplings.slice();
    let result: Parameter[] = [];
    for (const coupling of couplings) {
      result.push({
        type: 'coupling',
        atom: coupling.ids,
        atomIDs: setAtomIDs(coupling.ids, prediction),
        value: coupling.coupling,
      });
    }
    for (const atom of prediction) {
      result.push({
        type: 'delta',
        atom: atom.diaIDs,
        atomIDs: setAtomIDs(atom.diaIDs, prediction),
        value: atom.delta,
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
        atom: parameter.atom,
        type: parameter.type,
        value: parameter.value,
        atomIDs: parameter.atomIDs,
        lower: roundTo(parameter.value - error),
        upper: roundTo(parameter.value + error),
      };
      result.push(atom);
    }
    return result;
  }

  public getBoundaries(parameters?: Parameter[], options: Options = {}) {
    const { error = 0.1 } = options;
    parameters = parameters
      ? parameters
      : this.suggestBoundaries({ error: error });
    const result: Boundaries = { lower: [], upper: [] };
    for (const parameter of parameters) {
      result.lower.push(parameter.lower as number);
      result.upper.push(parameter.upper as number);
    }
    return result;
  }

  public tidyUpParameters() {
    const result = this.prediction.slice();
    const couplings = this.couplings.slice();
    let counter = 0;
    return function (parameters: number[]) {
      for (let i = 0; i < couplings.length; i++) {
        couplings[i].coupling = parameters[i];
      }
      counter += couplings.length;
      for (const atom of result) {
        const relatedAtoms = findCoupling(atom.diaIDs[0], couplings);
        atom.delta = parameters[counter++];
        for (const jcoupling of atom.j) {
          const coupling = findCoupling(jcoupling.diaID, relatedAtoms);
          jcoupling.coupling = coupling[0] ? coupling[0].coupling : 0;
        }
      }
      counter = 0;
      return result;
    };
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

function setAtomIDs(atomIDs: string[], prediction: ProtonSignal[]) {
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
