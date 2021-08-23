import DirectManager from '..';
import ethylVinylEther from '../../predictions/ethylVinylEther.json';
import triethylamine from '../../predictions/triethylamine.json';

describe('Test parameters extraction', () => {
  it('Suggesting boundaries triethylamine prediction file', () => {
    const directManager = new DirectManager(triethylamine);
    const boundaries = directManager.suggestBoundaries();
    expect(boundaries[0]).toStrictEqual({
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      type: 'coupling',
      value: { prediction: 7.162, selected: true, lower: 7.062, upper: 7.262 },
      atomIDs: ['H1', 'H2'],
    });

    expect(boundaries[1]).toStrictEqual({
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT'],
      type: 'delta',
      value: { prediction: 2.611, selected: true, lower: 2.511, upper: 2.711 },
      atomIDs: ['H1'],
    });

    expect(boundaries[2]).toStrictEqual({
      atoms: ['daz@`LBYRUejj`A~dHBIU@'],
      type: 'delta',
      value: {
        prediction: 0.9500000000000001,
        selected: true,
        lower: 0.85,
        upper: 1.05,
      },
      atomIDs: ['H2'],
    });
  });

  it('Suggesting boundaries ethyl vinyl ether prediction file', () => {
    const directManager = new DirectManager(ethylVinylEther);
    const boundaries = directManager.suggestBoundaries();

    expect(boundaries[0]).toStrictEqual({
      atoms: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRK}H`QJh'],
      type: 'coupling',
      value: {
        prediction: 14.689,
        selected: false,
        lower: 14.589,
        upper: 14.789,
      },
      atomIDs: ['H1', 'H3'],
    });

    expect(boundaries[1]).toStrictEqual({
      atoms: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRS}H`QJh'],
      type: 'coupling',
      value: { prediction: 7.597, selected: true, lower: 7.497, upper: 7.697 },
      atomIDs: ['H1', 'H4'],
    });

    expect(boundaries[2]).toStrictEqual({
      atoms: ['gGQHDIeIgjfR`OtbADj`', 'gGQHLIeIUjdA~dPHeT'],
      type: 'coupling',
      value: { prediction: 7.012, selected: true, lower: 6.912, upper: 7.112 },
      atomIDs: ['H2', 'H5'],
    });

    expect(boundaries[3]).toStrictEqual({
      atoms: ['gGQHLIeIUfhRK}H`QJh', 'gGQHLIeIUfhRS}H`QJh'],
      type: 'coupling',
      value: { prediction: 2.264, selected: false, lower: 2.164, upper: 2.364 },
      atomIDs: ['H3', 'H4'],
    });

    expect(boundaries[4]).toStrictEqual({
      atoms: ['gGQHDIeIgihA~dPHeT'],
      type: 'delta',
      value: { prediction: 6.707, selected: true, lower: 6.607, upper: 6.807 },
      atomIDs: ['H1'],
    });

    expect(boundaries[5]).toStrictEqual({
      atoms: ['gGQHDIeIgjfR`OtbADj`'],
      type: 'delta',
      value: { prediction: 3.919, selected: true, lower: 3.819, upper: 4.019 },
      atomIDs: ['H2'],
    });

    expect(boundaries[6]).toStrictEqual({
      atoms: ['gGQHLIeIUfhRK}H`QJh'],
      type: 'delta',
      value: { prediction: 4.793, selected: false, lower: 4.693, upper: 4.893 },
      atomIDs: ['H3'],
    });

    expect(boundaries[7]).toStrictEqual({
      atoms: ['gGQHLIeIUfhRS}H`QJh'],
      type: 'delta',
      value: { prediction: 4.738, selected: false, lower: 4.638, upper: 4.838 },
      atomIDs: ['H4'],
    });

    expect(boundaries[8]).toStrictEqual({
      atoms: ['gGQHLIeIUjdA~dPHeT'],
      type: 'delta',
      value: { prediction: 1.233, selected: false, lower: 1.133, upper: 1.333 },
      atomIDs: ['H5'],
    });
  });
});
