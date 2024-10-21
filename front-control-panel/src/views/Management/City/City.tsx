import "../_management.scss";

import { useCallback, useEffect, useMemo } from "react";

import { useCity } from "./useCity";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";

interface CitysProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const City: React.FC<CitysProps> = ({
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

    getAllStates,
    getAllCities,
    handleSubmit,
    deleteCity,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  } = useCity({ handleCloseAdd });

  useEffect(() => {
    const fetchData = async () => {
      await getAllCities();
      await getAllStates();
    };

    fetchData();
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
          onClick={() => deleteCity(value)}
        >
          <img src={DeleteIcon} alt="delete" />
        </button>
      </div>
    ),
    []
  );

  const titleColumns = useMemo(
    () => [
      { label: "ID", width: "25%" },
      { label: "Nome", width: "25%" },
      { label: "Estado", width: "25%" },
      { label: "", width: "25%" },
    ],
    []
  );

  const columns: Column[] = useMemo(
    () => [
      { label: "id", format: (value) => value || "-", width: "10%" },
      { label: "name", format: (value) => value || "-", width: "10%" },
      {
        label: "state",
        format: (value) => `${value?.name} - ${value?.acronym}` || "-",
        width: "10%",
      },
      {
        label: "id",
        format: (value, row) => renderActionButtons(value, row),
        width: "10%",
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

export default City;
