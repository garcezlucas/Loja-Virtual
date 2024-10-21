import React from "react";
import "./_dynamicForm.scss";
import MultiSelect from "../MultiSelect/MultiSelect";
import CustomSelect from "../Select/Select";

export interface DynamicField {
  label: string;
  name: string;
  type: "text" | "select" | "multi-select";
  value: string | number | string[];
  options?: any[];
}

interface DynamicFormProps {
  title: string;
  fields: DynamicField[];
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  handleCancel: () => void;
  handleChange: (name: string, value: string | number | string[]) => void;
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
                <CustomSelect field={field} handleChange={handleChange} />
              ) : field.type === "multi-select" ? (
                <MultiSelect
                  options={field.options || []}
                  selectedValues={field.value as string[]}
                  onChange={(selected: any) =>
                    handleChange(field.name, selected)
                  }
                />
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
