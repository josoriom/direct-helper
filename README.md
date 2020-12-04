# direct-manager

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

## Installation

`$ npm i direct-manager`

## Usage

```js
import direct from 'ml-direct';
import DirectManager from 'direct-manager';
import SD from 'spectra-data';

// The prediction should be obtained with SPINUS.
const directManager = new DirectManager(prediction);
const boundaries = directManager.getBoundaries();
const buildPredictionFile = directManager.tidyUpParameters();

const spectraProperties = {
  frequency: 400,
  from: 0,
  to: 10,
  lineWidth: 3,
  nbPoints: 4096,
  maxClusterSize: 8,
  output: 'xy',
};

const predicted = direct(
  objectiveFunction,
  boundaries.lower,
  boundaries.upper,
  { iterations: 10 },
);

// target: Experimental spectrum.
function objectiveFunction(parameters) {
  const testSignals = buildPredictionFile(parameters);
  const simulation = SD.NMR.fromSignals(testSignals, spectraProperties);
  simulation.setMinMax(0, 1);
  const simulated = simulation.getYData();
  let result = 0;
  for (let i = 0; i < target.length; i++) {
    result += (target[i] - simulated[i]) ** 2;
  }
  return result;
}

```

## Cheminfo tools

* [ml-direct](https://github.com/mljs/direct-optimization)
* [spectra-data](https://github.com/cheminfo-js/spectra/tree/master/packages/spectra-data)
* [nmr-predictor](https://github.com/cheminfo-js/spectra/tree/master/packages/nmr-predictor)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/direct-manager.svg
[npm-url]: https://www.npmjs.com/package/direct-manager
[ci-image]: https://github.com/josoriom/direct-manager/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/josoriom/direct-manager/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/josoriom/direct-manager.svg
[codecov-url]: https://codecov.io/gh/josoriom/direct-manager
[download-image]: https://img.shields.io/npm/dm/direct-manager.svg
[download-url]: https://www.npmjs.com/package/direct-manager
