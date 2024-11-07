import Image from "next/image";
import Link from "next/link";

export default function Products() {
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
      {/* Cabeçalho */}
      <header className="bg-[#FAFAFA] text-center py-12">
        <h1 className="text-4xl font-bold text-[#333333]">Produtos</h1>
        <p className="mt-4 text-lg text-[#333333]">
          Explore nossa seleção de produtos e encontre as melhores ofertas para
          você.
        </p>
      </header>

      {/* Filtros e Ordenação */}
      <section className="container mx-auto py-8 px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-[#4A90E2] text-white font-semibold rounded hover:bg-[#3A70B3] transition-colors">
            Todos
          </button>
          {["Eletrônicos", "Roupas"].map((category, index) => {
            return (
              <button
                key={index}
                className="px-4 py-2 bg-[#FAFAFA] text-[#333333] font-semibold rounded hover:bg-[#F0F0F0] transition-colors"
              >
                {category}
              </button>
            );
          })}
        </div>
        <select className="border border-gray-300 rounded p-2">
          <option value="recent">Mais Recentes</option>
          <option value="popular">Populares</option>
          <option value="low_to_high">Preço: Menor para Maior</option>
          <option value="high_to_low">Preço: Maior para Menor</option>
        </select>
      </section>

      {/* Grid de Produtos */}
      <section className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Exemplo de Produto - Utilize um map para renderizar produtos dinamicamente */}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Image
                src={product.imageUrl} // Substitua com URLs dinâmicos
                alt={`Produto ${product.name}`}
                className="w-full h-48 object-cover"
                width={600}
                height={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  Produto {product.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  Descrição do Produto {product.name}
                </p>
                <p className="text-[#4A90E2] font-bold mt-2">
                  R$ {product.price}
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
    </div>
  );
}
