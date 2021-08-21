import triethylamine from '../../../predictions/triethylamine.json';
import { getCouplings } from '../getCouplings';

describe('Test parameters extraction', () => {
  const couplings = getCouplings(triethylamine);
  it('Extract couplings information', () => {
    expect(couplings).toStrictEqual([
      {
        coupling: 7.162,
        ids: ['daz@`DBYRYmjjhb`GzP`HeT', 'daz@`LBYRUejj`A~dHBIU@'],
        selected: true,
      },
    ]);
  });
});
