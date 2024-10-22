import "./_dynamicForm.scss";
import React from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import CustomSelect from "../Select/Select";
import VisibleEye from "../../assets/icons/eye-visible-show.svg";
import HideEye from "../../assets/icons/eye-visible-hide.svg";
import { useDynamicForm } from "./useDynamicForm";

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
  colorSubmitButton?: string;
  titleCancelButton?: string;
  colorCancelButton?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  handleSubmit,
  handleCancel,
  handleChange,
  labelColor,
  titleSubmitButton,
  colorSubmitButton,
  titleCancelButton,
  colorCancelButton,
}) => {
  const {
    touched,
    visiblePassword,

    validateField,
    isFormValid,
    handleOnBlur,
    togglePasswordVisibility,
  } = useDynamicForm({ fields });

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
                style={{
                  backgroundColor: colorCancelButton
                    ? colorCancelButton
                    : "#FF0000",
                }}
              >
                <span>
                  {titleCancelButton ? titleCancelButton : "Cancelar"}
                </span>
              </button>
            )}
            <button
              type="submit"
              style={{
                backgroundColor: colorSubmitButton
                  ? colorSubmitButton
                  : "#3CB371",
              }}
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
