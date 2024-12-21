import { shopCart } from "@/interfaces/ShopCart";
import { CartDataService } from "@/service/Cart.service";

export const createShopCart = async (shopCart: shopCart) => {
  try {
    const cart = await CartDataService.createCart(shopCart);
    return cart;
  } catch (error) {
    console.error(`Erro ao criar carrinho de compras: ${error}`);
    throw new Error("Erro ao criar carrinho de compras.");
  }
};

export const getShopCartByUSer = async (userId: number) => {
  try {
    const cart = await CartDataService.getShopCartByUSer(userId);
    return cart;
  } catch (error) {
    console.error(`Erro ao buscar carrinho do usuário: ${error}`);
    throw new Error("Erro ao buscar carrinho do usuário.");
  }
};

/* export const addProductToShopCart = async (shopCart: shopCart) => {
    try {
      const cart = await CartDataService.addProductToShopCart(shopCart);
      return cart;
    } catch (error) {
      console.error(`Erro ao criar carrinho de compras: ${error}`);
      throw new Error("Erro ao criar carrinho de compras.");
    }
  }; */