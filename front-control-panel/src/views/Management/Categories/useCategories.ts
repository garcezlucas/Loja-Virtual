import { useState } from "react";
import { CategoriesService } from "../../../service/Categories.service";
import { Category } from "../../../interfaces/Category";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { getFieldValue } from "../../../utils/getFildValue";

interface useCategoriesProps {
  handleCloseAdd: () => void;
}

export function useCategories({ handleCloseAdd }: useCategoriesProps) {
  const [tableData, setTableData] = useState<Category[]>([]);
  const [filteredData, setFilteredData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [fields, setFields] = useState<DynamicField[]>([
    { label: "Nome", name: "name", type: "text", value: "" },
  ]);

  const getAllCategories = async () => {
    try {
      const response = await CategoriesService.getAllCategories();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all categories : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedCategory) {
      updateCategory();
    } else {
      createCategory();
    }
  };

  const createCategory = async () => {
    const name = getFieldValue(fields, "name") as string;

    const category = {
      name,
    };

    try {
      const response = await CategoriesService.createCategory(category);
      if (response?.id) {
        handleCloseAdd();
        getAllCategories();
      }
    } catch (error) {
      console.error(`error when crate category : ${error}`);
    }
  };

  const updateCategory = async () => {
    const name = getFieldValue(fields, "name") as string;

    const category = {
      id: selectedCategory?.id as number,
      name,
    };

    try {
      const response = await CategoriesService.updateCategory(category);
      if (response?.id) {
        setOpenEdit(false);
        getAllCategories();
      }
    } catch (error) {
      console.error(`error when update category : ${error}`);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await CategoriesService.deleteCategory(id);
      getAllCategories();
    } catch (error) {
      console.error(`error when delete category : ${error}`);
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

  const handleEditClick = (row: Category) => {
    setSelectedCategory(row);
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

    getAllCategories,
    handleSubmit,
    deleteCategory,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
