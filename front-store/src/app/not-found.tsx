import Link from "next/link";
import { getProductsViewModel } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/Product";
import ContactForm from "@/components/ContactForm";

export default async function NotFound() {
  let products: Product[] = [];

  try {
    products = await getProductsViewModel();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }

  return (
    <div className="h-full bg-[#DDDEE5]">
      {/* Seção de Cabeçalho de Erro */}
      <header className="bg-[#FAFAFA] text-center py-16">
        <h1 className="text-6xl font-bold text-[#F5A623]">404</h1>
        <h2 className="text-3xl font-semibold text-[#333333] mt-4">
          Página Não Encontrada
        </h2>
        <p className="mt-4 text-lg text-[#333333]">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-[#F5A623] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#D58A1D] transition-colors"
        >
          Voltar para a Página Inicial
        </Link>
      </header>

      {/* Seção de Produtos Populares */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">
          Produtos Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700">
              Não conseguimos carregar produtos no momento. Tente novamente mais
              tarde.
            </p>
          )}
        </div>
      </section>

      {/* Seção de Promoções */}
      <section className="bg-[#F5A623] py-12 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Promoções da Semana!
        </h2>
        <p className="mt-4 text-white">
          Aproveite descontos exclusivos em produtos selecionados.
        </p>
        <Link
          href="/promotions"
          className="mt-6 inline-block bg-gray-800 text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-700 transition-colors"
        >
          Ver Promoções
        </Link>
      </section>

      {/* Seção de Contato */}
      <section className="container py-10 px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">
          Fale Conosco
        </h2>
        <p className="text-gray-700 mb-4">
          Dúvidas ou sugestões? Entre em contato! Preencha o formulário abaixo e
          nossa equipe retornará o mais breve possível.
        </p>
        <ContactForm />
      </section>
    </div>
  );
}
