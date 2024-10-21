import { useState } from "react";
import { CityService } from "../../../service/City.service";
import { City } from "../../../interfaces/City";
import { StateService } from "../../../service/State.service";
import { State } from "../../../interfaces/State";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

interface useCitysProps {
  handleCloseAdd: () => void;
}

export function useCity({ handleCloseAdd }: useCitysProps) {
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
      const response = await StateService.getAllStates();
      if (response?.length > 0) {
        const stateOptions = response.map((state: State) => ({
          value: state.id,
          label: state.name,
        }));

        const options = [
          { value: -1, label: "Selecione um estado" },
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
      const response = await CityService.getAllCities();
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
    const nameField = fields?.find((field) => field.name === "name");
    const stateField = fields?.find((field) => field.name === "state");

    const name = nameField?.value as string;
    const stateId = stateField?.value as number;

    const city = {
      name: name,
      state: { id: stateId },
    };
    try {
      const response = await CityService.createCity(city);
      if (response?.id) {
        handleCloseAdd();
        getAllCities();
      }
    } catch (error) {
      console.error(`error when crate city : ${error}`);
    }
  };

  const updateCity = async () => {
    const nameField = fields?.find((field) => field.name === "name");
    const stateField = fields?.find((field) => field.name === "state");

    const name = nameField?.value as string;
    const stateId = stateField?.value as number;

    const city = {
      id: selectedCity?.id as number,
      name,
      state: { id: stateId },
    };
    try {
      const response = await CityService.updateCity(city);
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
      await CityService.deleteCity(id);
      getAllCities();
    } catch (error) {
      console.error(`error when delete city : ${error}`);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCancel = () => {
    handleCloseAdd();
  };

  const handleEditClick = (row: City) => {
    setSelectedCity(row);
    setOpenEdit(true);

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === "name") {
          return { ...field, value: row.name };
        }
        if (field.name === "state") {
          return { ...field, value: row.state.id };
        }
        return field;
      })
    );
  };

  const handleChange = (name: string, value: string | number) => {
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
