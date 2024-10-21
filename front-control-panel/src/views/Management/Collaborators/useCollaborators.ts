import { useState } from "react";
import { CollaboratorsService } from "../../../service/Collaborators.service";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { Person } from "../../../interfaces/Person";
import { CitiesService } from "../../../service/Cities.service";
import { City } from "../../../interfaces/City";
import { Permission } from "../../../interfaces/Permission";
import { PermissionsService } from "../../../service/Permissions.service";
import { getFieldValue } from "../../../utils/getFildValue";

type FieldName =
  | "name"
  | "cpf"
  | "email"
  | "address"
  | "codePostal"
  | "city"
  | "permissions";

interface useCollaboratorsProps {
  handleCloseAdd: () => void;
}

export function useCollaborators({ handleCloseAdd }: useCollaboratorsProps) {
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
    { label: "Nome", name: "name", type: "text", value: "" },
    { label: "CPF", name: "cpf", type: "text", value: "" },
    { label: "Email", name: "email", type: "text", value: "" },
    { label: "Endereço", name: "address", type: "text", value: "" },
    { label: "CEP", name: "codePostal", type: "text", value: "" },
    {
      label: "Cidade",
      name: "city",
      type: "select",
      value: 0,
      options: [],
    },
    {
      label: "Permissões",
      name: "permissions",
      type: "multi-select",
      value: [],
      options: [],
    },
  ]);

  const getAllCollaborators = async () => {
    try {
      const response = await CollaboratorsService.getAllCollaborators();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all collaborators: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getAllPermission = async () => {
    try {
      const response = await PermissionsService.getAllPermissions();
      if (response?.length > 0) {
        const stateOptions = response.map((state: Permission) => ({
          value: state.id,
          label: state.name,
        }));

        const options = [
          { value: 0, label: "Selecione uma permissão" },
          ...stateOptions,
        ];

        setFields((prevFields) =>
          prevFields.map((field) => {
            if (field.name === "permissions") {
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
    const permissions = getFieldValue(fields, "permissions") as string[];

    const transformedPermissions = permissions.map((permission) => ({
      permission: {
        id: Number(permission),
      },
    }));

    const collaborator = {
      name,
      cpf,
      email,
      address,
      codePostal,
      city: { id: city },
      personPermissions: transformedPermissions,
    };

    try {
      const response = await CollaboratorsService.createPerson(collaborator);
      if (response?.id) {
        handleCloseAdd();
        getAllCollaborators();
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
    const permissions = getFieldValue(fields, "permissions") as string[];

    const transformedPermissions = permissions.map((permission) => ({
      permission: {
        id: Number(permission),
      },
    }));

    const collaborator = {
      id: selectedCollaborator?.id as number,
      name,
      cpf,
      email,
      address,
      codePostal,
      city: { id: city },
      personPermissions: transformedPermissions,
    };

    try {
      const response = await CollaboratorsService.updatePerson(collaborator);
      if (response?.id) {
        setOpenEdit(false);
        getAllCollaborators();
      }
    } catch (error) {
      console.error(`error when update collaborator: ${error}`);
    }
  };

  const deleteState = async (id: number) => {
    try {
      await CollaboratorsService.deletePerson(id);
      getAllCollaborators();
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
      cpf: row.cpf,
      email: row.email,
      address: row.address,
      codePostal: row.codePostal,
      city: row.city.id,
      permissions: row.personPermissions.map((permissions) =>
        permissions.permission.id?.toString()
      ),
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
        const { type, value: currentValue } = field;

        if (field.name !== name) {
          return field;
        }

        if (type === "multi-select") {
          const newValue = Array.isArray(currentValue) ? [...currentValue] : [];

          if (typeof value === "string") {
            const updatedValue = newValue.includes(value)
              ? newValue.filter((v) => v !== value)
              : [...newValue, value];

            return { ...field, value: updatedValue };
          }

          if (Array.isArray(value)) {
            return { ...field, value };
          }

          return field;
        }

        if (typeof value === "number") {
          return { ...field, value: value.toString() };
        }

        return { ...field, value };
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

    getAllCollaborators,
    getAllCities,
    getAllPermission,
    handleSubmit,
    deleteState,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
