import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProductsService } from "../../../service/Products.service";
import { CategoriesService } from "../../../service/Categories.service";
import { BrandService } from "../../../service/Brands.service";
import { ImagesService } from "../../../service/Images.service";

import { Product } from "../../../interfaces/Product";
import { Category } from "../../../interfaces/Category";
import { Brand } from "../../../interfaces/Brand";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";
import { maskCurrency } from "../../../utils/CurrencyMask";

type FieldName =
  | "shortDescription"
  | "description"
  | "brand"
  | "category"
  | "expense"
  | "price";

interface useProductsProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export function useProducts({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setOpenImage,
  selectedProduct,
  setSelectedProduct,
}: useProductsProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: ProductsService.getAllProductsWithoutDiscount,
  });

  const { data: categories = [] } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: CategoriesService.getAllCategories,
  });

  const { data: brands = [] } = useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: BrandService.getAllBrands,
  });

  const updateFieldsWithCategories = async () => {
    try {
      if (categories?.length > 0) {
        const stateOptions = categories.map((state: Category) => ({
          value: state.id,
          label: state.name,
        }));

        const options = [
          { value: 0, label: "Selecione uma categoria" },
          ...stateOptions,
        ];

        setFields((prevFields) =>
          prevFields.map((field) => {
            if (field.name === "category") {
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
      console.error(`Error when update fields with categories: ${error}`);
    }
  };

  const updateFieldsWithBrands = async () => {
    try {
      if (brands?.length > 0) {
        const stateOptions = brands.map((state: Brand) => ({
          value: state.id,
          label: state.name,
        }));

        const options = [
          { value: 0, label: "Selecione uma marca" },
          ...stateOptions,
        ];

        setFields((prevFields) =>
          prevFields.map((field) => {
            if (field.name === "brand") {
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
      console.error(`error when update fields with brands: ${error}`);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedProduct: Product | null
  ) => {
    event.preventDefault();
    const shortDescription = getFieldValue(
      fields,
      "shortDescription"
    ) as string;
    const description = getFieldValue(fields, "description") as string;
    const brandId = getFieldValue(fields, "brand") as number;
    const categoryId = getFieldValue(fields, "category") as number;
    const expense = getFieldValue(fields, "expense") as number;
    const price = getFieldValue(fields, "price") as number;

    if (selectedProduct) {
      updateProduct.mutate({
        id: selectedProduct.id,
        shortDescription,
        description,
        brand: { id: brandId } as Brand,
        category: { id: categoryId } as Category,
        expense,
        price,
      } as Product);
    } else {
      createProduct.mutate({
        shortDescription,
        description,
        brand: { id: brandId } as Brand,
        category: { id: categoryId } as Category,
        expense,
        price,
      } as Product);
    }
  };

  const createProduct = useMutation<void, Error, Omit<Product, "id">>({
    mutationFn: (product) => ProductsService.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      handleCloseAdd();
      handleClearFields();
    },
  });

  const updateProduct = useMutation<void, Error, Product>({
    mutationFn: (product) => ProductsService.updateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      handleCloseEdit();
    },
  });

  const deleteProduct = useMutation<void, Error, number>({
    mutationFn: (id) => ProductsService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const uploadImage = async (files: File[] | null) => {
    if (!files) return;

    const realFiles = files.filter((file) => file.size > 0);

    if (realFiles?.length === 0) return;

    try {
      const productId = selectedProduct?.id?.toString();

      const uploadPromises = realFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("productId", productId as string);
        formData.append("file", file);

        return await ImagesService.uploadImage(formData);
      });

      const responses = await Promise.all(uploadPromises);

      const successfulUploads = responses.filter((response) => response?.id);

      if (successfulUploads.length > 0) {
        handleCloseImageModal();
      }
    } catch (error) {
      console.error(`Error when uploading images: ${error}`);
    }
  };

  const handleOpenImageModal = (row: Product) => {
    setSelectedProduct(row);
    setOpenImage(true);
  };

  const handleCloseImageModal = () => {
    setOpenImage(false);
    setSelectedProduct(null);
  };

  const handleChange = (name: string, value: string | number | string[]) => {
    const isNumber = typeof value === "number";

    setFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === name) {
          if (isNumber) {
            const newValue = field.mask
              ? field.mask(value.toString())
              : value.toString();
            return { ...field, value: newValue };
          }
          const newValue = field.mask
            ? field.mask(value.toString())
            : value.toString();
          return { ...field, value: newValue };
        }
        return field;
      })
    );
  };

  const handleEditClick = (row: Product) => {
    setSelectedProduct(row);
    setOpenEdit(true);

    const fieldMap: Record<FieldName, string | number> = {
      shortDescription: row.shortDescription,
      description: row.description,
      brand: row.brand.id,
      category: row.category.id,
      expense: maskCurrency(row.expense.toFixed(2)),
      price: maskCurrency(row.price.toFixed(2)),
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
    setSelectedProduct(null);
  };

  return {
    tableData,
    categories,
    brands,
    isLoading,
    deleteProduct,
    updateFieldsWithCategories,
    updateFieldsWithBrands,
    handleSubmit,
    uploadImage,
    handleOpenImageModal,
    handleCloseImageModal,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
