import { Brand } from "./Brand";
import { Category } from "./Category";

export interface Product {
  id: number;
  shortDescription: string;
  description: string;
  brand: Brand;
  category: Category;
  expense: number;
  price: number;
  creationDate: Date | null;
  updateDate: Date | null;
}
