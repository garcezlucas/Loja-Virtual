import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CitiesService } from "../../../service/Cities.service";
import { StatesService } from "../../../service/States.service";

import { City } from "../../../interfaces/City";
import { State } from "../../../interfaces/State";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";

type FieldName = "name" | "state";

interface useCitiesProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
}

export function useCities({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedCity,
}: useCitiesProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: CitiesService.getAllCities,
  });

  const { data: states = [] } = useQuery<State[], Error>({
    queryKey: ["states"],
    queryFn: StatesService.getAllStates,
  });

  const updateFieldsWithStates = () => {
    try {
      if (states?.length > 0) {
        const stateOptions = states.map((state: State) => ({
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
      console.error(`Error when update fields with states: ${error}`);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedCity: City | null
  ) => {
    event.preventDefault();
    const name = getFieldValue(fields, "name") as string;
    const stateId = getFieldValue(fields, "state") as number;

    if (selectedCity) {
      updateCity.mutate({
        id: selectedCity.id,
        name,
        state: { id: stateId } as State,
      } as City);
    } else {
      createCity.mutate({
        name,
        state: { id: stateId } as State,
      } as City);
    }
  };

  const createCity = useMutation<void, Error, Omit<City, "id">>({
    mutationFn: (brand) => CitiesService.createCity(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      handleCloseAdd();
      handleClearFields();
    },
  });

  const updateCity = useMutation<void, Error, City>({
    mutationFn: (brand) => CitiesService.updateCity(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      handleCloseEdit();
    },
  });

  const deleteCity = useMutation<void, Error, number>({
    mutationFn: (id) => CitiesService.deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

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

  const handleCancel = () => {
    handleClearFields();
    handleCloseAdd();
  };

  const handleCloseEdit = () => {
    handleClearFields();
    setOpenEdit(false);
  };

  const handleClearFields = () => {
    const updatedFields = fields.map((field) => ({
      ...field,
      value:
        field.type === "select" ? 0 : field.type === "multi-select" ? [] : "",
    }));

    setFields(updatedFields);
  };

  return {
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
  };
}
