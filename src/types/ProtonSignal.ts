export interface ProtonSignal {
  atomIDs: string[];
  diaIDs: string[];
  nbAtoms: number;
  delta: number;
  atomLabel: string;
  j: {
    assignment: string[];
    diaID: string;
    coupling: number;
    multiplicity: string;
    distance: number;
  }[];
  multiplicity: string;
}
