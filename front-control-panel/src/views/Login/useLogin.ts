import { ChangeEvent, useState } from "react";
import { ManagementService } from "../../service/Management.service";
import { emailValidator } from "../../utils/emailValidator";
import { PersonPermission } from "../../interfaces/Person";
import { saveToLocalStorageEncrypted } from "../../utils/encryptStorage";

interface useLoginFormProps {
  navigate: (path: string) => void;
}

export function useLoginForm({ navigate }: useLoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      const user = { email, password };

      const response = await ManagementService.login(user);

      if (response.accessToken && response.permissions) {
        const permissions = response.permissions.map(
          (item: PersonPermission) => item.permission.name
        );
        saveToLocalStorageEncrypted("permissions", permissions);

        localStorage.setItem("cookies", response.accessToken);
        navigate("/system/dashboard");
      }
    } catch (error) {
      console.error(`Error in realize login: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsValid(true);
  };

  const handleEmailBlur = () => {
    const valid = emailValidator(email);
    setIsValid(valid);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return {
    email,
    password,
    visiblePassword,
    isValid,
    loading,

    handleSubmit,
    handleEmail,
    handleEmailBlur,
    handlePassword,
    togglePassword,
  };
}
