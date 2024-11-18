"use client";

export default function ContactForm() {

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <form
      className="bg-[#FAFAFA] shadow-md rounded-lg p-6"
      onSubmit={handleFormSubmit}
    >
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
  );
}
