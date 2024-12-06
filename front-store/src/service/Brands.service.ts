import FetchRequest from "../api/apiFetch";

export class BrandService {
  public static async getAllBrands() {
    try {
      const url = `api/brand/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all cities : ${error}`);
    }
  }

  public static async createBrand(brand: { name: string }) {
    try {
      const url = `api/brand/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(brand),
      });
    } catch (error) {
      throw new Error(`error when crate brand : ${error}`);
    }
  }

  public static async updateBrand(brand: { id: number; name: string }) {
    try {
      const url = `api/brand/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(brand),
      });
    } catch (error) {
      throw new Error(`error when crate brand : ${error}`);
    }
  }

  public static async deleteBrand(id: number) {
    try {
      const url = `api/brand/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete brand : ${error}`);
    }
  }
}
