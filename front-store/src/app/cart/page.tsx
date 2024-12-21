"use client";

import { getShopCartByUSer, removeItemShopCart } from "@/hooks/useCart";
import { ShopCart } from "@/interfaces/ShopCart";
import { getFromLocalStorageDecrypted } from "@/utils/encryptStorage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<ShopCart>();

  useEffect(() => {
    const fetchProduct = async () => {
      const userId = await getFromLocalStorageDecrypted("user");
      try {
        const cart = await getShopCartByUSer(userId);
        setCart(cart);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };

    fetchProduct();
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      return {
        ...prevCart,
        products: prevCart.products.map((product) =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product
        ),
      };
    });
  };

  const removeItem = async (cartId: number, productId: number) => {
    const response = await removeItemShopCart(cartId, productId);

    if (response  && response.id) {
      setCart((prevCart) => {
        if (!prevCart) return prevCart;

        return {
          ...prevCart,
          products: prevCart.products.filter(
            (product) => product.id !== productId
          ),
        };
      });
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;

    return cart.products.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    );
  };

  return (
    <div className="bg-[#DDDEE5] min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-[#FAFAFA] text-center py-16">
        <h1 className="text-4xl font-bold text-[#333333]">
          Carrinho de Compras
        </h1>
        <p className="mt-4 text-lg text-[#333333]">
          Revise seus itens antes de finalizar a compra.
        </p>
      </header>

      {/* Seção do Carrinho */}
      <section className="container mx-auto py-10 px-4">
        {cart?.products?.length && cart?.products?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cart?.products?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden flex items-center mb-6"
                  >
                    <Image
                      src={`data:image;base64, ${item.product.images[0]?.file}`}
                      alt={item.product.shortDescription}
                      className="w-32 h-24 object-cover ml-4"
                      width={128}
                      height={128}
                    />
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold">
                        {item.product.shortDescription}
                      </h3>
                      <p className="text-gray-600">
                        Preço: R$ {item.price.toFixed(2).replace(".", ",")}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(cart.id, item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mr-4"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>

              {/* Resumo do Pedido */}
              <div className="bg-white shadow-md rounded-lg p-6 h-[313px]">
                <h2 className="text-2xl font-semibold text-[#333333] mb-6">
                  Resumo do Pedido
                </h2>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-[#333333] font-bold">
                    R$ {calculateTotal().toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-[#333333] font-bold">R$ 20,00</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-[#4A90E2]">
                    R$ {(calculateTotal() + 20).toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="block bg-[#4A90E2] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#3A70B3] transition-colors"
                >
                  Finalizar Compra
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700">
              Seu carrinho está vazio. Adicione produtos para continuar.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block bg-[#F5A623] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#D58A1D] transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
