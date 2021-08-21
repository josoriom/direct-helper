import DirectManager from '..';
import ethylVinylEther from '../../predictions/ethylVinylEther.json';
import triethylamine from '../../predictions/triethylamine.json';

describe('Test parameters extraction', () => {
  it('Getting boundaries for triethylamine prediction file', () => {
    const directManager = new DirectManager(triethylamine);
    const boundaries = directManager.getBoundaries();
    expect(boundaries).toStrictEqual({
      lower: [7.062, 2.511, 0.85],
      upper: [7.262, 2.711, 1.05],
    });
  });

  it('Getting boundaries for ethyl vinyl ether prediction file. Ensuring that unselected parameters are not taken into account', () => {
    const directManager = new DirectManager(ethylVinylEther);
    const boundaries = directManager.getBoundaries();

    // This should be the result if all the parameters are taken into account
    // expect(boundaries).toStrictEqual({
    //   lower: [14.589, 7.497, 6.912, 2.164, 6.607, 3.819, 4.693, 4.638, 1.133],
    //   upper: [14.789, 7.697, 7.112, 2.364, 6.807, 4.019, 4.893, 4.838, 1.333],
    // });

    expect(boundaries).toStrictEqual({
      lower: [7.497, 6.912, 6.607, 3.819],
      upper: [7.697, 7.112, 6.807, 4.019],
    });
  });
});
