import { useState } from "react";
import { DynamicField } from "../../components/DynamicForm/DynamicForm";
import { emailValidator } from "../../utils/emailValidator";

interface useLoginFormProps {
    navigate: (path: string) => void;
}

export function useLoginForm({navigate}: useLoginFormProps) {
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "E-mail*",
      name: "email",
      type: "email",
      value: "",
      validationRules: { required: false, message: "Insira um email válido" },
      customValidator: emailValidator
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
    navigate('/system/dashboard')
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
