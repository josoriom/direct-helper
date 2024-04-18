export interface Signal {
  atomIDs: string[];
  diaIDs: string[];
  nbAtoms: number;
  delta: number;
  atomLabel: string;
  js: Array<{
    assignment: string[];
    diaID: string;
    coupling: number;
    multiplicity: string;
    distance: number;
    selected?: boolean;
  }>;
  multiplicity: string;
  selected?: boolean;
}
