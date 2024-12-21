import FetchRequest from "@/api/apiFetch";
import { ShopCart } from "@/interfaces/ShopCart";

export class CartDataService {
  public static async createCart(cart: ShopCart) {
    try {
      const url = `api/cart/`;

      return await FetchRequest(url, {
        method: "POST",
        body: JSON.stringify(cart),
      });
    } catch (error) {
      throw new Error(`error when create shop cart : ${error}`);
    }
  }

  public static async getShopCartByUSer(userId: number) {
    try {
      const url = `api/cart/${userId}`;

      return await FetchRequest(url, {
        method: "GET",
      });
    } catch (error) {
      throw new Error(`error when get shop cart by userId : ${error}`);
    }
  }
}
