import { Person } from "./Person";
import { Product } from "./Product";

interface ProductCart {
  id: number;
  price: number;
  quantity: number;
  product: Product;
  observation: string | null;
  creationDate: Date;
  updateDate: Date | null;
}

export interface ShopCart {
  id: number;
  acquisitionDate: Date;
  products: ProductCart[];
  observation: string;
  situation: "pending" | "done";
  person: Person;
  creationDate: Date;
  updateDate: Date;
}
