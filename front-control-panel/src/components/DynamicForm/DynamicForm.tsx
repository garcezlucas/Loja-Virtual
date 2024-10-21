import React from "react";
import "./_dynamicForm.scss";

export interface DynamicField {
  label: string;
  name: string;
  type: "text" | "select";
  value: string | number;
  options?: any[];
}

interface DynamicFormProps {
  title: string;
  fields: DynamicField[];
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  handleCancel: () => void;
  handleChange: (name: string, value: string | number) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  handleSubmit,
  handleCancel,
  handleChange,
}) => {
  return (
    <div className="dynamicForm-container">
      <header>{title}</header>
      <main>
        <form className="dynamicForm-container-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="dynamicForm-container-form-group">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "text" ? (
                <input
                  type="text"
                  id={field.name}
                  value={field.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  value={field.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
          <div className="dynamicForm-container-form-buttons">
            <button
              type="button"
              onClick={handleCancel}
              style={{ backgroundColor: "#FF0000" }}
            >
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#3CB371" }}
              disabled={fields.some((field) => field.value === "")}
            >
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DynamicForm;
