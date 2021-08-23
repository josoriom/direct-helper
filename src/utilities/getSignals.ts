import { Signal } from '../types/Signal';

/**
 * Returns the couplings in the prediction file.
 * @param {Array} json - Prediction obtained with SPINUS
 * @return {Array}
 */

export function getSignals(json: Signal[]) {
  const predictions = JSON.parse(JSON.stringify(json));
  for (const prediction of predictions) {
    prediction.selected =
      typeof prediction.selected === 'boolean' ? prediction.selected : true;
    for (const coupling of prediction.j) {
      coupling.selected =
        typeof coupling.selected === 'boolean' ? coupling.selected : true;
    }
  }
  return predictions;
}
