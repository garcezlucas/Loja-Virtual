import { getPromotionsViewModel } from "@/hooks/usePromotions";
import { Promotion } from "@/interfaces/Promotion";
import Image from "next/image";
import Link from "next/link";

export default async function Promotions() {
  let promotions: Promotion[] = [];

  try {
    promotions = await getPromotionsViewModel();
  } catch (error) {
    console.error("Erro ao carregar categorias ou produtos:", error);
  }

  return (
    <div className="bg-[#DDDEE5] min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-[#FAFAFA] text-center py-12">
        <h1 className="text-4xl font-bold text-[#333333]">Promoções</h1>
        <p className="mt-4 text-lg text-[#333333]">
          Descubra ofertas incríveis em nossos produtos e aproveite os melhores
          descontos.
        </p>
      </header>

      {/* Grid de Promoções */}
      <section className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Renderização dos produtos em promoção */}
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Image
                src={
                  promo?.product?.images?.[0]?.file
                    ? `data:image;base64, ${promo?.product?.images[0].file}`
                    : "/placeholder.png"
                }
                alt={promo?.product?.shortDescription}
                className="w-full h-48 object-cover"
                width={600}
                height={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {promo?.product?.shortDescription}
                </h3>
                <p className="text-gray-600 mt-2">
                  {promo?.product?.description}
                </p>
                <div className="mt-2">
                  <p className="text-gray-400 line-through">
                    R$ {promo?.product?.price.toFixed(2)}
                  </p>
                  <p className="text-[#4A90E2] font-bold">
                    R${" "}
                    {(
                      promo?.product?.price -
                      promo?.product?.price * promo.discount
                    ).toFixed(2)}
                  </p>
                </div>
                <Link
                  href={`/promotions/${promo.id}`}
                  className="mt-4 block text-center bg-[#4A90E2] text-white font-semibold py-2 px-4 rounded hover:bg-[#3A70B3] transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
