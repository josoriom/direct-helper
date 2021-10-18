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
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H1', 'H2'],
      value: { prediction: 7.162, assessment: 7.162, selected: true },
    });

    expect(parameters[1]).toStrictEqual({
      type: 'delta',
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT'],
      atomIDs: ['H1'],
      value: { prediction: 2.611, assessment: 2.611, selected: true },
    });

    expect(parameters[2]).toStrictEqual({
      type: 'delta',
      atoms: ['daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H2'],
      value: {
        prediction: 0.9500000000000001,
        assessment: 0.9500000000000001,
        selected: true,
      },
    });
  });

  it('Extract parameters ethyl vinyl ether prediction file', () => {
    const directManager = new DirectManager(ethylVinylEther);
    const parameters = directManager.getParameters();
    expect(ethylVinylEther).toHaveLength(5);
    expect(parameters).toHaveLength(9);

    expect(parameters[0]).toStrictEqual({
      type: 'coupling',
      atoms: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRK}H`QJh'],
      atomIDs: ['H1', 'H3'],
      value: { prediction: 14.689, assessment: 14.689, selected: false },
    });

    expect(parameters[1]).toStrictEqual({
      type: 'coupling',
      atoms: ['gGQHDIeIgihA~dPHeT', 'gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H1', 'H4'],
      value: { prediction: 7.597, assessment: 7.597, selected: true },
    });

    expect(parameters[2]).toStrictEqual({
      type: 'coupling',
      atoms: ['gGQHDIeIgjfR`OtbADj`', 'gGQHLIeIUjdA~dPHeT'],
      atomIDs: ['H2', 'H5'],
      value: { prediction: 7.012, assessment: 7.012, selected: true },
    });

    expect(parameters[3]).toStrictEqual({
      type: 'coupling',
      atoms: ['gGQHLIeIUfhRK}H`QJh', 'gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H3', 'H4'],
      value: { prediction: 2.264, assessment: 2.264, selected: false },
    });

    expect(parameters[4]).toStrictEqual({
      type: 'delta',
      atoms: ['gGQHDIeIgihA~dPHeT'],
      atomIDs: ['H1'],
      value: { prediction: 6.707, assessment: 6.707, selected: true },
    });

    expect(parameters[5]).toStrictEqual({
      type: 'delta',
      atoms: ['gGQHDIeIgjfR`OtbADj`'],
      atomIDs: ['H2'],
      value: { prediction: 3.919, assessment: 3.919, selected: true },
    });

    expect(parameters[6]).toStrictEqual({
      type: 'delta',
      atoms: ['gGQHLIeIUfhRK}H`QJh'],
      atomIDs: ['H3'],
      value: { prediction: 4.793, assessment: 4.793, selected: false },
    });

    expect(parameters[7]).toStrictEqual({
      type: 'delta',
      atoms: ['gGQHLIeIUfhRS}H`QJh'],
      atomIDs: ['H4'],
      value: { prediction: 4.738, assessment: 4.738, selected: false },
    });

    expect(parameters[8]).toStrictEqual({
      type: 'delta',
      atoms: ['gGQHLIeIUjdA~dPHeT'],
      atomIDs: ['H5'],
      value: { prediction: 1.233, assessment: 1.233, selected: false },
    });
  });
});
