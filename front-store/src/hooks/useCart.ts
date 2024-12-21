import { ShopCart } from "@/interfaces/ShopCart";
import { CartDataService } from "@/service/Cart.service";

export const createShopCart = async (shopCart: ShopCart) => {
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

export const addProductToShopCart = async (
  cartId: number,
  productId: number
) => {
  try {
    const cart = await CartDataService.addProductToShopCart(cartId, productId);
    return cart;
  } catch (error) {
    console.error(`Erro ao criar carrinho de compras: ${error}`);
    throw new Error("Erro ao criar carrinho de compras.");
  }
};

export const removeItemShopCart = async (
  shopCartId: number,
  itemId: number
) => {
  try {
    const cart = await CartDataService.removeItemFromShopCart(
      shopCartId,
      itemId
    );
    return cart;
  } catch (error) {
    console.error(`Erro ao remover item do carrinho: ${error}`);
    throw new Error("Erro ao remover item do carrinho.");
  }
};
