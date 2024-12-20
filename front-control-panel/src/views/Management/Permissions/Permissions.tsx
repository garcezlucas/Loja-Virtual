import "../_management.scss";

import { useEffect, useState } from "react";

import { usePermissions } from "./usePermissions";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { Permission } from "../../../interfaces/Permission";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";


interface PermissionsProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Permissions: React.FC<PermissionsProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [filteredData, setFilteredData] = useState<Permission[]>([]);
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Nome*",
      name: "name",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Nome é obrigatório" },
    },
  ]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const {
    tableData,
    isLoading,
    deletePermission,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  } = usePermissions({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setSelectedPermission,
  });

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterDataIgnoringAccents(tableData, searchTerm);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, tableData]);
  
  const titleColumns = [
    { label: "ID", width: "33.33%" },
    { label: "Nome", width: "33.33%" },
    { label: "", width: "33.33%" },
  ];

  const columns: Column[] = [
    { label: "id", format: (value) => value || "-", width: "33.33%" },
    { label: "name", format: (value) => value || "-", width: "33.33%" },
    {
      label: "id",
      format: (value, row) => (
        <div className="action-buttons">
          <button
            className="action-buttons-edit"
            onClick={() => handleEditClick(row)}
          >
            <img src={EditIcon} alt="edit" />
          </button>
          <button
            className="action-buttons-delete"
            onClick={() => deletePermission.mutate(value)}
          >
            <img src={DeleteIcon} alt="delete" />
          </button>
        </div>
      ),
      width: "33.33%",
    },
  ];

  const tableProps = {
    titleColumns,
    columns,
    dataTable: filteredData,
    rowsPerPage: 7,
    totalItems: filteredData.length,
    heightTable: "42.7rem",
    loading: isLoading,
    heightLoading: "30rem",
  };

  return (
    <div>
      <TableComponent tableProps={tableProps} />

      <Modal isOpen={openAdd} onClose={handleCloseAdd}>
        <DynamicForm
          title="Cadastro"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedPermission)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedPermission)}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Permissions;
