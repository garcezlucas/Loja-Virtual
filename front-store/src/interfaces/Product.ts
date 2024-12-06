import { Brand } from "./Brand";
import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
  id: number;
  images: Image[];
  shortDescription: string;
  description: string;
  brand: Brand;
  category: Category;
  expense: number;
  price: number;
  creationDate: Date | null;
  updateDate: Date | null;
}
