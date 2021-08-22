export interface Parameter {
  atom: string[];
  atomIDs: string[];
  value: {
    prediction: number;
    lower?: number;
    upper?: number;
    selected?: boolean;
  };
  type: string;
}
