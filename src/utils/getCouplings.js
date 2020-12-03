/**
 * Returns the couplings in the prediction file.
 * @param {Array} prediction - Prediction obtained with SPINUS
 * @return {Array}
 */

export function getCouplings(prediction) {
  prediction = prediction.slice();
  let parameters = [];
  for (let i = 0; i < prediction.length; i++) {
    for (let j = 0; j < prediction[i].j.length; j++) {
      let item = { ids: [], coupling: undefined };
      item.ids = prediction[i].diaIDs.slice();
      item.ids.push(prediction[i].j[j].diaID);
      item.coupling = prediction[i].j[j].coupling;
      parameters.push(item);
    }
  }

  let result = parameters.filter(function (currentValue) {
    if (!this.find((item) => item === currentValue.coupling)) {
      this.push(currentValue.coupling);
      return true;
    } else {
      return false;
    }
  }, []);
  return result;
}
