import { useState } from "react";
import { PermissionsService } from "../../../service/Permissions.service";
import { Permission } from "../../../interfaces/Permission";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { getFieldValue } from "../../../utils/getFildValue";

interface usePermissionsProps {
  handleCloseAdd: () => void;
}

export function usePermissions({ handleCloseAdd }: usePermissionsProps) {
  const [tableData, setTableData] = useState<Permission[]>([]);
  const [filteredData, setFilteredData] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [fields, setFields] = useState<DynamicField[]>([
    { label: "Nome", name: "name", type: "text", value: "" },
  ]);

  const getAllPermissions = async () => {
    try {
      const response = await PermissionsService.getAllPermissions();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all permission : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedPermission) {
      updatePermission();
    } else {
      createPermission();
    }
  };

  const createPermission = async () => {
    const name = getFieldValue(fields, "name") as string;

    const permission = {
      name,
    };

    try {
      const response = await PermissionsService.createPermission(permission);
      if (response?.id) {
        handleCloseAdd();
        getAllPermissions();
      }
    } catch (error) {
      console.error(`error when crate permission : ${error}`);
    }
  };

  const updatePermission = async () => {
    const name = getFieldValue(fields, "name") as string;

    const permission = {
      id: selectedPermission?.id as number,
      name,
    };

    try {
      const response = await PermissionsService.updatePermission(permission);
      if (response?.id) {
        setOpenEdit(false);
        getAllPermissions();
      }
    } catch (error) {
      console.error(`error when update permission : ${error}`);
    }
  };

  const deletePermission = async (id: number) => {
    try {
      await PermissionsService.deletePermission(id);
      getAllPermissions();
    } catch (error) {
      console.error(`error when delete permission : ${error}`);
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

    getAllPermissions,
    handleSubmit,
    deletePermission,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
