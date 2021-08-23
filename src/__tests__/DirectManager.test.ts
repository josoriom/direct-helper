import DirectManager from '..';
import triethylamine from '../../predictions/triethylamine.json';

describe('Test parameters extraction', () => {
  const directManager = new DirectManager(triethylamine);
  it('Extract parameters', () => {
    const parameters = directManager.getParameters();
    expect(parameters[0]).toStrictEqual({
      type: 'coupling',
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H1', 'H2'],
      value: { selected: true, prediction: 7.162 },
    });

    expect(parameters[1]).toStrictEqual({
      type: 'delta',
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT'],
      atomIDs: ['H1'],
      value: { selected: true, prediction: 2.611 },
    });

    expect(parameters[2]).toStrictEqual({
      type: 'delta',
      atoms: ['daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H2'],
      value: { selected: true, prediction: 0.9500000000000001 },
    });
  });

  it('Suggest boundaries twigTemplate', () => {
    const boundaries = directManager.getBoundaries(undefined, {
      error: 0.2,
    });
    expect(boundaries.lower).toStrictEqual([6.962, 2.411, 0.75]);
    expect(boundaries.upper).toStrictEqual([7.362, 2.811, 1.15]);
  });

  it('Should build boundaries', () => {
    const suggestedBoundaries = directManager.suggestBoundaries({ error: 0.2 });
    expect(suggestedBoundaries[0]).toStrictEqual({
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      type: 'coupling',
      atomIDs: ['H1', 'H2'],
      value: {
        prediction: 7.162,
        lower: 6.962,
        upper: 7.362,
        selected: true,
      },
    });

    expect(suggestedBoundaries[1]).toStrictEqual({
      atoms: ['daz@`DBYRYmjjhb`GzP`HeT'],
      type: 'delta',
      atomIDs: ['H1'],
      value: {
        prediction: 2.611,
        lower: 2.411,
        upper: 2.811,
        selected: true,
      },
    });

    expect(suggestedBoundaries[2]).toStrictEqual({
      atoms: ['daz@`LBYRUejj`A~dHBIU@'],
      type: 'delta',
      atomIDs: ['H2'],
      value: {
        prediction: 0.9500000000000001,
        lower: 0.75,
        upper: 1.15,
        selected: true,
      },
    });
  });

  it('Fill the prediction file', () => {
    const buildPredictionFile = directManager.tidyUpParameters();
    const result = buildPredictionFile([1, 2, 3]);

    expect(result[0]).toStrictEqual({
      atomIDs: ['10', '11', '12', '13', '17', '18'],
      diaIDs: ['daz@`DBYRYmjjhb`GzP`HeT'],
      nbAtoms: 6,
      delta: 2,
      atomLabel: 'H',
      j: [
        {
          assignment: ['7', '8', '9'],
          diaID: 'daz@`LBYRUejj`A~dHBIU@',
          coupling: 1,
          multiplicity: 'q',
          distance: 3,
          selected: true,
        },
      ],
      multiplicity: 'q',
      selected: true,
    });

    expect(result[1]).toStrictEqual({
      atomIDs: ['7', '8', '9', '14', '15', '16', '19', '20', '21'],
      diaIDs: ['daz@`LBYRUejj`A~dHBIU@'],
      nbAtoms: 9,
      delta: 3,
      atomLabel: 'H',
      j: [
        {
          assignment: ['10', '11'],
          diaID: 'daz@`DBYRYmjjhb`GzP`HeT',
          coupling: 1,
          multiplicity: 't',
          distance: 3,
          selected: true,
        },
      ],
      multiplicity: 't',
      selected: true,
    });
  });
});
