import { ChangeEvent, useState } from "react";
import { ManagementService } from "../../service/Management.service";

interface useNewPasswordProps {
  navigate: (path: string) => void;
  email: string | null;
  code: string | null;
}

export function useNewPassword({ navigate, email, code }: useNewPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      const valid = password === confirmPassword ? true : false;

      if (!valid || !email || !code) return;

      const data = { email, password, recoverPasswordCode: code };

      const response = await ManagementService.changePassword(data);

      if (response === "Senha alterada com sucesso!") {
        navigate("/login");
      }
    } catch (error) {
      console.error(`Error in change password: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsValid(true);
  };

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setIsValid(true);
  };

  const toggleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const handleBlurConfirmPassword = () => {
    if (password === confirmPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return {
    password,
    visiblePassword,
    confirmPassword,
    visibleConfirmPassword,
    isValid,
    loading,

    handleSubmit,
    handlePassword,
    togglePassword,
    handleConfirmPassword,
    toggleConfirmPassword,
    handleBlurConfirmPassword,
  };
}
