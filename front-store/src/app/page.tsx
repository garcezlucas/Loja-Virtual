import Link from "next/link";
import ContactForm from "../components/ContactForm";
import { getProductsWithoutDiscount } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/Product";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProductsWithoutDiscount();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }

  return (
    <div className="h-full bg-[#DDDEE5]">
      {/* Seção de Cabeçalho da Home */}
      <header className="bg-[#FAFAFA] text-center py-16">
        <h1 className="text-4xl font-bold text-[#333333]">
          Bem-vindo à Loja Virtual!
        </h1>
        <p className="mt-4 text-lg text-[#333333]">
          Encontre os melhores produtos com as melhores ofertas.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block bg-[#F5A623] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#D58A1D] transition-colors"
        >
          Ver Produtos
        </Link>
      </header>

      {/* Seção de Produtos Populares */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">
          Produtos Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
