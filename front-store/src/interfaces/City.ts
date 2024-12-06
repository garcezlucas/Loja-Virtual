import { State } from "./State";

export interface City {
  id: number;
  name: string;
  state: State;
  creationDate: Date | null;
  updateDate: Date | null;
}
