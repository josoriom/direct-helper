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
      value: 7.162,
      selected: true,
    });

    expect(parameters[1]).toStrictEqual({
      type: 'delta',
      atom: ['daz@`DBYRYmjjhb`GzP`HeT'],
      atomIDs: ['H1'],
      value: 2.611,
      selected: true,
    });

    expect(parameters[2]).toStrictEqual({
      type: 'delta',
      atom: ['daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H2'],
      value: 0.9500000000000001,
      selected: true,
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
      value: 14.689,
      selected: false,
    });

    expect(parameters[1]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H1', 'H4'],
      value: 7.597,
      selected: true,
    });

    expect(parameters[2]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHDIeIgjfR`OtbADj`', 'gGQHLIeIUjdA~dPHeT'],
      atomIDs: ['H2', 'H5'],
      value: 7.012,
      selected: true,
    });

    expect(parameters[3]).toStrictEqual({
      type: 'coupling',
      atom: ['gGQHLIeIUfhRK}H`QJh', 'gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H3', 'H4'],
      value: 2.264,
      selected: false,
    });

    expect(parameters[4]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHDIeIgihA~dPHeT'],
      atomIDs: ['H1'],
      value: 6.707,
      selected: true,
    });

    expect(parameters[5]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHDIeIgjfR`OtbADj`'],
      atomIDs: ['H2'],
      value: 3.919,
      selected: true,
    });

    expect(parameters[6]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHLIeIUfhRK}H`QJh'],
      atomIDs: ['H3'],
      value: 4.793,
      selected: false,
    });

    expect(parameters[7]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H4'],
      value: 4.738,
      selected: false,
    });

    expect(parameters[8]).toStrictEqual({
      type: 'delta',
      atom: ['gGQHLIeIUjdA~dPHeT'],
      atomIDs: ['H5'],
      value: 1.233,
      selected: false,
    });
  });
});
