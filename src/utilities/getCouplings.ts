import { Coupling } from '../types/Coupling';
import { ProtonSignal } from '../types/ProtonSignal';

/**
 * Returns the couplings in the prediction file.
 * @param {Array} json - Prediction obtained with SPINUS
 * @return {Array}
 */

export function getCouplings(json: ProtonSignal[]) {
  const predictions = json.slice();
  const parameters = [];
  for (const prediction of predictions) {
    for (const coupling of prediction.j) {
      const item: Coupling = { ids: [], coupling: 0 };
      item.ids = prediction.diaIDs.slice();
      item.ids.push(coupling.diaID);
      item.coupling = coupling.coupling;
      parameters.push(item);
    }
  }

  const test: number[] = [];
  const result = parameters.filter(function (currentValue: Coupling) {
    if (!test.find((item: number) => item === currentValue.coupling)) {
      test.push(currentValue.coupling);
      return true;
    } else {
      return false;
    }
  }, test);
  return result;
}
