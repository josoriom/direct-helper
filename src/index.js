import { getCouplings } from './utils/getCouplings';
import { roundTo } from './utils/roundTo';

/**
 * DIviding RECTangles manager for NMR spectra optimization
 * @param {Array} prediction - Prediction obtained with SPINUS
 */
export default class DirectManager {
  constructor(prediction) {
    this.prediction = prediction.slice();
    this.couplings = getCouplings(prediction);
  }

  getParameters() {
    let prediction = this.prediction.slice();
    let couplings = this.couplings.slice();
    let result = [];
    for (let coupling of couplings) {
      result.push({
        type: 'coupling',
        atom: coupling.ids,
        atomIDs: setAtomIDs(coupling.ids, prediction),
        value: coupling.coupling,
      });
    }
    for (let atom of prediction) {
      result.push({
        type: 'delta',
        atom: atom.diaIDs,
        atomIDs: setAtomIDs(atom.diaIDs, prediction),
        value: atom.delta,
      });
    }
    return result;
  }

  suggestBoundaries(options = {}) {
    const parameters = this.getParameters();
    const { error = 0.1 } = options;
    let result = [];
    for (let parameter of parameters) {
      let atom = {};
      atom.atom = parameter.atom;
      atom.type = parameter.type;
      atom.atomIDs = parameter.atomIDs;
      atom.lower = roundTo(parameter.value - error);
      atom.upper = roundTo(parameter.value + error);
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
    for (let parameter of boundaries) {
      result.lower.push(parameter.lower);
      result.upper.push(parameter.upper);
    }
    return result;
  }

  tidyUpParameters() {
    let result = this.prediction.slice();
    let couplings = this.couplings.slice();
    let counter = 0;
    return function (parameters) {
      for (let i = 0; i < couplings.length; i++) {
        couplings[i].coupling = parameters[i];
      }
      counter += couplings.length;
      for (let atom of result) {
        let relatedAtoms = findCoupling(atom.diaIDs[0], couplings);
        atom.delta = parameters[counter++];
        for (let jcoupling of atom.j) {
          const coupling = findCoupling(jcoupling.diaID, relatedAtoms);
          jcoupling.coupling = coupling[0] ? coupling[0].coupling : [];
        }
      }
      counter = 0;
      return result;
    };
  }
}

function findCoupling(id, couplings) {
  let result = [];
  for (let coupling of couplings) {
    for (let value of coupling.ids) {
      if (value === id) result.push(coupling);
    }
  }
  return result;
}

function setAtomIDs(atomIDs, prediction) {
  let IDs = prediction.map((item) => item.diaIDs[0]);
  let result = [];
  for (let atomID of atomIDs) {
    let index = IDs.indexOf(atomID);
    result.push(`H${index + 1}`);
  }
  return result;
}
