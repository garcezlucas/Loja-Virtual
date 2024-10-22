import React, { useState } from "react";
import "./_dynamicForm.scss";
import MultiSelect from "../MultiSelect/MultiSelect";
import CustomSelect from "../Select/Select";
import VisibleEye from "../../assets/icons/eye-visible-show.svg";
import HideEye from "../../assets/icons/eye-visible-hide.svg";

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: RegExp;
  min?: number;
  max?: number;
  message?: string;
}

export interface DynamicField {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "select" | "multi-select" | "password";
  value: string | number | string[];
  options?: any[];
  mask?: (value: string) => string;
  validationRules?: ValidationRules;
  customValidator?: (value: string | number | string[]) => boolean;
}

interface DynamicFormProps {
  title: string;
  fields: DynamicField[];
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  handleCancel?: () => void;
  handleChange: (name: string, value: string | number | string[]) => void;
  labelColor?: string;
  titleSubmitButton?: string;
  titleCancelButton?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  handleSubmit,
  handleCancel,
  handleChange,
  labelColor,
  titleSubmitButton,
  titleCancelButton,
}) => {
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [visiblePassword, setVisiblePassword] = useState<{
    [key: string]: boolean;
  }>({});

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

  const togglePasswordVisibility = (fieldName: string) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div className="dynamicForm-container">
      <header>{title}</header>
      <main>
        <form className="dynamicForm-container-form" onSubmit={handleSubmit}>
          {fields.map((field) => {
            const isValid = touched[field.name] ? validateField(field) : true;
            return (
              <div
                key={field.name}
                className="dynamicForm-container-form-group"
              >
                <label htmlFor={field.name} style={{ color: labelColor }}>
                  {field.label}
                </label>
                {field.type !== "select" && field.type !== "multi-select" ? (
                  <div className="dynamicForm-container-form-group-input">
                    <input
                      type={
                        field.type === "password" &&
                        !visiblePassword[field.name]
                          ? "password"
                          : "text"
                      }
                      id={field.name}
                      value={field.value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      onBlur={() => handleOnBlur(field.name)}
                      required={field.validationRules?.required}
                      minLength={field.validationRules?.minLength}
                      maxLength={field.validationRules?.maxLength}
                      className={isValid ? "valid" : "invalid"}
                    />
                    {field.type === "password" && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.name)}
                        className="toggle-password-visibility"
                      >
                        {visiblePassword[field.name] ? (
                          <img src={HideEye} alt="hide" />
                        ) : (
                          <img src={VisibleEye} alt="show" />
                        )}
                      </button>
                    )}
                  </div>
                ) : field.type === "select" ? (
                  <CustomSelect
                    field={field}
                    handleChange={handleChange}
                    required={field.validationRules?.required}
                    errormessage={field.validationRules?.message}
                  />
                ) : field.type === "multi-select" ? (
                  <MultiSelect
                    options={field.options || []}
                    selectedValues={field.value as string[]}
                    onChange={(selected) => handleChange(field.name, selected)}
                    required={field.validationRules?.required}
                    errormessage={field.validationRules?.message}
                  />
                ) : null}
                {!isValid && touched[field.name] && (
                  <span className="dynamicForm-container-form-group-error-message">
                    {field.validationRules?.message}
                  </span>
                )}
              </div>
            );
          })}
          <div className="dynamicForm-container-form-buttons">
            {handleCancel && (
              <button
                type="button"
                onClick={handleCancel}
                style={{ backgroundColor: "#FF0000" }}
              >
                <span>
                  {titleCancelButton ? titleCancelButton : "Cancelar"}
                </span>
              </button>
            )}
            <button
              type="submit"
              style={{ backgroundColor: "#3CB371" }}
              disabled={!isFormValid()}
            >
              <span>{titleSubmitButton ? titleSubmitButton : "Enviar"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DynamicForm;
