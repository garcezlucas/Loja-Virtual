import FetchRequest from "../api/apiFetch";

export class ProductsService {
  public static async getAllProducts() {
    try {
      const url = `api/product/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error(`error when searching all products : ${error}`);
    }
  }

  public static async getAllProductsByCategory(categoryId: string) {
    try {
      const url = `api/product/category/${categoryId}`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error(`error when searching all products : ${error}`);
    }
  }

  public static async getProduct(id: string) {
    try {
      const url = `api/product/${id}`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error(`error when searching product ${id}: ${error}`);
    }
  }

  public static async createProduct(product: {
    shortDescription: string;
    description: string;
    brand: { id: number };
    category: { id: number };
    expense: number;
    price: number;
  }) {
    try {
      const url = `api/product/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(product),
      });
    } catch (error) {
      throw new Error(`error when crate product : ${error}`);
    }
  }

  public static async updateProduct(product: {
    id: number;
    shortDescription: string;
    description: string;
    brand: { id: number };
    category: { id: number };
    expense: number;
    price: number;
  }) {
    try {
      const url = `api/product/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(product),
      });
    } catch (error) {
      throw new Error(`error when crate product : ${error}`);
    }
  }

  public static async deleteProduct(id: number) {
    try {
      const url = `api/product/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete product : ${error}`);
    }
  }
}
