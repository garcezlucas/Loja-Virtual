import { useState, useEffect } from "react";
import { ManagementService } from "@/service/Management.service";
import { CitiesService } from "@/service/Cities.service";

interface RegisterProps {
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface City {
  id: number;
  name: string;
}

const Register: React.FC<RegisterProps> = ({ setOpenRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    address: "",
    codePostal: "",
    city: { id: 0 },
  });

  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await CitiesService.getAllCities();
        setCities(response.data);
      } catch (error) {
        console.error("Erro ao buscar cidades", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === "city") {
      setFormData((prev) => ({
        ...prev,
        city: { id: Number(value) },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await ManagementService.createUser(formData);
      if (response.success) {
        alert("Usuário registrado com sucesso!");
        setOpenRegister(false);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <h2 className="text-lg text-center font-semibold mb-4">Registrar-se</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-gray-700">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu CPF"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">
            Endereço
          </label>
          <input
            type="text"
            id="address"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu endereço"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codePostal" className="block text-gray-700">
            CEP
          </label>
          <input
            type="text"
            id="codePostal"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu CEP"
            value={formData.codePostal}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">
            Cidade
          </label>
          {loadingCities ? (
            <p className="text-gray-500">Carregando cidades...</p>
          ) : (
            <select
              id="city"
              className="w-full px-3 py-2 border rounded"
              value={formData.city.id}
              onChange={handleChange}
            >
              <option value={0}>Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Registrar
        </button>
        <div className="flex justify-center mt-6">
          <button
            className="text-blue-500 underline"
            type="button"
            onClick={() => setOpenRegister(false)}
          >
            Voltar ao Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
