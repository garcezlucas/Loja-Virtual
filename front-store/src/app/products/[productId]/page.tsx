"use client";

import { useEffect, useState } from "react";
import { getProductViewModel } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product } from "@/interfaces/Product";
import Modal from "@/components/Modal";
import Login from "@/app/login/Login";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openLogin, setOpenLogin] = useState(false);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("cookies") : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductViewModel(productId as string);
        setProduct(productData);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return <div className="bg-[#DDDEE5] min-h-screen">Carregando...</div>;
  if (error) return <div className="bg-[#DDDEE5] min-h-screen">{error}</div>;
  if (!product)
    return (
      <div className="bg-[#DDDEE5] min-h-screen">Produto não encontrado.</div>
    );

  return (
    <div className="bg-[#DDDEE5] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <Link href="/products" className="text-[#4A90E2] hover:underline">
          &larr; Voltar para Produtos
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={`data:image;base64, ${product?.images[0]?.file}`}
              alt={product.shortDescription}
              className="object-cover w-full h-80 md:h-full"
              width={600}
              height={400}
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-semibold text-[#333333]">
              {product.shortDescription}
            </h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            {!product.discount ? (
              <p className="text-[#4A90E2] font-bold mt-2">R${product.price}</p>
            ) : (
              <div className="mt-2">
                <p className="text-gray-400 line-through">
                  R$ {product?.price.toFixed(2)}
                </p>
                <p className="text-[#4A90E2] font-bold">
                  R${" "}
                  {(
                    product?.price -
                    product?.price * (product.discount ?? 0)
                  ).toFixed(2)}
                </p>
              </div>
            )}
            <button
              className="mt-6 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-full hover:bg-[#D58A1D] transition-colors"
              onClick={() => (accessToken ? "" : setOpenLogin(true))}
            >
              Adicionar ao Carrinho
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#333333]">
                Especificações
              </h2>
              <p className="text-gray-600 mt-2">{product.category.name}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
        <Login setOpenLogin={setOpenLogin} />
      </Modal>
    </div>
  );
}
