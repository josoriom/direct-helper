import { Coupling } from '../types/Coupling';
import { Signal } from '../types/Signal';

/**
 * Returns the couplings in the prediction file.
 * @param {Array} json - Prediction obtained with SPINUS
 * @return {Array}
 */

export function getCouplings(json: Signal[]) {
  const predictions = JSON.parse(JSON.stringify(json));
  const parameters = [];
  for (const prediction of predictions) {
    for (const coupling of prediction.js) {
      const item: Coupling = { ids: [], coupling: 0, selected: true };
      item.ids = JSON.parse(JSON.stringify(prediction.diaIDs));
      item.ids.push(coupling.diaID);
      item.coupling = coupling.coupling;
      item.selected =
        typeof coupling.selected === 'boolean' ? coupling.selected : true;
      parameters.push(item);
    }
  }

  const test: number[] = [];
  const result = parameters.filter((currentValue: Coupling) => {
    if (!test.find((item: number) => item === currentValue.coupling)) {
      test.push(currentValue.coupling);
      return true;
    } else {
      return false;
    }
  }, test);
  return result;
}
