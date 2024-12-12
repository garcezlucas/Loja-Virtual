import FetchRequest from "../api/apiFetch";

export class PromotionsService {
  public static async getAllPromotions() {
    try {
      const url = `api/promotion/`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when searching all promotions : ${error}`);
    }
  }

  public static async createPromotion(promotion: {
    product: { id: number };
    isValid: boolean;
    discount: number;
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
    product: { id: number };
    isValid: boolean;
    discount: number;
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
