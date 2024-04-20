export interface Signal {
  atomIDs: Array<string | number>;
  diaIDs: Array<string | number>;
  nbAtoms: number;
  delta: number;
  atomLabel?: string;
  js: Array<{
    assignment?: string[];
    diaIDs: Array<string | number>;
    coupling: number;
    multiplicity: string;
    distance: number;
    selected?: boolean;
  }>;
  multiplicity: string;
  selected?: boolean;
}
