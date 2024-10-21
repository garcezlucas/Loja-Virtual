import { useState } from "react";
import { StateService } from "../../../service/State.service";
import { State } from "../../../interfaces/State";

interface useStatesProps {
  handleCloseAdd: () => void;
  isEditMode?: boolean;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useStates({
  handleCloseAdd,
  isEditMode,
  reload,
  setReload,
}: useStatesProps) {
  const [tableData, setTableData] = useState<State[]>([]);
  const [filteredData, setFilteredData] = useState<State[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const getAllStates = async () => {
    try {
      const response = await StateService.getAllStates();
      if (response?.length > 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all states : ${error}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditMode) {
      updateState();
    } else {
      createState();
    }
  };

  const createState = async () => {
    const state = {
      name,
      acronym,
    };
    try {
      const response = await StateService.createStates(state);
      if (response?.id) {
        handleCloseAdd();
        setReload(!reload);
      }
    } catch (error) {
      console.error(`error when crate state : ${error}`);
    } finally {
    }
  };

  const updateState = async () => {
    const state = {
      id: id as number,
      name,
      acronym,
    };
    try {
      const response = await StateService.updateStates(state);
      if (response?.id) {
        handleCloseAdd();
        setReload(!reload);
      }
    } catch (error) {
      console.error(`error when update state : ${error}`);
    }
  };

  const deleteState = async (id: number) => {
    try {
      await StateService.deleteSate(id);
      setReload(!reload);
    } catch (error) {
      console.error(`error when delete state : ${error}`);
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCancel = () => {
    setName("");
    setAcronym("");
    handleCloseAdd();
  };

  const handleEditClick = (row: any) => {
    setSelectedState(row);
    setOpenEdit(true);
  };

  return {
    tableData,
    filteredData,
    setFilteredData,
    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,

    setId,
    name,
    setName,
    acronym,
    setAcronym,
    openEdit,
    setOpenEdit,
    selectedState,
    setSelectedState,

    getAllStates,
    handleSubmit,
    deleteState,
    handleCancel,
    handleOpenEdit,
    handleCloseEdit,
    handleEditClick
  };
}
