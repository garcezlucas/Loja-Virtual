import "../_management.scss";

import { useMemo, useState } from "react";

import { useStates } from "./useStates";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";

import { State } from "../../../interfaces/State";

interface StatesProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const States: React.FC<StatesProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Nome*",
      name: "name",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Nome é obrigatório" },
    },
    {
      label: "Sigla*",
      name: "acronym",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Sigla é obrigatório" },
    },
  ]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const {
    tableData,
    isLoading,
    deleteState,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  } = useStates({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setSelectedState,
  });

  const filteredData = useMemo(() => {
    if (tableData.length > 0) {
      return filterDataIgnoringAccents(tableData, searchTerm);
    }
    return [];
  }, [tableData, searchTerm]);

  const titleColumns = [
    { label: "ID", width: "25%" },
    { label: "Nome", width: "25%" },
    { label: "Sigla", width: "25%" },
    { label: "", width: "25%" },
  ];

  const columns: Column[] = [
    { label: "id", format: (value) => value || "-", width: "25%" },
    { label: "name", format: (value) => value || "-", width: "25%" },
    { label: "acronym", format: (value) => value || "-", width: "25%" },
    {
      label: "id",
      format: (value, row) => (
        <div className="action-buttons">
          <button
            className="action-buttons-edit"
            onClick={() => handleEditClick(row)}
          >
            <img src={EditIcon} alt="edit" />
          </button>
          <button
            className="action-buttons-delete"
            onClick={() => deleteState.mutate(value)}
          >
            <img src={DeleteIcon} alt="delete" />
          </button>
        </div>
      ),
      width: "25%",
    },
  ];

  const tableProps = {
    titleColumns,
    columns,
    dataTable: filteredData,
    rowsPerPage: 7,
    totalItems: filteredData.length,
    heightTable: "42.7rem",
    loading: isLoading,
    heightLoading: "30rem",
  };

  return (
    <div>
      <TableComponent tableProps={tableProps} />

      <Modal isOpen={openAdd} onClose={handleCloseAdd}>
        <DynamicForm
          title="Cadastro"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedState)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedState)}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default States;
