"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPromotionViewModel } from "@/hooks/usePromotions";
import { Promotion } from "@/interfaces/Promotion";

export default function PromotionDetails() {
  const { promotionId } = useParams();
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const promotionData = await getPromotionViewModel(
          promotionId as string
        );
        setPromotion(promotionData);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotion();
  }, [promotionId]);

  if (loading)
    return <div className="bg-[#DDDEE5] min-h-screen">Carregando...</div>;
  if (error) return <div className="bg-[#DDDEE5] min-h-screen">{error}</div>;
  if (!promotion)
    return (
      <div className="bg-[#DDDEE5] min-h-screen">Produto não encontrado.</div>
    );

  return (
    <div className="bg-[#DDDEE5] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <Link href="/promotions" className="text-[#4A90E2] hover:underline">
          &larr; Voltar para Promoções
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={`data:image;base64, ${promotion?.product?.images[0]?.file}`}
              alt={promotion?.product?.shortDescription}
              className="object-cover w-full h-80 md:h-full"
              width={600}
              height={400}
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-semibold text-[#333333]">
              {promotion?.product?.shortDescription}
            </h1>
            <p className="text-gray-600 mt-4">
              {promotion?.product?.description}
            </p>
            <p className="text-gray-400 line-through text-2l mt-4">
              R$ {promotion?.product?.price.toFixed(2)}
            </p>
            <p className="text-[#4A90E2] font-bold text-2xl mt-4">
              R${" "}
              {(
                promotion?.product?.price -
                promotion?.product?.price * promotion.discount
              ).toFixed(2)}
            </p>
            <button className="mt-6 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-full hover:bg-[#D58A1D] transition-colors">
              Adicionar ao Carrinho
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#333333]">
                Especificações
              </h2>
              <p className="text-gray-600 mt-2">
                {promotion?.product?.category?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
