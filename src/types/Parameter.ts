export interface Parameter {
  atoms: Array<string | number>;
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
