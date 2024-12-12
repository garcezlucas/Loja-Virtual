import FetchRequest from "../api/apiFetch";

export class PromotionsService {
  public static async getAllPromotions() {
    try {
      const url = `api/promotion/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error(`error when searching all promotions : ${error}`);
    }
  }

  public static async getPromotion(id: string) {
    try {
      const url = `api/promotion/${id}`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      console.error(`error when searching promotion ${id}: ${error}`);
    }
  }

  public static async createPromotion(promotion: {
    shortDescription: string;
    description: string;
    brand: { id: number };
    category: { id: number };
    expense: number;
    price: number;
  }) {
    try {
      const url = `api/promotion/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(promotion),
      });
    } catch (error) {
      throw new Error(`error when crate promotion : ${error}`);
    }
  }

  public static async updatePromotion(promotion: {
    id: number;
    shortDescription: string;
    description: string;
    brand: { id: number };
    category: { id: number };
    expense: number;
    price: number;
  }) {
    try {
      const url = `api/promotion/`;

      return await FetchRequest(url, {
        method: "PUT",
        body: JSON.stringify(promotion),
      });
    } catch (error) {
      throw new Error(`error when crate promotion : ${error}`);
    }
  }

  public static async deletePromotion(id: number) {
    try {
      const url = `api/promotion/${id}`;

      return await FetchRequest(url, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(`error when delete promotion : ${error}`);
    }
  }
}
