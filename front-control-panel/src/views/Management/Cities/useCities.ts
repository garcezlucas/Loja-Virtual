import { useState } from "react";
import { CitiesService } from "../../../service/Cities.service";
import { City } from "../../../interfaces/City";
import { StatesService } from "../../../service/States.service";
import { State } from "../../../interfaces/State";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { getFieldValue } from "../../../utils/getFildValue";

type FieldName = "name" | "state";

interface useCitiesProps {
  handleCloseAdd: () => void;
}

export function useCities({ handleCloseAdd }: useCitiesProps) {
  const [tableData, setTableData] = useState<City[]>([]);
  const [filteredData, setFilteredData] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [fields, setFields] = useState<DynamicField[]>([
    { label: "Nome", name: "name", type: "text", value: "" },
    {
      label: "Estado",
      name: "state",
      type: "select",
      value: 0,
      options: [],
    },
  ]);

  const getAllStates = async () => {
    try {
      const response = await StatesService.getAllStates();
      if (response?.length > 0) {
        const stateOptions = response.map((state: State) => ({
          value: state.id,
          label: state.name,
        }));

        const options = [
          { value: 0, label: "Selecione um estado" },
          ...stateOptions,
        ];

        setFields((prevFields) =>
          prevFields.map((field) => {
            if (field.name === "state") {
              return {
                ...field,
                options,
              };
            }
            return field;
          })
        );
      }
    } catch (error) {
      console.error(`Error when searching all states: ${error}`);
    }
  };

  const getAllCities = async () => {
    setLoading(true);
    try {
      const response = await CitiesService.getAllCities();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all citys : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedCity) {
      updateCity();
    } else {
      createCity();
    }
  };

  const createCity = async () => {
    const name = getFieldValue(fields, "name") as string;
    const stateId = getFieldValue(fields, "state") as number;

    const city = {
      name: name,
      state: { id: stateId },
    };

    try {
      const response = await CitiesService.createCity(city);
      if (response?.id) {
        handleCloseAdd();
        getAllCities();
      }
    } catch (error) {
      console.error(`error when crate city : ${error}`);
    }
  };

  const updateCity = async () => {
    const name = getFieldValue(fields, "name") as string;
    const stateId = getFieldValue(fields, "state") as number;

    const city = {
      id: selectedCity?.id as number,
      name,
      state: { id: stateId },
    };

    try {
      const response = await CitiesService.updateCity(city);
      if (response?.id) {
        setOpenEdit(false);
        getAllCities();
      }
    } catch (error) {
      console.error(`error when update city : ${error}`);
    }
  };

  const deleteCity = async (id: number) => {
    try {
      await CitiesService.deleteCity(id);
      getAllCities();
    } catch (error) {
      console.error(`error when delete city : ${error}`);
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

  const handleCloseEdit = () => {
    handleClearFields();
    setOpenEdit(false);
  };

  const handleCancel = () => {
    handleClearFields();
    handleCloseAdd();
  };

  const handleEditClick = (row: City) => {
    setSelectedCity(row);
    setOpenEdit(true);

    const fieldMap: Record<FieldName, string | number> = {
      name: row.name,
      state: row.state.id,
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
  };
}
