import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Produto 1",
      description: "Descrição do Produto 1",
      price: 100.0,
      imageUrl: "/images/produto1.jpg",
    },
    {
      id: 2,
      name: "Produto 2",
      description: "Descrição do Produto 2",
      price: 150.0,
      imageUrl: "/images/produto2.jpg",
    },
    {
      id: 3,
      name: "Produto 3",
      description: "Descrição do Produto 3",
      price: 200.0,
      imageUrl: "/images/produto3.jpg",
    },
  ];
  
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
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
                width={600}
                height={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-[#4A90E2] font-bold mt-2">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="mt-4 block text-center bg-[#4A90E2] text-white font-semibold py-2 px-4 rounded hover:bg-[#3A70B3] transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
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
        <form className="bg-[#FAFAFA] shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#333333]"
            >
              Nome:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              placeholder="Seu nome"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#333333]"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              placeholder="Seu email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#333333]"
            >
              Mensagem:
            </label>
            <textarea
              id="message"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              rows={4}
              placeholder="Sua mensagem"
            />
          </div>
          <button
            type="submit"
            className="bg-[#F5A623] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#FBBF24] transition-colors"
          >
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}
