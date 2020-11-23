import DirectManager from '..';
import prediction from './prediction/test.json';

describe('test myModule', () => {
  const directManager = new DirectManager(prediction);
  it('It should extract parameters', () => {
    const parameters = directManager.getParameters();
    expect(parameters[0]).toStrictEqual({
      delta: 2.611,
      multiplicity: 'q',
      j: [7.162],
    });

    expect(parameters[1]).toStrictEqual({
      delta: 0.9500000000000001,
      multiplicity: 't',
      j: [7.162],
    });
  });

  it('It should suggest boundaries twigTemplate', () => {
    const boundaries = directManager.getBoundaries({ error: 0.2 });
    expect(boundaries.lower).toStrictEqual([2.411, 6.962, 0.75, 6.962]);
    expect(boundaries.upper).toStrictEqual([2.811, 7.362, 1.15, 7.362]);
  });

  it('It should build boundaries', () => {
    const suggestedBoundaries = directManager.suggestBoundaries({ error: 0.2 });
    expect(suggestedBoundaries[0]).toStrictEqual({
      lowerDelta: 2.411,
      upperDelta: 2.811,
      lowerJcoupling: [6.962],
      upperJcoupling: [7.362],
    });

    expect(suggestedBoundaries[1]).toStrictEqual({
      lowerDelta: 0.75,
      upperDelta: 1.15,
      lowerJcoupling: [6.962],
      upperJcoupling: [7.362],
    });
  });
});
