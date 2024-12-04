import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CategoriesService } from "../../../service/Categories.service";

import { Category } from "../../../interfaces/Category";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";

interface useCategoriesProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

export function useCategories({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedCategory,
}: useCategoriesProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: CategoriesService.getAllCategories,
  });

  const createCategory = useMutation<void, Error, Omit<Category, "id">>({
    mutationFn: (category) => CategoriesService.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleCloseAdd();
    },
  });

  const updateCategory = useMutation<void, Error, Category>({
    mutationFn: (category) => CategoriesService.updateCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleCloseEdit();
    },
  });

  const deleteCategory = useMutation<void, Error, number>({
    mutationFn: (id) => CategoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedCategory: Category | null
  ) => {
    event.preventDefault();
    const name = getFieldValue(fields, "name") as string;

    if (selectedCategory) {
      updateCategory.mutate({
        id: selectedCategory.id,
        name,
      } as Category);
    } else {
      createCategory.mutate({
        name,
      } as Category);
    }
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
    deleteCategory,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
