/**
 * Returns the number with the decimal places specified in the options
 * @param {number} number - The number to be rounded.
 * @param {Object} [options={}]
 * @param {number} [options.decimals] - Number of decimals.
 * @return {number}
 */

export function roundTo(number, options = {}) {
  const { decimals = 4 } = options;
  const power = 10 ** decimals;
  return Math.round(number * power) / power;
}
