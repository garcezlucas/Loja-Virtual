import { State } from "./State";

export interface City {
  id: number;
  name: string;
  state: State;
  creationDate: string | null;
  updateDate: string | null;
}
