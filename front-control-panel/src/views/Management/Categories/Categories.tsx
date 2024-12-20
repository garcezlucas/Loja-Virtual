import "../_management.scss";

import { useMemo, useState } from "react";

import { useCategories } from "./useCategories";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";

import { Category } from "../../../interfaces/Category";

interface CategoriesProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Categories: React.FC<CategoriesProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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
    deleteCategory,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  } = useCategories({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setSelectedCategory,
  });

  const filteredData = useMemo(() => {
    if (tableData.length > 0) {
      return filterDataIgnoringAccents(tableData, searchTerm);
    }
    return [];
  }, [tableData, searchTerm]);

  const titleColumns = useMemo(
    () => [
      { label: "ID", width: "33.33%" },
      { label: "Nome", width: "33.33%" },
      { label: "", width: "33.33%" },
    ],
    []
  );

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
            onClick={() => deleteCategory.mutate(value)}
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
    totalItems: filteredData?.length,
    rowsPerPage: 7,
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
          handleSubmit={(e) => handleSubmit(e, fields, selectedCategory)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedCategory)}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Categories;
