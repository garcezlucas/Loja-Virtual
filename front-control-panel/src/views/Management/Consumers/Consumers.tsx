import "../_management.scss";

import { useCallback, useEffect, useMemo } from "react";

import { useConsumers } from "./useConsumers";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";
import { PersonPermission } from "../../../interfaces/Person";

interface ConsumersProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Consumers: React.FC<ConsumersProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const {
    tableData,
    filteredData,
    setFilteredData,
    loading,

    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,

    fields,
    openEdit,

    getAllConsumers,
    getAllCities,
    handleSubmit,
    deleteState,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  } = useConsumers({ handleCloseAdd });

  useEffect(() => {
    getAllConsumers();
    getAllCities();
  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterDataIgnoringAccents(tableData, searchTerm);
      setFilteredData(filtered);
    }
  }, [searchTerm, tableData]);

  const renderActionButtons = useCallback(
    (value: number, row: any) => (
      <div className="action-buttons">
        <button
          className="action-buttons-edit"
          onClick={() => handleEditClick(row)}
        >
          <img src={EditIcon} alt="edit" />
        </button>
        <button
          className="action-buttons-delete"
          onClick={() => deleteState(value)}
        >
          <img src={DeleteIcon} alt="delete" />
        </button>
      </div>
    ),
    []
  );

  const titleColumns = useMemo(
    () => [
      { label: "ID", width: "14.28%" },
      { label: "Nome", width: "14.28%" },
      { label: "CPF", width: "14.28%" },
      { label: "Email", width: "14.28%" },
      { label: "Endereço", width: "14.28%" },
      { label: "Permissões", width: "14.28%" },
      { label: "", width: "14.28%" },
    ],
    []
  );

  const columns: Column[] = useMemo(
    () => [
      { label: "id", format: (value) => value || "-", width: "14.28%" },
      { label: "name", format: (value) => value || "-", width: "14.28%" },
      { label: "cpf", format: (value) => value || "-", width: "14.28%" },
      { label: "email", format: (value) => value || "-", width: "14.28%" },
      {
        label: "address",
        format: (value, row) =>
          `${value}, ${row.city.name} - ${row.city.state.acronym}` || "-",
        width: "14.28%",
      },
      {
        label: "personPermissions",
        format: (value: PersonPermission[]) => {
          if (value && value.length > 0) {
            return value
              .map((permission) => permission.permission.name)
              .join(", ");
          }
          return "-";
        },
        width: "14.28%",
      },
      {
        label: "id",
        format: (value, row) => renderActionButtons(value, row),
        width: "14.28%",
      },
    ],
    []
  );

  const dataTable = filteredData;
  const totalItems = filteredData?.length;
  const heightTable = "42.7rem";
  const heightLoading = "30rem";

  const tableProps = {
    titleColumns,
    columns,
    dataTable,
    page,
    setPage,
    rowsPerPage,
    totalPages,
    setTotalPages,
    totalItems,
    heightTable,
    loading,
    heightLoading,
  };

  return (
    <div>
      <TableComponent tableProps={tableProps} />

      <Modal isOpen={openAdd} onClose={handleCloseAdd}>
        <DynamicForm
          title="Cadastro"
          fields={fields}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={handleSubmit}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Consumers;
