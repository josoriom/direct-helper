import { getCouplings } from './utils/getCouplings';
import { roundTo } from './utils/roundTo';

/**
 * DIviding RECTangles manager for NMR spectra optimization
 * @param {Array} prediction - Prediction obtained with SPINUS
 */
export default class DirectManager {
  constructor(prediction) {
    this.prediction = prediction.slice();
    let parameters = [];
    for (let atom of prediction) {
      let item = {};
      item.delta = atom.delta;
      item.multiplicity = atom.multiplicity;
      item.j = [];
      for (let j of atom.j) {
        item.j.push(j.coupling);
      }
      parameters.push(item);
    }
    this.parameters = parameters;
  }

  getParameters() {
    return this.parameters;
  }

  suggestBoundaries(options = {}) {
    const parameters = this.parameters;
    const { error = 0.1 } = options;
    let result = [];
    for (let parameter of parameters) {
      let atom = {};
      atom.lowerDelta = roundTo(parameter.delta - error);
      atom.upperDelta = roundTo(parameter.delta + error);
      atom.lowerJcoupling = [];
      atom.upperJcoupling = [];
      for (let coupling of parameter.j) {
        atom.lowerJcoupling.push(roundTo(coupling - error));
        atom.upperJcoupling.push(roundTo(coupling + error));
      }
      result.push(atom);
    }
    return result;
  }

  getBoundaries(boundaries, options = {}) {
    let { error = 0.1 } = options;
    boundaries = boundaries
      ? boundaries
      : this.suggestBoundaries({ error: error });
    let result = { lower: [], upper: [] };
    for (let atom of boundaries) {
      result.lower.push(atom.lowerDelta);
      result.upper.push(atom.upperDelta);
      for (let i = 0; i < atom.lowerJcoupling.length; i++) {
        result.lower.push(atom.lowerJcoupling[i]);
        result.upper.push(atom.upperJcoupling[i]);
      }
    }
    return result;
  }

  tidyUpParameters() {
    let result = this.prediction.slice();
    let counter = 0;
    return function (parameters) {
      for (let atom of result) {
        atom.delta = parameters[counter++];
        for (let jcoupling of atom.j) {
          jcoupling.coupling = parameters[counter++];
        }
      }
      counter = 0;
      return result;
    };
  }

  getSimplifiedParameters() {
    let prediction = this.prediction.slice();
    let couplings = getCouplings(prediction);
    let result = [];
    for (let coupling of couplings) {
      result.push({
        type: 'coupling',
        atom: coupling.ids,
        value: coupling.coupling,
      });
    }
    for (let atom of prediction) {
      result.push({
        type: 'delta',
        atom: atom.diaIDs[0],
        value: atom.delta,
      });
    }
    return result;
  }

  suggestSimplifiedBoundaries(options = {}) {
    const parameters = this.getSimplifiedParameters();
    const { error = 0.1 } = options;
    let result = [];
    for (let parameter of parameters) {
      let atom = {};
      atom.atom = parameter.atom;
      atom.type = parameter.type;
      atom.lower = roundTo(parameter.value - error);
      atom.upper = roundTo(parameter.value + error);
      result.push(atom);
    }
    return result;
  }

  getSimplifiedBoundaries(boundaries, options = {}) {
    let { error = 0.1 } = options;
    boundaries = boundaries
      ? boundaries
      : this.suggestSimplifiedBoundaries({ error: error });
    let result = { lower: [], upper: [] };
    for (let parameter of boundaries) {
      result.lower.push(parameter.lower);
      result.upper.push(parameter.upper);
    }
    return result;
  }

  tidyUpSimplifiedParameters() {
    let result = this.prediction.slice();
    let couplings = getCouplings(result);
    let counter = 0;
    return function (parameters) {
      for (let i = 0; i < couplings.length; i++) {
        couplings[i].coupling = parameters[i];
      }
      counter += couplings.length;
      for (let atom of result) {
        let relatedAtoms = findAtom(atom.diaIDs[0], couplings);
        atom.delta = parameters[counter++];
        for (let jcoupling of atom.j) {
          jcoupling.coupling = findAtom(
            jcoupling.diaID,
            relatedAtoms,
          )[0].coupling;
        }
      }
      counter = 0;
      return result;
    };
  }
}

function findAtom(id, couplings) {
  return couplings.filter((item) => item.ids.find((element) => element === id));
}
