import { roundTo } from './utils/roundTo';

/**
 * DIviding RECTangles manager for NMR spectra optimization
 * @param {Array} prediction - Prediction obtained with SPINUS
 */
export default class DirectManager {
  constructor(prediction) {
    this.prediction = prediction;
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
}
