import { useState } from "react";
import { DynamicField } from "./DynamicForm";

export interface useDynamicFormProps {
  fields: DynamicField[];
}

export function useDynamicForm({ fields }: useDynamicFormProps) {
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (field: DynamicField): boolean => {
    const { type, value, validationRules, customValidator } = field;

    if (!validationRules) return true;

    if (!validationRules.required) return true;

    if (validationRules.required && value === "") {
      return false;
    }

    if (customValidator && !customValidator(value)) {
      return false;
    }

    if (type === "email" && validationRules.pattern) {
      return validationRules.pattern.test(String(value));
    }

    if (type === "text" || type === "email") {
      if (
        validationRules.minLength &&
        String(value).length < validationRules.minLength
      ) {
        return false;
      }
      if (
        validationRules.maxLength &&
        String(value).length > validationRules.maxLength
      ) {
        return false;
      }
    }

    if (type === "number") {
      const numericValue = Number(value);
      if (
        validationRules.min !== undefined &&
        numericValue < validationRules.min
      ) {
        return false;
      }
      if (
        validationRules.max !== undefined &&
        numericValue > validationRules.max
      ) {
        return false;
      }
    }

    return true;
  };

  const isFormValid = () => {
    return fields.every((field) => validateField(field));
  };

  const handleOnBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  return {
    touched,

    validateField,
    isFormValid,
    handleOnBlur,
  };
}
