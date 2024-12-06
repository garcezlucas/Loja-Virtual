import FetchRequest from "../api/apiFetch";

export class CategoriesService {
  public static async getAllCategories() {
    try {
      const url = `api/category/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all cities : ${error}`);
    }
  }

  public static async createCategory(category: { name: string }) {
    try {
      const url = `api/category/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(category),
      });
    } catch (error) {
      throw new Error(`error when crate category : ${error}`);
    }
  }

  public static async updateCategory(category: { id: number; name: string }) {
    try {
      const url = `api/category/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(category),
      });
    } catch (error) {
      throw new Error(`error when crate category : ${error}`);
    }
  }

  public static async deleteCategory(id: number) {
    try {
      const url = `api/category/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete category : ${error}`);
    }
  }
}
