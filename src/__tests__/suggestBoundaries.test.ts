import DirectManager from '..';
import ethylVinylEther from '../../predictions/ethylVinylEther.json';
import triethylamine from '../../predictions/triethylamine.json';

describe('Test parameters extraction', () => {
  it('Suggesting boundaries triethylamine prediction file', () => {
    const directManager = new DirectManager(triethylamine);
    const boundaries = directManager.suggestBoundaries();
    expect(boundaries[0]).toStrictEqual({
      atom: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      type: 'coupling',
      value: 7.162,
      atomIDs: ['H1', 'H2'],
      selected: true,
      lower: 7.062,
      upper: 7.262,
    });

    expect(boundaries[1]).toStrictEqual({
      atom: ['daz@`DBYRYmjjhb`GzP`HeT'],
      type: 'delta',
      value: 2.611,
      atomIDs: ['H1'],
      selected: true,
      lower: 2.511,
      upper: 2.711,
    });

    expect(boundaries[2]).toStrictEqual({
      atom: ['daz@`LBYRUejj`A~dHBIU@'],
      type: 'delta',
      value: 0.9500000000000001,
      atomIDs: ['H2'],
      selected: true,
      lower: 0.85,
      upper: 1.05,
    });
  });

  it('Suggesting boundaries ethyl vinyl ether prediction file', () => {
    const directManager = new DirectManager(ethylVinylEther);
    const boundaries = directManager.suggestBoundaries();

    expect(boundaries[0]).toStrictEqual({
      atom: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRK}H`QJh'],
      type: 'coupling',
      value: 14.689,
      atomIDs: ['H1', 'H3'],
      selected: false,
      lower: 14.589,
      upper: 14.789,
    });

    expect(boundaries[1]).toStrictEqual({
      atom: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRS}H`QJh'],
      type: 'coupling',
      value: 7.597,
      atomIDs: ['H1', 'H4'],
      selected: true,
      lower: 7.497,
      upper: 7.697,
    });

    expect(boundaries[2]).toStrictEqual({
      atom: ['gGQHDIeIgjfR`OtbADj`', 'gGQHLIeIUjdA~dPHeT'],
      type: 'coupling',
      value: 7.012,
      atomIDs: ['H2', 'H5'],
      selected: true,
      lower: 6.912,
      upper: 7.112,
    });

    expect(boundaries[3]).toStrictEqual({
      atom: ['gGQHLIeIUfhRK}H`QJh', 'gGQHLIeIUfhRS}H`QJh'],
      type: 'coupling',
      value: 2.264,
      atomIDs: ['H3', 'H4'],
      selected: false,
      lower: 2.164,
      upper: 2.364,
    });

    expect(boundaries[4]).toStrictEqual({
      atom: ['gGQHDIeIgihA~dPHeT'],
      type: 'delta',
      value: 6.707,
      atomIDs: ['H1'],
      selected: true,
      lower: 6.607,
      upper: 6.807,
    });

    expect(boundaries[5]).toStrictEqual({
      atom: ['gGQHDIeIgjfR`OtbADj`'],
      type: 'delta',
      value: 3.919,
      atomIDs: ['H2'],
      selected: true,
      lower: 3.819,
      upper: 4.019,
    });

    expect(boundaries[6]).toStrictEqual({
      atom: ['gGQHLIeIUfhRK}H`QJh'],
      type: 'delta',
      value: 4.793,
      atomIDs: ['H3'],
      selected: false,
      lower: 4.693,
      upper: 4.893,
    });

    expect(boundaries[7]).toStrictEqual({
      atom: ['gGQHLIeIUfhRS}H`QJh'],
      type: 'delta',
      value: 4.738,
      atomIDs: ['H4'],
      selected: false,
      lower: 4.638,
      upper: 4.838,
    });

    expect(boundaries[8]).toStrictEqual({
      atom: ['gGQHLIeIUjdA~dPHeT'],
      type: 'delta',
      value: 1.233,
      atomIDs: ['H5'],
      selected: false,
      lower: 1.133,
      upper: 1.333,
    });
  });
});
