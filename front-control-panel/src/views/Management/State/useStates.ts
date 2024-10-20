import { useState } from "react";
import { StateService } from "../../../service/State.service";
import { State } from "../../../interfaces/State";

interface useStatesProps {
  handleCloseAdd: () => void;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
}

export function useStates({
  handleCloseAdd,
  reload,
  setReload,
  isEditMode,
}: useStatesProps) {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(isEditMode);
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
      if (response) {
        handleCloseAdd();
        setReload(!reload);
      }
    } catch (error) {
      console.error(`error when crate state : ${error}`);
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
      if (response) {
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

  return {
    setId,
    name,
    setName,
    acronym,
    setAcronym,
    openEdit,
    setOpenEdit,
    selectedState,
    setSelectedState,

    handleSubmit,
    deleteState,
    handleCancel,
    handleOpenEdit,
    handleCloseEdit,
  };
}
