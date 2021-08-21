export interface Parameter {
  atom: string[];
  atomIDs: string[];
  lower?: number;
  upper?: number;
  value: number;
  type: string;
  selected?: boolean;
}
