import { Product } from "@/interfaces/Product";
import { ProductsService } from "@/service/Products.service";

export const getProductsViewModel = async (): Promise<Product[]> => {
  try {
    const products = await ProductsService.getAllProducts();
    return products;
  } catch (error) {
    console.error(`Erro ao buscar produtos: ${error}`);
    throw new Error("Erro ao carregar produtos.");
  }
};

export const getProductsByCategoryViewModel = async (
  categoryId: string
): Promise<Product[]> => {
  try {
    const products = await ProductsService.getAllProductsByCategory(categoryId);
    return products;
  } catch (error) {
    console.error(`Erro ao buscar produtos por categoria: ${error}`);
    throw new Error("Erro ao carregar produtos por categoria.");
  }
};

export const getProductViewModel = async (id: string): Promise<Product> => {
  try {
    const product = await ProductsService.getProduct(id);
    return product;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}: ${error}`);
    throw new Error("Erro ao carregar produto.");
  }
};
