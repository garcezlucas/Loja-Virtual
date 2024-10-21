import "./_states.scss";
import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import StateForm from "./Forms/StateForm";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useStates } from "./useStates";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";

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
  const [reload, setReload] = useState<boolean>(false);

  const {
    tableData,
    filteredData,
    setFilteredData,
    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,

    openEdit,
    selectedState,

    deleteState,
    handleCloseEdit,
    getAllStates,
    handleEditClick,
  } = useStates({ handleCloseAdd, reload, setReload });

  useEffect(() => {
    getAllStates();
  }, [reload]);

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
      { label: "ID", width: "25%" },
      { label: "Nome", width: "25%" },
      { label: "Sigla", width: "25%" },
      { label: "", width: "25%" },
    ],
    []
  );

  const columns: Column[] = useMemo(
    () => [
      { label: "id", format: (value) => value || "-", width: "10%" },
      { label: "name", format: (value) => value || "-", width: "10%" },
      { label: "acronym", format: (value) => value || "-", width: "10%" },
      {
        label: "id",
        format: (value, row) => renderActionButtons(value, row),
        width: "10%",
      },
    ],
    [renderActionButtons]
  );

  const dataTable = filteredData;
  const totalItems = filteredData?.length;
  const heightTable = "42.7rem";
  const loading = false;

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
  };

  return (
    <div>
      <TableComponent tableProps={tableProps} />

      <Modal isOpen={openAdd} onClose={handleCloseAdd}>
        <StateForm
          title={"Cadastro"}
          handleCloseAdd={handleCloseAdd}
          reload={reload}
          setReload={setReload}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <StateForm
          title={"Editar"}
          handleCloseAdd={handleCloseEdit}
          selectedState={selectedState}
          reload={reload}
          setReload={setReload}
        />
      </Modal>
    </div>
  );
};

export default States;
