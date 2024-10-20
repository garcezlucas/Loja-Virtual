import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import StateForm from "./Forms/StateForm";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useStates } from "./useStates";
import { State } from "../../../interfaces/State";
import { useEffect } from "react";

interface StatesProps {
  filteredData: State[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  openAdd: boolean;
  handleCloseAdd: () => void;

  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const States: React.FC<StatesProps> = ({
  filteredData,
  page,
  setPage,
  rowsPerPage,
  totalPages,
  setTotalPages,
  openAdd,
  handleCloseAdd,

  reload,
  setReload,
}) => {
  const {
    openEdit,
    setOpenEdit,
    selectedState,
    setSelectedState,

    deleteState,
    handleCloseEdit,
  } = useStates({ handleCloseAdd, reload, setReload });

  const titleColumns: (string | { label: string; width?: string })[] = [
    { label: "ID", width: "25%" },
    { label: "Nome", width: "25%" },
    { label: "Sigla", width: "25%" },
    { label: "", width: "25%" },
  ];

  const columns: Column[] = [
    {
      label: "id",
      format: (value) => (value !== undefined ? value : "-"),
      width: "10%",
    },
    {
      label: "name",
      format: (value) => (value !== undefined ? value : "-"),
      width: "10%",
    },
    {
      label: "acronym",
      format: (value) => (value !== undefined ? value : "-"),
      width: "10%",
    },
    {
      label: "id",
      format: (value, row) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: "#F0E68C",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedState(row);
                setOpenEdit(true);
              }}
            >
              <img src={EditIcon} alt="edit" style={{ width: "1.5rem" }} />
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: "#FF0000",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => deleteState(value)}
            >
              <img src={DeleteIcon} alt="delete" style={{ width: "1.5rem" }} />
            </button>
          </div>
        );
      },
      width: "10%",
    },
  ];

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
          reload={reload}
          setReload={setReload}
          selectedState={selectedState}
        />
      </Modal>
    </div>
  );
};

export default States;
