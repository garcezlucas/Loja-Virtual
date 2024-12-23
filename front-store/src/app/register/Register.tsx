import { useState, useEffect } from "react";
import { ManagementService } from "@/service/Management.service";
import { CitiesService } from "@/service/Cities.service";
import CustomSelect from "@/components/CustomSelect";

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
  const [errors, setErrors] = useState({
    name: "",
    cpf: "",
    email: "",
    address: "",
    codePostal: "",
    city: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await CitiesService.getAllCities();
        setCities(response);
      } catch (error) {
        console.error("Erro ao buscar cidades", error);
      }
    };

    fetchCities();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      cpf: "",
      email: "",
      address: "",
      codePostal: "",
      city: "",
    };

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório";
      isValid = false;
    }

    const cpfRegex = /^[0-9]{11}$/;
    if (!cpfRegex.test(formData.cpf)) {
      newErrors.cpf = "CPF inválido. Deve conter 11 dígitos numéricos";
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Endereço é obrigatório";
      isValid = false;
    }

    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(formData.codePostal)) {
      newErrors.codePostal = "CEP inválido";
      isValid = false;
    }

    if (formData.city.id === 0) {
      newErrors.city = "Cidade é obrigatória";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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

    if (validateForm()) {
      try {
        const response = await ManagementService.createUser(formData);
        if (response.success) {
          alert("Usuário registrado com sucesso!");
          setOpenRegister(false);
        }
      } catch (error) {
        console.error("Registration failed", error);
      }
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-gray-700">
            CPF
          </label>
          <input
            type="number"
            id="cpf"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu CPF"
            value={formData.cpf}
            onChange={handleChange}
          />
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="codePostal" className="block text-gray-700">
            CEP
          </label>
          <input
            type="number"
            id="codePostal"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu CEP"
            value={formData.codePostal}
            onChange={handleChange}
          />
          {errors.codePostal && (
            <p className="text-red-500 text-sm">{errors.codePostal}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">
            Cidade
          </label>
          <CustomSelect
            options={cities}
            selectedValue={formData.city.id}
            onChange={handleChange}
            placeholder="Selecione uma cidade"
            name={"city"}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
