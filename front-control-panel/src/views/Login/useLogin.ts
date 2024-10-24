import { useState } from "react";
import { DynamicField } from "../../components/DynamicForm/DynamicForm";
import { emailValidator } from "../../utils/emailValidator";
import { ManagementService } from "../../service/Management.service";
import { getFieldValue } from "../../utils/getFildValue";

interface useLoginFormProps {
  navigate: (path: string) => void;
}

export function useLoginForm({ navigate }: useLoginFormProps) {
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "E-mail*",
      name: "email",
      type: "email",
      value: "",
      validationRules: { required: false, message: "Insira um email válido" },
      customValidator: emailValidator,
    },
    {
      label: "Senha*",
      name: "password",
      type: "password",
      value: "",
      validationRules: { required: false, message: "Senha é obrigatório" },
    },
  ]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const email = getFieldValue(fields, "email") as string;
      const password = getFieldValue(fields, "password") as string;

      const user = { email, password };

      const response = await ManagementService.login(user);

      if (response.accessToken) {
        localStorage.setItem("cookies", response.accessToken);
        navigate("/system/dashboard");
      }
    } catch (error) {
      console.error(`Error in realize login: ${error}`);
    }
  };

  const handleClearFields = () => {
    const updatedFields = fields.map((field) => ({
      ...field,
      value:
        field.type === "select" ? 0 : field.type === "multi-select" ? [] : "",
    }));

    setFields(updatedFields);
  };

  const handleCancel = () => {
    handleClearFields();
  };

  const handleChange = (name: string, value: string | number | string[]) => {
    const isNumber = typeof value === "number";

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === name) {
          if (isNumber) {
            return { ...field, value: value.toString() };
          }
          return { ...field, value };
        }
        return field;
      })
    );
  };

  return {
    fields,
    handleSubmit,
    handleCancel,
    handleChange,
  };
}
