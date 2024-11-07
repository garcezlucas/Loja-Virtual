"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specifications: string;
}

const products = [
  {
    id: 1,
    name: "Produto 1",
    description: "Descrição do Produto 1",
    price: 100.0,
    imageUrl: "/images/produto1.jpg",
    specifications: "teste",
  },
  {
    id: 2,
    name: "Produto 2",
    description: "Descrição do Produto 2",
    price: 150.0,
    imageUrl: "/images/produto2.jpg",
    specifications: "teste",
  },
  {
    id: 3,
    name: "Produto 3",
    description: "Descrição do Produto 3",
    price: 200.0,
    imageUrl: "/images/produto3.jpg",
    specifications: "teste",
  },
];

export default function ProductDetails() {
    const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === parseInt(productId as string));
    if (selectedProduct) setProduct(selectedProduct);
  }, [productId]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="bg-[#DDDEE5] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <Link href="/products" className="text-[#4A90E2] hover:underline">
          &larr; Voltar para Produtos
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-80 md:h-full"
              width={600}
              height={400}
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-semibold text-[#333333]">
              {product.name}
            </h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-[#4A90E2] font-bold text-2xl mt-4">
              R$ {product.price.toFixed(2)}
            </p>
            <button className="mt-6 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-full hover:bg-[#D58A1D] transition-colors">
              Adicionar ao Carrinho
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#333333]">
                Especificações
              </h2>
              <p className="text-gray-600 mt-2">{product.specifications}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
