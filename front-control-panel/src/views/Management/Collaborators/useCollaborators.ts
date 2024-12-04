import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CollaboratorsService } from "../../../service/Collaborators.service";
import { CitiesService } from "../../../service/Cities.service";
import { PermissionsService } from "../../../service/Permissions.service";

import { Person, PersonPermission } from "../../../interfaces/Person";
import { City } from "../../../interfaces/City";
import { Permission } from "../../../interfaces/Permission";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";
import { cpfMask, removeCpfMask } from "../../../utils/cpfMask";
import { cepMask, removeCEPMask } from "../../../utils/cepMask";

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
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCollaborator: React.Dispatch<React.SetStateAction<Person | null>>;
}

export function useCollaborators({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedCollaborator,
}: useCollaboratorsProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<Person[], Error>({
    queryKey: ["collaborators"],
    queryFn: CollaboratorsService.getAllCollaborators,
  });

  const { data: permissions = [] } = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: PermissionsService.getAllPermissions,
  });

  const { data: cities = [] } = useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: CitiesService.getAllCities,
  });

  const updateFieldsWithPermission = async () => {
    try {
      if (permissions?.length > 0) {
        const permissionOptions = permissions.map((permission: Permission) => ({
          value: permission.id,
          label: permission.name,
        }));

        const options = [
          { value: 0, label: "Selecione uma permissão" },
          ...permissionOptions,
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
      console.error(`Error when update fields with permissions: ${error}`);
    }
  };

  const updateFieldsWithCities = async () => {
    try {
      if (cities?.length > 0) {
        const cityOptions = cities.map((city: City) => ({
          value: city.id,
          label: city.name,
        }));

        const options = [
          { value: 0, label: "Selecione uma cidade" },
          ...cityOptions,
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
      console.error(`Error when update fields with cities : ${error}`);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedCollaborator: Person | null
  ) => {
    event.preventDefault();
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

    if (selectedCollaborator) {
      updateCollaborator.mutate({
        id: selectedCollaborator.id,
        name,
        cpf: removeCpfMask(cpf),
        email,
        address,
        codePostal: removeCEPMask(codePostal),
        city: { id: city } as City,
        personPermissions: transformedPermissions as PersonPermission[],
      } as Person);
    } else {
      createCollaborator.mutate({
        name,
        cpf: removeCpfMask(cpf),
        email,
        address,
        codePostal: removeCEPMask(codePostal),
        city: { id: city } as City,
        personPermissions: transformedPermissions as PersonPermission[],
      } as Person);
    }
  };

  const createCollaborator = useMutation<void, Error, Omit<Person, "id">>({
    mutationFn: (collaborator) =>
      CollaboratorsService.createPerson(collaborator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaborators"] });
      handleCloseAdd();
    },
  });

  const updateCollaborator = useMutation<void, Error, Person>({
    mutationFn: (collaborator) =>
      CollaboratorsService.updatePerson(collaborator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaborators"] });
      handleCloseEdit();
    },
  });

  const deleteCollaborator = useMutation<void, Error, number>({
    mutationFn: (id) => CollaboratorsService.deletePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaborators"] });
    },
  });

  const handleChange = (name: string, value: string | number | string[]) => {
    setFields((prevFields) =>
      prevFields.map((field) => {
        const { type, value: currentValue, mask } = field;

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

        const newValue = mask ? mask(value.toString()) : value;

        if (typeof value === "number") {
          return { ...field, value: newValue.toString() };
        }

        return { ...field, value: newValue };
      })
    );
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
    permissions,
    cities,
    isLoading,
    deleteCollaborator,
    updateFieldsWithPermission,
    updateFieldsWithCities,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
