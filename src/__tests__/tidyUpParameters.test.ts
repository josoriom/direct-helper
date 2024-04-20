import DirectManager from '..';
import deltaEthylVinylEther from '../../predictions/delta-ethyl-vinyl-ether.json';
import ethylAcetoacetate from '../../predictions/ethylAcetoacetate.json';
import ethylVinylEther from '../../predictions/ethylVinylEther.json';
import jCouplingEthylVinylEther from '../../predictions/jcoupling-ethyl-vinyl-ether.json';
import triethylamine from '../../predictions/triethylamine.json';
import uracil from '../../predictions/uracil.json';

describe('Test parameters extraction', () => {
  it('testing the uracil without coupling', () => {
    const directManager = new DirectManager(uracil);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([1, 2]);
    expect(predictionFile).toStrictEqual([
      {
        atomIDs: ['9'],
        diaIDs: ['dieD`DyaBYRYVZzffX@_iB@bUP'],
        nbAtoms: 1,
        delta: 1,
        atomLabel: 'H',
        js: [
          {
            assignment: ['8'],
            diaIDs: ['dieD`JXaBYRYgvzejX@_iB@bUP'],
            coupling: 10.804,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
        ],
        selected: true,
        multiplicity: 'd',
      },
      {
        atomIDs: ['8'],
        diaIDs: ['dieD`JXaBYRYgvzejX@_iB@bUP'],
        nbAtoms: 1,
        delta: 2,
        atomLabel: 'H',
        js: [
          {
            assignment: ['9'],
            diaIDs: ['dieD`DyaBYRYVZzffX@_iB@bUP'],
            coupling: 10.804,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
        ],
        selected: true,
        multiplicity: 'd',
      },
    ]);
  });

  it('Set parameters for triethylamine prediction file', () => {
    const directManager = new DirectManager(triethylamine);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([7.062, 2.511, 0.85]);
    expect(predictionFile).toStrictEqual([
      {
        atomIDs: ['10', '11', '12', '13', '17', '18'],
        diaIDs: ['daz@`DBYRYmjjhb`GzP`HeT'],
        nbAtoms: 6,
        delta: 2.511,
        atomLabel: 'H',
        js: [
          {
            assignment: ['7', '8', '9'],
            diaIDs: ['daz@`LBYRUejj`A~dHBIU@'],
            coupling: 7.062,
            multiplicity: 'q',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 'q',
        selected: true,
      },
      {
        atomIDs: ['7', '8', '9', '14', '15', '16', '19', '20', '21'],
        diaIDs: ['daz@`LBYRUejj`A~dHBIU@'],
        nbAtoms: 9,
        delta: 0.85,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10', '11'],
            diaIDs: ['daz@`DBYRYmjjhb`GzP`HeT'],
            coupling: 7.062,
            multiplicity: 't',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 't',
        selected: true,
      },
    ]);
  });

  it('Set parameters for prediction file of ethylAcetoacetate', () => {
    const directManager = new DirectManager(ethylAcetoacetate);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([1, 2, 3, 4]);
    expect(predictionFile).toStrictEqual([
      {
        atomIDs: ['14', '15'],
        diaIDs: ['dedL`Bi`f\\bbbfMSMTQPC}HPDRj@'],
        nbAtoms: 2,
        delta: 1,
        atomLabel: 'H',
        js: [],
        multiplicity: 's',
        selected: true,
      },
      {
        atomIDs: ['12', '13'],
        diaIDs: ['dedL`DhPfTf^vjffbJ@_iB@bUP'],
        nbAtoms: 2,
        delta: 2,
        atomLabel: 'H',
        js: [
          {
            assignment: ['9', '10', '11'],
            diaIDs: ['dedL`LhPfTeVvjff@GzP`HeT'],
            coupling: 7.115,
            multiplicity: 'q',
            distance: 3,
            selected: false,
          },
        ],
        multiplicity: 'q',
        selected: true,
      },
      {
        atomIDs: ['16', '17', '18'],
        diaIDs: ['dedL`L[`fTemmiij@GzP`HeT'],
        nbAtoms: 3,
        delta: 3,
        atomLabel: 'H',
        js: [],
        multiplicity: 's',
        selected: true,
      },
      {
        atomIDs: ['9', '10', '11'],
        diaIDs: ['dedL`LhPfTeVvjff@GzP`HeT'],
        nbAtoms: 3,
        delta: 4,
        atomLabel: 'H',
        js: [
          {
            assignment: ['12', '13'],
            diaIDs: ['dedL`DhPfTf^vjffbJ@_iB@bUP'],
            coupling: 7.115,
            multiplicity: 't',
            distance: 3,
            selected: false,
          },
        ],
        multiplicity: 't',
        selected: true,
      },
    ]);
  });

  it('Setting just jcouplings in prediction file of ethyl vinyl ether', () => {
    const directManager = new DirectManager(jCouplingEthylVinylEther);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([1, 2, 3, 4]);
    expect(predictionFile).toStrictEqual([
      {
        atomIDs: ['10'],
        diaIDs: ['gGQHDIeIgihA~dPHeT'],
        nbAtoms: 1,
        delta: 6.707,
        atomLabel: 'H',
        js: [
          {
            assignment: ['12'],
            diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
            coupling: 1,
            multiplicity: 'd',
            distance: 3,
            selected: true,
          },
          {
            assignment: ['11'],
            diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
            coupling: 2,
            multiplicity: 'd',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 'dd',
        selected: false,
      },
      {
        atomIDs: ['8', '9'],
        diaIDs: ['gGQHDIeIgjfR`OtbADj`'],
        nbAtoms: 2,
        delta: 3.919,
        atomLabel: 'H',
        js: [
          {
            assignment: ['5', '6', '7'],
            diaIDs: ['gGQHLIeIUjdA~dPHeT'],
            coupling: 3,
            multiplicity: 'q',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 'q',
        selected: false,
      },
      {
        atomIDs: ['12'],
        diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
        nbAtoms: 1,
        delta: 4.793,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10'],
            diaIDs: ['gGQHDIeIgihA~dPHeT'],
            coupling: 1,
            multiplicity: 'd',
            distance: 3,
            selected: true,
          },
          {
            assignment: ['11'],
            diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
            coupling: 4,
            multiplicity: 'd',
            distance: 2,
            selected: true,
          },
        ],
        multiplicity: 'dd',
        selected: false,
      },
      {
        atomIDs: ['11'],
        diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
        nbAtoms: 1,
        delta: 4.738,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10'],
            diaIDs: ['gGQHDIeIgihA~dPHeT'],
            coupling: 2,
            multiplicity: 'd',
            distance: 3,
            selected: true,
          },
          {
            assignment: ['12'],
            diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
            coupling: 4,
            multiplicity: 'd',
            distance: 2,
            selected: true,
          },
        ],
        multiplicity: 'dd',
        selected: false,
      },
      {
        atomIDs: ['5', '6', '7'],
        diaIDs: ['gGQHLIeIUjdA~dPHeT'],
        nbAtoms: 3,
        delta: 1.233,
        atomLabel: 'H',
        js: [
          {
            assignment: ['8', '9'],
            diaIDs: ['gGQHDIeIgjfR`OtbADj`'],
            coupling: 3,
            multiplicity: 't',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 't',
        selected: false,
      },
    ]);
  });

  it('Setting just chemical shifts in prediction file of ethyl vinyl ether', () => {
    const directManager = new DirectManager(deltaEthylVinylEther);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([1, 2, 3, 4, 5]);
    expect(predictionFile).toStrictEqual([
      {
        atomIDs: ['10'],
        diaIDs: ['gGQHDIeIgihA~dPHeT'],
        nbAtoms: 1,
        delta: 1,
        atomLabel: 'H',
        js: [
          {
            assignment: ['12'],
            diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
            coupling: 14.689,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
          {
            assignment: ['11'],
            diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
            coupling: 7.597,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
        ],
        multiplicity: 'dd',
        selected: true,
      },
      {
        atomIDs: ['8', '9'],
        diaIDs: ['gGQHDIeIgjfR`OtbADj`'],
        nbAtoms: 2,
        delta: 2,
        atomLabel: 'H',
        js: [
          {
            assignment: ['5', '6', '7'],
            diaIDs: ['gGQHLIeIUjdA~dPHeT'],
            coupling: 7.012,
            multiplicity: 'q',
            distance: 3,
            selected: false,
          },
        ],
        multiplicity: 'q',
        selected: true,
      },
      {
        atomIDs: ['12'],
        diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
        nbAtoms: 1,
        delta: 3,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10'],
            diaIDs: ['gGQHDIeIgihA~dPHeT'],
            coupling: 14.689,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
          {
            assignment: ['11'],
            diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
            coupling: 2.264,
            multiplicity: 'd',
            distance: 2,
            selected: false,
          },
        ],
        multiplicity: 'dd',
        selected: true,
      },
      {
        atomIDs: ['11'],
        diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
        nbAtoms: 1,
        delta: 4,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10'],
            diaIDs: ['gGQHDIeIgihA~dPHeT'],
            coupling: 7.597,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
          {
            assignment: ['12'],
            diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
            coupling: 2.264,
            multiplicity: 'd',
            distance: 2,
            selected: false,
          },
        ],
        multiplicity: 'dd',
        selected: true,
      },
      {
        atomIDs: ['5', '6', '7'],
        diaIDs: ['gGQHLIeIUjdA~dPHeT'],
        nbAtoms: 3,
        delta: 5,
        atomLabel: 'H',
        js: [
          {
            assignment: ['8', '9'],
            diaIDs: ['gGQHDIeIgjfR`OtbADj`'],
            coupling: 7.012,
            multiplicity: 't',
            distance: 3,
            selected: false,
          },
        ],
        multiplicity: 't',
        selected: true,
      },
    ]);
  });

  it('Setting random parameters in prediction file of ethyl vinyl ether', () => {
    const directManager = new DirectManager(ethylVinylEther);
    const configurationFunction = directManager.tidyUpParameters();
    const predictionFile = configurationFunction([1, 2, 3, 4]);
    expect(predictionFile).toStrictEqual([
      {
        atomIDs: ['10'],
        diaIDs: ['gGQHDIeIgihA~dPHeT'],
        nbAtoms: 1,
        delta: 3,
        atomLabel: 'H',
        js: [
          {
            assignment: ['12'],
            diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
            coupling: 14.689,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
          {
            assignment: ['11'],
            diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
            coupling: 1,
            multiplicity: 'd',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 'dd',
        selected: true,
      },
      {
        atomIDs: ['8', '9'],
        diaIDs: ['gGQHDIeIgjfR`OtbADj`'],
        nbAtoms: 2,
        delta: 4,
        atomLabel: 'H',
        js: [
          {
            assignment: ['5', '6', '7'],
            diaIDs: ['gGQHLIeIUjdA~dPHeT'],
            coupling: 2,
            multiplicity: 'q',
            distance: 3,
            selected: true,
          },
        ],
        multiplicity: 'q',
        selected: true,
      },
      {
        atomIDs: ['12'],
        diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
        nbAtoms: 1,
        delta: 4.793,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10'],
            diaIDs: ['gGQHDIeIgihA~dPHeT'],
            coupling: 14.689,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
          {
            assignment: ['11'],
            diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
            coupling: 2.264,
            multiplicity: 'd',
            distance: 2,
            selected: false,
          },
        ],
        multiplicity: 'dd',
        selected: false,
      },
      {
        atomIDs: ['11'],
        diaIDs: ['gGQHLIeIUfhRS}H`QJh'],
        nbAtoms: 1,
        delta: 4.738,
        atomLabel: 'H',
        js: [
          {
            assignment: ['10'],
            diaIDs: ['gGQHDIeIgihA~dPHeT'],
            coupling: 1,
            multiplicity: 'd',
            distance: 3,
            selected: false,
          },
          {
            assignment: ['12'],
            diaIDs: ['gGQHLIeIUfhRK}H`QJh'],
            coupling: 2.264,
            multiplicity: 'd',
            distance: 2,
            selected: false,
          },
        ],
        multiplicity: 'dd',
        selected: false,
      },
      {
        atomIDs: ['5', '6', '7'],
        diaIDs: ['gGQHLIeIUjdA~dPHeT'],
        nbAtoms: 3,
        delta: 1.233,
        atomLabel: 'H',
        js: [
          {
            assignment: ['8', '9'],
            diaIDs: ['gGQHDIeIgjfR`OtbADj`'],
            coupling: 2,
            multiplicity: 't',
            distance: 3,
            selected: false,
          },
        ],
        multiplicity: 't',
        selected: false,
      },
    ]);
  });
});
