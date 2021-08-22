import DirectManager from '..';
import ethylVinylEther from '../../predictions/ethylVinylEther.json';
import triethylamine from '../../predictions/triethylamine.json';

describe('Test parameters extraction', () => {
  it('Extract parameters triethylamine prediction file', () => {
    const directManager = new DirectManager(triethylamine);
    const parameters = directManager.getParameters();
    expect(triethylamine).toHaveLength(2);
    expect(parameters).toHaveLength(3);

    expect(parameters[0]).toStrictEqual({
      type: 'coupling',
      atom: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H1', 'H2'],
      value: { selected: true, prediction: 7.162 },
    });

    expect(parameters[1]).toStrictEqual({
      type: 'delta',
      atom: ['daz@`DBYRYmjjhb`GzP`HeT'],
      atomIDs: ['H1'],
      value: { selected: true, prediction: 2.611 },
    });

    expect(parameters[2]).toStrictEqual({
      type: 'delta',
      atom: ['daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H2'],
      value: { selected: true, prediction: 0.9500000000000001 },
    });
  });

  it('Extract parameters ethyl vinyl ether prediction file', () => {
    const directManager = new DirectManager(ethylVinylEther);
    const parameters = directManager.getParameters();
    expect(ethylVinylEther).toHaveLength(5);
    expect(parameters).toHaveLength(9);

    expect(parameters[0]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRK}H`QJh'],
      atomIDs: ['H1', 'H3'],
      value: { prediction: 14.689, selected: false },
    });

    expect(parameters[1]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H1', 'H4'],
      value: { prediction: 7.597, selected: true },
    });

    expect(parameters[2]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHDIeIgjfR`OtbADj`', 'gGQHLIeIUjdA~dPHeT'],
      atomIDs: ['H2', 'H5'],
      value: { selected: true, prediction: 7.012 },
    });

    expect(parameters[3]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHLIeIUfhRK}H`QJh', 'gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H3', 'H4'],
      value: { selected: false, prediction: 2.264 },
    });

    expect(parameters[4]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHDIeIgihA~dPHeT'],
      atomIDs: ['H1'],
      value: { selected: true, prediction: 6.707 },
    });

    expect(parameters[5]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHDIeIgjfR`OtbADj`'],
      atomIDs: ['H2'],
      value: { selected: true, prediction: 3.919 },
    });

    expect(parameters[6]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHLIeIUfhRK}H`QJh'],
      atomIDs: ['H3'],
      value: { selected: false, prediction: 4.793 },
    });

    expect(parameters[7]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H4'],
      value: { selected: false, prediction: 4.738 },
    });

    expect(parameters[8]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHLIeIUjdA~dPHeT'],
      atomIDs: ['H5'],
      value: { selected: false, prediction: 1.233 },
    });
  });
});
