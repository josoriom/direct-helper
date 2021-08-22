export interface Molecule {
  label: string;
  mf?: string;
  smiles: string;
  spectrum: {
    x: number[];
    y: number[];
  };
  type: string;
}
