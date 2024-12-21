import { Person } from "./Person";
import { Product } from "./Product";

export interface shopCart {
  id: number;
  acquisitionDate: Date;
  products: Product[];
  observation: string;
  situation: "pending" | "done";
  person: Person;
  creationDate: Date;
  updateDate: Date;
}
