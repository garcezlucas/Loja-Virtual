import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BrandService } from "../../../service/Brands.service";

import { Brand } from "../../../interfaces/Brand";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";

interface useBrandsProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBrand: React.Dispatch<React.SetStateAction<Brand | null>>;
}

export function useBrands({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedBrand,
}: useBrandsProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: BrandService.getAllBrands,
  });

  const createBrand = useMutation<void, Error, Omit<Brand, "id">>({
    mutationFn: (brand) => BrandService.createBrand(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      handleCloseAdd();
    },
  });

  const updateBrand = useMutation<void, Error, Brand>({
    mutationFn: (brand) => BrandService.updateBrand(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      handleCloseEdit();
    },
  });

  const deleteBrand = useMutation<void, Error, number>({
    mutationFn: (id) => BrandService.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedBrand: Brand | null
  ) => {
    event.preventDefault();
    const name = getFieldValue(fields, "name") as string;

    if (selectedBrand) {
      updateBrand.mutate({
        id: selectedBrand.id,
        name,
      } as Brand);
    } else {
      createBrand.mutate({
        name,
      } as Brand);
    }
  };

  const handleChange = (name: string, value: string | number | string[]) => {
    const isNumber = typeof value === "number";

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === name) {
          return { ...field, value: isNumber ? value.toString() : value };
        }
        return field;
      })
    );
  };

  const handleEditClick = (row: Brand) => {
    setSelectedBrand(row);
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
    deleteBrand,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
