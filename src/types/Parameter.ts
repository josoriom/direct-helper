export interface Parameter {
  atoms: string[];
  atomIDs: string[];
  value: {
    prediction: number;
    assessment: number;
    lower?: number;
    upper?: number;
    selected?: boolean;
  };
  type: string;
}
