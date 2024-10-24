import { ChangeEvent, useState } from "react";
import { ManagementService } from "../../service/Management.service";
import { emailValidator } from "../../utils/emailValidator";

interface useRecoveryPasswordProps {
  navigate: (path: string) => void;
}

export function useRecoveryPassword({ navigate }: useRecoveryPasswordProps) {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const valid = emailValidator(email);
      setIsValid(valid);

      if (!valid) return;

      const response = await ManagementService.getCodeAccess(email);

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.error(`Error in solicit new code: ${error}`);
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

  return {
    email,
    isValid,
    setIsValid,
    loading,

    handleSubmit,
    handleEmail,
    handleEmailBlur,
  };
}
