import { Product } from "./Product";

export interface Promotion {
    id: number;
    product: Product;
    isValid: boolean;
    discount: number;
    creationDate: Date | null;
    updateDate: Date | null;
}