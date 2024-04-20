import DirectManager from '..';
import valine from '../../predictions/valine.json';
import { Signal } from '../types/Signal';

describe('Test parameters extraction', () => {
  it('testing the valine without coupling', () => {
    const directManager = new DirectManager(valine as unknown as Signal[]);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([1, 2, 3, 4, 5, 6, 7]);
    expect(predictionFile).toStrictEqual([
      {
        nbAtoms: 3,
        delta: 4,
        diaIDs: ['defDPBAA`I@Df{iZhbcB@_iBRbUP'],
        atomIDs: [9, 10, 11],
        js: [
          {
            diaIDs: ['diFD`BAA@Df{ijhHp`GzP`heT'],
            distance: -1,
            multiplicity: 'd',
            coupling: 1,
            selected: true,
          },
        ],
        multiplicity: 'd',
        selected: true,
        _highlight: ['defDPBAA`I@Df{iZhbcB@_iBRbUP'],
      },
      {
        nbAtoms: 3,
        delta: 5,
        diaIDs: ['defDPBAA`I@Df{iZjBcB@_iBRbUP'],
        atomIDs: [16, 17, 18],
        js: [
          {
            diaIDs: ['diFD`BAA@Df{ijhHp`GzP`heT'],
            distance: -1,
            multiplicity: 'd',
            coupling: 2,
            selected: true,
          },
        ],
        selected: true,
        multiplicity: 'd',
        _highlight: ['defDPBAA`I@Df{iZjBcB@_iBRbUP'],
      },
      {
        nbAtoms: 1,
        delta: 6,
        diaIDs: ['diFD`BAA@Df{ijhHp`GzP`heT'],
        atomIDs: [8],
        js: [
          {
            coupling: 1,
            multiplicity: 'sept',
            diaIDs: ['defDPBAA`I@Df{iZhbcB@_iBRbUP'],
            distance: -1,
            selected: true,
          },
          {
            coupling: 2,
            multiplicity: 'sept',
            diaIDs: ['defDPBAA`I@Df{iZjBcB@_iBRbUP'],
            distance: -1,
            selected: true,
          },
          {
            coupling: 3,
            multiplicity: 'd',
            diaIDs: ['defDPBAF@I`DfzzZj`cB@_iBLbUP'],
            distance: -1,
            selected: true,
          },
        ],
        selected: true,
        multiplicity: 'septd',
        _highlight: ['diFD`BAA@Df{ijhHp`GzP`heT'],
      },
      {
        nbAtoms: 1,
        delta: 7,
        diaIDs: ['defDPBAF@I`DfzzZj`cB@_iBLbUP'],
        atomIDs: [12],
        js: [
          {
            diaIDs: ['diFD`BAA@Df{ijhHp`GzP`heT'],
            distance: -1,
            multiplicity: 'd',
            coupling: 3,
            selected: true,
          },
        ],
        multiplicity: 'd',
        selected: true,
        _highlight: ['defDPBAF@I`DfzzZj`cB@_iBLbUP'],
      },
    ]);
  });
});
