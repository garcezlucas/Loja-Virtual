import { createShopCart, getShopCartByUSer } from "@/hooks/useCart";
import { ManagementService } from "@/service/Management.service";
import { saveToLocalStorageEncrypted } from "@/utils/encryptStorage";
import { useState } from "react";

interface LoginProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({ setOpenLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await ManagementService.login({ email, password });
      if (response.accessToken) {
        localStorage.setItem("cookies", response.accessToken);
        saveToLocalStorageEncrypted("user", response.userId);
        const result = await getShopCartByUSer(response.userId);
        if (!result) {
          await createShopCart(response.userId);
        }
        setOpenLogin(false);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <h2 className="text-lg text-center font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email-login"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </>
  );
};

export default Login;
