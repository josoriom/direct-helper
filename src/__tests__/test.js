import DirectManager from '..';
import prediction from '../../data/prediction.json';

describe('Test parameters extraction', () => {
  const directManager = new DirectManager(prediction);
  it('Extract parameters', () => {
    const parameters = directManager.getParameters();
    expect(parameters[0]).toStrictEqual({
      type: 'coupling',
      atom: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H1', 'H2'],
      value: 7.162,
    });

    expect(parameters[1]).toStrictEqual({
      type: 'delta',
      atom: ['daz@`DBYRYmjjhb`GzP`HeT'],
      atomIDs: ['H1'],
      value: 2.611,
    });

    expect(parameters[2]).toStrictEqual({
      type: 'delta',
      atom: ['daz@`LBYRUejj`A~dHBIU@'],
      atomIDs: ['H2'],
      value: 0.9500000000000001,
    });
  });

  it('Suggest boundaries twigTemplate', () => {
    const boundaries = directManager.getBoundaries(undefined, { error: 0.2 });
    expect(boundaries.lower).toStrictEqual([6.962, 2.411, 0.75]);
    expect(boundaries.upper).toStrictEqual([7.362, 2.811, 1.15]);
  });

  it('Should build boundaries', () => {
    const suggestedBoundaries = directManager.suggestBoundaries({ error: 0.2 });
    expect(suggestedBoundaries[0]).toStrictEqual({
      atom: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
      type: 'coupling',
      atomIDs: ['H1', 'H2'],
      lower: 6.962,
      upper: 7.362,
    });

    expect(suggestedBoundaries[1]).toStrictEqual({
      atom: ['daz@`DBYRYmjjhb`GzP`HeT'],
      type: 'delta',
      atomIDs: ['H1'],
      lower: 2.411,
      upper: 2.811,
    });

    expect(suggestedBoundaries[2]).toStrictEqual({
      atom: ['daz@`LBYRUejj`A~dHBIU@'],
      type: 'delta',
      atomIDs: ['H2'],
      lower: 0.75,
      upper: 1.15,
    });
  });

  it('Fill the prediction file', () => {
    const buildPredictionFile = directManager.tidyUpParameters();
    const result = buildPredictionFile([
      'Parameter 1',
      'Parameter 2',
      'Parameter 3',
    ]);

    expect(result[0]).toStrictEqual({
      atomIDs: ['10', '11', '12', '13', '17', '18'],
      diaIDs: ['daz@`DBYRYmjjhb`GzP`HeT'],
      nbAtoms: 6,
      delta: 'Parameter 2',
      atomLabel: 'H',
      j: [
        {
          assignment: ['7', '8', '9'],
          diaID: 'daz@`LBYRUejj`A~dHBIU@',
          coupling: 'Parameter 1',
          multiplicity: 'q',
          distance: 3,
        },
      ],
      multiplicity: 'q',
    });

    expect(result[1]).toStrictEqual({
      atomIDs: ['7', '8', '9', '14', '15', '16', '19', '20', '21'],
      diaIDs: ['daz@`LBYRUejj`A~dHBIU@'],
      nbAtoms: 9,
      delta: 'Parameter 3',
      atomLabel: 'H',
      j: [
        {
          assignment: ['10', '11'],
          diaID: 'daz@`DBYRYmjjhb`GzP`HeT',
          coupling: 'Parameter 1',
          multiplicity: 't',
          distance: 3,
        },
      ],
      multiplicity: 't',
    });
  });
});
