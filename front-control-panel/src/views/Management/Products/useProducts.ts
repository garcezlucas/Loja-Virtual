import { useState } from "react";
import { ProductsService } from "../../../service/Products.service";
import { Product } from "../../../interfaces/Product";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { Category } from "../../../interfaces/Category";
import { CategoriesService } from "../../../service/Categories.service";
import { Brand } from "../../../interfaces/Brand";
import { BrandService } from "../../../service/Brands.service";
import { getFieldValue } from "../../../utils/getFildValue";
import { maskCurrency, removeMaskCurrency } from "../../../utils/Currencymask";

type FieldName =
  | "shortDescription"
  | "description"
  | "brand"
  | "category"
  | "expense"
  | "price";

interface useProductsProps {
  handleCloseAdd: () => void;
}

export function useProducts({ handleCloseAdd }: useProductsProps) {
  const [tableData, setTableData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Descrição curta",
      name: "shortDescription",
      type: "text",
      value: "",
    },
    { label: "Descrição", name: "description", type: "text", value: "" },
    {
      label: "Marca",
      name: "brand",
      type: "select",
      value: 0,
      options: [],
    },
    {
      label: "Categoria",
      name: "category",
      type: "select",
      value: 0,
      options: [],
    },
    {
      label: "Preço de custo",
      name: "expense",
      type: "text",
      value: "",
      mask: maskCurrency,
    },
    {
      label: "Preço de venda",
      name: "price",
      type: "text",
      value: "",
      mask: maskCurrency,
    },
  ]);

  const getAllProducts = async () => {
    try {
      const response = await ProductsService.getAllProducts();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all products : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await CategoriesService.getAllCategories();
      if (response?.length > 0) {
        const stateOptions = response.map((state: Category) => ({
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
      console.error(`Error when searching all states: ${error}`);
    }
  };

  const getAllBrands = async () => {
    try {
      const response = await BrandService.getAllBrands();
      if (response?.length > 0) {
        const stateOptions = response.map((state: Brand) => ({
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
      console.error(`error when searching all brand : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedProduct) {
      updateProduct();
    } else {
      createProduct();
    }
  };

  const createProduct = async () => {
    const shortDescription = getFieldValue(
      fields,
      "shortDescription"
    ) as string;
    const description = getFieldValue(fields, "description") as string;
    const brandId = getFieldValue(fields, "brand") as number;
    const categoryId = getFieldValue(fields, "category") as number;
    const expense = getFieldValue(fields, "expense") as number;
    const price = getFieldValue(fields, "price") as number;

    const product = {
      shortDescription,
      description,
      brand: { id: brandId },
      category: { id: categoryId },
      expense: removeMaskCurrency(expense),
      price: removeMaskCurrency(price),
    };

    try {
      const response = await ProductsService.createProduct(product);
      if (response?.id) {
        handleCloseAdd();
        getAllProducts();
      }
    } catch (error) {
      console.error(`error when crate product : ${error}`);
    }
  };

  const updateProduct = async () => {
    const shortDescription = getFieldValue(
      fields,
      "shortDescription"
    ) as string;
    const description = getFieldValue(fields, "description") as string;
    const brandId = getFieldValue(fields, "brand") as number;
    const categoryId = getFieldValue(fields, "category") as number;
    const expense = getFieldValue(fields, "expense") as number;
    const price = getFieldValue(fields, "price") as number;

    const product = {
      id: selectedProduct?.id as number,
      shortDescription,
      description,
      brand: { id: brandId },
      category: { id: categoryId },
      expense: removeMaskCurrency(expense),
      price: removeMaskCurrency(price),
    };

    try {
      const response = await ProductsService.updateProduct(product);
      if (response?.id) {
        setOpenEdit(false);
        getAllProducts();
      }
    } catch (error) {
      console.error(`error when update product : ${error}`);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await ProductsService.deleteProduct(id);
      getAllProducts();
    } catch (error) {
      console.error(`error when delete product : ${error}`);
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

    getAllProducts,
    getAllBrands,
    getAllCategories,
    handleSubmit,
    deleteProduct,
    handleCancel,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
