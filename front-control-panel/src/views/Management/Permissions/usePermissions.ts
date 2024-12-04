import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PermissionsService } from "../../../service/Permissions.service";

import { Permission } from "../../../interfaces/Permission";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";

interface usePermissionsProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPermission: React.Dispatch<
    React.SetStateAction<Permission | null>
  >;
}

export function usePermissions({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedPermission,
}: usePermissionsProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: PermissionsService.getAllPermissions,
  });

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedPermission: Permission | null
  ) => {
    event.preventDefault();
    const name = getFieldValue(fields, "name") as string;

    if (selectedPermission) {
      updatePermission.mutate({
        id: selectedPermission.id,
        name,
      } as Permission);
    } else {
      createPermission.mutate({
        name,
      } as Permission);
    }
  };

  const createPermission = useMutation<void, Error, Omit<Permission, "id">>({
    mutationFn: (permission) => PermissionsService.createPermission(permission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      handleCloseAdd();
    },
  });

  const updatePermission = useMutation<void, Error, Permission>({
    mutationFn: (permission) => PermissionsService.updatePermission(permission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      handleCloseEdit();
    },
  });

  const deletePermission = useMutation<void, Error, number>({
    mutationFn: (id) => PermissionsService.deletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
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

  const handleEditClick = (row: Permission) => {
    setSelectedPermission(row);
    setOpenEdit(true);

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === "name") {
          return { ...field, value: row.name };
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
    isLoading,
    deletePermission,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
