import "../_management.scss";

import { useEffect, useState } from "react";

import { useCities } from "./useCities";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";

import { City } from "../../../interfaces/City";

interface CitiesProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Cities: React.FC<CitiesProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [filteredData, setFilteredData] = useState<City[]>([]);
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Nome*",
      name: "name",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Nome é obrigatório" },
    },
    {
      label: "Estado*",
      name: "state",
      type: "select",
      value: 0,
      options: [],
      validationRules: { required: true, message: "Estado é obrigatório" },
    },
  ]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const {
    tableData,
    states,
    isLoading,
    deleteCity,
    updateFieldsWithStates,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  } = useCities({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setSelectedCity,
  });

  useEffect(() => {
    updateFieldsWithStates();
  }, [states]);

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterDataIgnoringAccents(tableData, searchTerm);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, tableData]);

  const titleColumns = [
    { label: "ID", width: "25%" },
    { label: "Nome", width: "25%" },
    { label: "Estado", width: "25%" },
    { label: "", width: "25%" },
  ];

  const columns: Column[] = [
    { label: "id", format: (value) => value || "-", width: "25%" },
    { label: "name", format: (value) => value || "-", width: "25%" },
    {
      label: "state",
      format: (value) => `${value?.name} - ${value?.acronym}` || "-",
      width: "25%",
    },
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
            onClick={() => deleteCity.mutate(value)}
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
          handleSubmit={(e) => handleSubmit(e, fields, selectedCity)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedCity)}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Cities;
