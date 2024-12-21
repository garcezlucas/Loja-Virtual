import { getProductsWithDiscount } from "@/hooks/useProducts";
import { Product } from "@/interfaces/Product";
import Image from "next/image";
import Link from "next/link";

export default async function Promotions() {
  let promotions: Product[] = [];

  try {
    promotions = await getProductsWithDiscount();
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
          {promotions?.map((promo) => (
            <div
              key={promo.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Image
                src={
                  promo?.images?.[0]?.file
                    ? `data:image;base64, ${promo?.images[0].file}`
                    : "/placeholder.png"
                }
                alt={promo?.shortDescription}
                className="w-full h-48 object-cover"
                width={600}
                height={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {promo?.shortDescription}
                </h3>
                <p className="text-gray-600 mt-2">
                  {promo?.description}
                </p>
                <div className="mt-2">
                  <p className="text-gray-400 line-through">
                    R$ {promo?.price.toFixed(2)}
                  </p>
                  <p className="text-[#4A90E2] font-bold">
                    R${" "}
                    {(
                      promo?.price -
                      promo?.price * (promo.discount ?? 0)
                    ).toFixed(2)}
                  </p>
                </div>
                <Link
                  href={`/products/${promo.id}`}
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
