import Image from "next/image";

export default function About() {
  return (
    <div className="h-full bg-[#DDDEE5]">
      {/* Seção de Cabeçalho */}
      <header className="bg-[#FAFAFA] text-center py-16">
        <h1 className="text-4xl font-bold text-[#333333]">Sobre Nós</h1>
        <p className="mt-4 text-lg text-[#333333]">
          Conheça mais sobre a nossa história, missão e valores.
        </p>
      </header>

      {/* Seção Nossa História */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">
          Nossa História
        </h2>
        <p className="text-gray-700 mb-6">
          Fundada em 2020, nossa loja virtual nasceu com o propósito de oferecer
          produtos de qualidade e um atendimento de excelência. Desde o início,
          buscamos entender as necessidades dos nossos clientes e trazer as
          melhores soluções para o dia a dia.
        </p>
        <Image
          src="/images/nossa-historia.jpg"
          alt="Nossa História"
          className="w-full rounded-lg shadow-md"
          width={800}
          height={400}
        />
      </section>

      {/* Seção Missão, Visão e Valores */}
      <section className="bg-white py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">
            Missão, Visão e Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5A623] text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Missão</h3>
              <p>
                Proporcionar aos nossos clientes uma experiência de compra
                única, com produtos de alta qualidade e um atendimento
                humanizado.
              </p>
            </div>
            <div className="bg-[#4A90E2] text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Visão</h3>
              <p>
                Ser reconhecida como referência no mercado online, inovando e
                superando as expectativas dos nossos clientes.
              </p>
            </div>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Valores</h3>
              <ul className="list-disc list-inside">
                <li>Ética e transparência</li>
                <li>Foco no cliente</li>
                <li>Inovação constante</li>
                <li>Responsabilidade social</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Equipe */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Nossa Equipe</h2>
        <p className="text-gray-700 mb-6">
          Somos um time apaixonado por oferecer o melhor aos nossos clientes.
          Conheça as pessoas que tornam tudo isso possível:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              name: "João Silva",
              role: "Fundador e CEO",
              imageUrl: "/images/joao-silva.jpg",
            },
            {
              id: 2,
              name: "Maria Oliveira",
              role: "Gerente de Produtos",
              imageUrl: "/images/maria-oliveira.jpg",
            },
            {
              id: 3,
              name: "Carlos Santos",
              role: "Especialista em Atendimento",
              imageUrl: "/images/carlos-santos.jpg",
            },
          ].map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-md rounded-lg overflow-hidden text-center"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-48 object-cover"
                width={600}
                height={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção Conclusiva */}
      <section className="bg-[#F5A623] py-12 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Junte-se a Nós!
        </h2>
        <p className="mt-4 text-white">
          Estamos sempre em busca de novas formas de atender você melhor. Entre
          em contato e faça parte da nossa história!
        </p>
      </section>
    </div>
  );
}
