/**
 * Returns the couplings in the prediction file.
 * @param {Array} json - Prediction obtained with SPINUS
 * @return {Array}
 */

export function getCouplings(json) {
  const prediction = json.slice();
  const parameters = [];
  for (let i = 0; i < prediction.length; i++) {
    for (let j = 0; j < prediction[i].j.length; j++) {
      const item = { ids: [], coupling: undefined };
      item.ids = prediction[i].diaIDs.slice();
      item.ids.push(prediction[i].j[j].diaID);
      item.coupling = prediction[i].j[j].coupling;
      parameters.push(item);
    }
  }

  const result = parameters.filter(function (currentValue) {
    if (!this.find((item) => item === currentValue.coupling)) {
      this.push(currentValue.coupling);
      return true;
    } else {
      return false;
    }
  }, []);
  return result;
}
