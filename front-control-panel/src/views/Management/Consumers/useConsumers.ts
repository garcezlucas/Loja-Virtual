import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ConsumersService } from "../../../service/Consumers.service";
import { CitiesService } from "../../../service/Cities.service";

import { Person } from "../../../interfaces/Person";
import { City } from "../../../interfaces/City";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";
import { cepMask, removeCEPMask } from "../../../utils/cepMask";
import { cpfMask, removeCpfMask } from "../../../utils/cpfMask";

type FieldName = "name" | "cpf" | "email" | "address" | "codePostal" | "city";

interface useConsumersProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedConsumer: React.Dispatch<React.SetStateAction<Person | null>>;
}

export function useConsumers({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedConsumer,
}: useConsumersProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<Person[], Error>({
    queryKey: ["consumers"],
    queryFn: ConsumersService.getAllConsumers,
  });

  const { data: cities = [] } = useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: CitiesService.getAllCities,
  });

  const updateFieldsWithCities = () => {
    try {
      if (cities?.length > 0) {
        const stateOptions = cities.map((state: City) => ({
          value: state.id,
          label: state.name,
        }));

        const options = [
          { value: 0, label: "Selecione uma cidade" },
          ...stateOptions,
        ];

        setFields((prevFields) =>
          prevFields.map((field) => {
            if (field.name === "city") {
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
      console.error(`error when update fields with cities: ${error}`);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedConsumer: Person | null
  ) => {
    event.preventDefault();
    const name = getFieldValue(fields, "name") as string;
    const cpf = getFieldValue(fields, "cpf") as string;
    const email = getFieldValue(fields, "email") as string;
    const address = getFieldValue(fields, "address") as string;
    const codePostal = getFieldValue(fields, "codePostal") as string;
    const city = getFieldValue(fields, "city") as number;

    if (selectedConsumer) {
      updateConsumer.mutate({
        id: selectedConsumer.id,
        name,
        cpf: removeCpfMask(cpf),
        email,
        address,
        codePostal: removeCEPMask(codePostal),
        city: { id: city } as City,
      } as Person);
    } else {
      createConsumer.mutate({
        name,
        cpf: removeCpfMask(cpf),
        email,
        address,
        codePostal: removeCEPMask(codePostal),
        city: { id: city } as City,
      } as Person);
    }
  };

  const createConsumer = useMutation<void, Error, Omit<Person, "id">>({
    mutationFn: (collaborator) => ConsumersService.createPerson(collaborator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumers"] });
      handleCloseAdd();
      handleClearFields();
    },
  });

  const updateConsumer = useMutation<void, Error, Person>({
    mutationFn: (collaborator) => ConsumersService.updatePerson(collaborator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumers"] });
      handleCloseEdit();
    },
  });

  const deleteConsumer = useMutation<void, Error, number>({
    mutationFn: (id) => ConsumersService.deletePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumers"] });
    },
  });

  const handleChange = (name: string, value: string | number | string[]) => {
    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === name) {
          const newValue = field.mask ? field.mask(value.toString()) : value;
          return { ...field, value: newValue };
        }
        return field;
      })
    );
  };

  const handleEditClick = (row: Person) => {
    setSelectedConsumer(row);
    setOpenEdit(true);

    const fieldMap: Record<FieldName, string | number | string[]> = {
      name: row.name,
      cpf: cpfMask(row.cpf),
      email: row.email,
      address: row.address,
      codePostal: cepMask(row.codePostal),
      city: row.city.id,
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
    cities,
    isLoading,
    deleteConsumer,
    updateFieldsWithCities,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
