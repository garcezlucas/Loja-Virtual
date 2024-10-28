import { useState } from "react";
import { StatesService } from "../../../service/States.service";
import { State } from "../../../interfaces/State";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { getFieldValue } from "../../../utils/getFieldValue";

import SuccessIcon from '../../../assets/icons/success.svg';
import ErrorIcon from '../../../assets/icons/error.svg';

type FieldName = "name" | "acronym";

interface useStatesProps {
  handleCloseAdd: () => void;
}

export function useStates({ handleCloseAdd }: useStatesProps) {
  const [tableData, setTableData] = useState<State[]>([]);
  const [filteredData, setFilteredData] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedState, setSelectedState] = useState<State | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

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

  const [requestResponse, setRequestResponse] = useState({
    title: "",
    message: "",
    icon: "",
    open: false,
    success: false,
  });

  const getAllStates = async () => {
    try {
      const response = await StatesService.getAllStates();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all states : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedState) {
      updateState();
    } else {
      createState();
    }
  };

  const createState = async () => {
    const name = getFieldValue(fields, "name") as string;
    const acronym = getFieldValue(fields, "acronym") as string;

    const state = {
      name,
      acronym,
    };

    try {
      const response = await StatesService.createStates(state);
      if (response?.id) {
        handleCloseAdd();
        getAllStates();
        setRequestResponse({
          title: "Adicionado",
          message: "Item adicionado com sucesso",
          icon: SuccessIcon,
          open: true,
          success: true,
        });
      }
    } catch (error) {
      console.error(`error when crate state : ${error}`);
      setRequestResponse({
        title: "Erro",
        message: "Ocorreu um erro, tente novamente",
        icon: ErrorIcon,
        open: true,
        success: false,
      });
    }
  };

  const updateState = async () => {
    const name = getFieldValue(fields, "name") as string;
    const acronym = getFieldValue(fields, "acronym") as string;

    const state = {
      id: selectedState?.id as number,
      name,
      acronym,
    };

    try {
      const response = await StatesService.updateStates(state);
      if (response?.id) {
        setOpenEdit(false);
        getAllStates();
        setRequestResponse({
          title: "Atualizado",
          message: "Item atualizado com sucesso",
          icon: SuccessIcon,
          open: true,
          success: true,
        });
      }
    } catch (error) {
      console.error(`error when update state : ${error}`);
      setRequestResponse({
        title: "Erro",
        message: "Ocorreu um erro, tente novamente",
        icon: ErrorIcon,
        open: true,
        success: false,
      });
    }
  };

  const deleteState = async (id: number) => {
    try {
      await StatesService.deleteState(id);
      getAllStates();
    } catch (error) {
      console.error(`error when delete state : ${error}`);
    }
  };

  const handleClearFields = () => {
    const updatedFields = fields.map((field) => ({
      ...field,
      value:
        field.type === "select" ? 0 : field.type === "multi-select" ? [] : "",
    }));

    setFields(updatedFields);
  };

  const handleClearRequestResponse = () => {
    setRequestResponse({
      title: "",
      message: "",
      icon: "",
      open: false,
      success: false,
    });
  };

  const handleCloseEdit = () => {
    handleClearFields();
    setOpenEdit(false);
  };

  const handleCancel = () => {
    handleClearFields();
    handleCloseAdd();
  };

  const handleEditClick = (row: State) => {
    setSelectedState(row);
    setOpenEdit(true);

    const fieldMap: Record<FieldName, string | number> = {
      name: row.name,
      acronym: row.acronym,
    };

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name in fieldMap) {
          return { ...field, value: fieldMap[field.name as FieldName] };
        }
        return field;
      })
    );
  };

  const handleChange = (name: string, value: string | number | string[]) => {
    const isNumber = typeof value === "number";

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === name) {
          if (isNumber) {
            return { ...field, value: value.toString() };
          }
          return { ...field, value };
        }
        return field;
      })
    );
  };

  return {
    tableData,
    filteredData,
    setFilteredData,
    loading,
    requestResponse,

    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,

    fields,
    openEdit,

    getAllStates,
    handleSubmit,
    deleteState,
    handleCancel,
    handleClearRequestResponse,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
