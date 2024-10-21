import React, { useEffect } from "react";
import "./_stateForm.scss";
import { useStates } from "../useStates";
import { State } from "../../../../interfaces/State";

interface StateFormProps {
  title: string;
  handleCloseAdd: () => void;
  selectedState?: State | null;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateForm: React.FC<StateFormProps> = ({
  title,
  handleCloseAdd,
  selectedState,
  reload,
  setReload,
}) => {
  const {
    setId,
    name,
    setName,
    acronym,
    setAcronym,

    handleSubmit,
    handleCancel,
  } = useStates({
    handleCloseAdd,
    isEditMode: !!selectedState,
    reload,
    setReload,
  });

  useEffect(() => {
    if (selectedState) {
      setId(selectedState.id);
      setName(selectedState.name);
      setAcronym(selectedState.acronym);
    }
  }, [selectedState]);

  return (
    <div className="stateForm-container">
      <header>{title}</header>
      <main>
        <form className="stateForm-container-form" onSubmit={handleSubmit}>
          <div className="stateForm-container-form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="stateForm-container-form-group">
            <label htmlFor="acronym">Sigla</label>
            <input
              type="text"
              id="acronym"
              value={acronym || ""}
              onChange={(e) => setAcronym(e.target.value)}
              required
            />
          </div>
          <div className="stateForm-container-form-buttons">
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
              disabled={name === "" || acronym === ""}
            >
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default StateForm;
