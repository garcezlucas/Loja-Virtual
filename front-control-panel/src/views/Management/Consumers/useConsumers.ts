import { useState } from "react";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { Person } from "../../../interfaces/Person";
import { CitiesService } from "../../../service/Cities.service";
import { City } from "../../../interfaces/City";
import { getFieldValue } from "../../../utils/getFildValue";
import { ConsumersService } from "../../../service/Consumers.service";
import { cepMask, removeCEPMask } from "../../../utils/cepMask";
import { cpfMask, removeCpfMask } from "../../../utils/cpfMask";
import { emailValidator } from "../../../utils/emailValidator";
import { cpfValidator } from "../../../utils/cpfValidator";

type FieldName = "name" | "cpf" | "email" | "address" | "codePostal" | "city";

interface useConsumersProps {
  handleCloseAdd: () => void;
}

export function useConsumers({ handleCloseAdd }: useConsumersProps) {
  const [tableData, setTableData] = useState<Person[]>([]);
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Person | null>(null);

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
      label: "CPF*",
      name: "cpf",
      type: "text",
      value: "",
      mask: cpfMask,
      validationRules: { required: true, message: "Insira um CPF válido" },
      customValidator: cpfValidator,
    },
    {
      label: "Email*",
      name: "email",
      type: "email",
      value: "",
      validationRules: { required: true, message: "Insira um email válido" },
      customValidator: emailValidator,
    },
    {
      label: "Endereço*",
      name: "address",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Edereço é obrigatório" },
    },
    {
      label: "CEP*",
      name: "codePostal",
      type: "text",
      value: "",
      mask: cepMask,
      validationRules: { required: true, message: "Cep é obrigatório" },
    },
    {
      label: "Cidade*",
      name: "city",
      type: "select",
      value: 0,
      options: [],
      validationRules: { required: true, message: "Cidade é obrigatório" },
    },
  ]);

  const getAllConsumers = async () => {
    try {
      const response = await ConsumersService.getAllConsumers();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all consumers: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getAllCities = async () => {
    try {
      const response = await CitiesService.getAllCities();
      if (response?.length > 0) {
        const stateOptions = response.map((state: City) => ({
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
      console.error(`error when searching all brand : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedCollaborator) {
      updateState();
    } else {
      createState();
    }
  };

  const createState = async () => {
    const name = getFieldValue(fields, "name") as string;
    const cpf = getFieldValue(fields, "cpf") as string;
    const email = getFieldValue(fields, "email") as string;
    const address = getFieldValue(fields, "address") as string;
    const codePostal = getFieldValue(fields, "codePostal") as string;
    const city = getFieldValue(fields, "city") as number;

    const collaborator = {
      name,
      cpf: removeCpfMask(cpf),
      email,
      address,
      codePostal: removeCEPMask(codePostal),
      city: { id: city },
    };

    try {
      const response = await ConsumersService.createPerson(collaborator);
      if (response?.id) {
        handleCloseAdd();
        getAllConsumers();
      }
    } catch (error) {
      console.error(`error when crate collaborator: ${error}`);
    } finally {
    }
  };

  const updateState = async () => {
    const name = getFieldValue(fields, "name") as string;
    const cpf = getFieldValue(fields, "cpf") as string;
    const email = getFieldValue(fields, "email") as string;
    const address = getFieldValue(fields, "address") as string;
    const codePostal = getFieldValue(fields, "codePostal") as string;
    const city = getFieldValue(fields, "city") as number;

    const collaborator = {
      id: selectedCollaborator?.id as number,
      name,
      cpf: removeCpfMask(cpf),
      email,
      address,
      codePostal: removeCEPMask(codePostal),
      city: { id: city },
    };

    try {
      const response = await ConsumersService.updatePerson(collaborator);
      if (response?.id) {
        setOpenEdit(false);
        getAllConsumers();
      }
    } catch (error) {
      console.error(`error when update collaborator: ${error}`);
    }
  };

  const deleteState = async (id: number) => {
    try {
      await ConsumersService.deletePerson(id);
      getAllConsumers();
    } catch (error) {
      console.error(`error when delete collaborator: ${error}`);
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

  const handleEditClick = (row: Person) => {
    setSelectedCollaborator(row);
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

    getAllConsumers,
    getAllCities,
    handleSubmit,
    deleteState,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
