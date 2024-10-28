import { useState } from "react";
import { BrandService } from "../../../service/Brands.service";
import { Brand } from "../../../interfaces/Brand";
import { DynamicField } from "../../../components/DynamicForm/DynamicForm";
import { getFieldValue } from "../../../utils/getFildValue";

import SuccessIcon from '../../../assets/icons/success.svg';
import ErrorIcon from '../../../assets/icons/error.svg';

interface useBrandsProps {
  handleCloseAdd: () => void;
}

export function useBrands({ handleCloseAdd }: useBrandsProps) {
  const [tableData, setTableData] = useState<Brand[]>([]);
  const [filteredData, setFilteredData] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 7;

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Nome*",
      name: "name",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Nome é obrigatório" },
    },
  ]);

  const [requestResponse, setRequestResponse] = useState({
    title: "",
    message: "",
    icon: "",
    open: false,
    success: false,
  });

  const getAllBrands = async () => {
    try {
      const response = await BrandService.getAllBrands();
      if (response?.length >= 0) setTableData(response);
    } catch (error) {
      console.error(`error when searching all brand : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!!selectedBrand) {
      updateBrand();
    } else {
      createBrand();
    }
  };

  const createBrand = async () => {
    const name = getFieldValue(fields, "name") as string;

    const brand = {
      name,
    };

    try {
      const response = await BrandService.createBrand(brand);
      if (response?.id) {
        handleCloseAdd();
        getAllBrands();
        setRequestResponse({
          title: "Adicionado",
          message: "Item adicionado com sucesso",
          icon: SuccessIcon,
          open: true,
          success: true,
        });
      }
    } catch (error) {
      console.error(`error when crate brand : ${error}`);
      setRequestResponse({
        title: "Erro",
        message: "Ocorreu um erro, tente novamente",
        icon: ErrorIcon,
        open: true,
        success: false,
      });
    }
  };

  const updateBrand = async () => {
    const name = getFieldValue(fields, "name") as string;

    const brand = {
      id: selectedBrand?.id as number,
      name,
    };

    try {
      const response = await BrandService.updateBrand(brand);
      if (response?.id) {
        setOpenEdit(false);
        getAllBrands();
        setRequestResponse({
          title: "Atualizado",
          message: "Item atualizado com sucesso",
          icon: SuccessIcon,
          open: true,
          success: true,
        });
      }
    } catch (error) {
      console.error(`error when update brand : ${error}`);
      setRequestResponse({
        title: "Erro",
        message: "Ocorreu um erro, tente novamente",
        icon: ErrorIcon,
        open: true,
        success: false,
      });
    }
  };

  const deleteBrand = async (id: number) => {
    try {
      await BrandService.deleteBrand(id);
      getAllBrands();
    } catch (error) {
      console.error(`error when delete brand : ${error}`);
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

  const handleClearRequestResponse = () => {
    setRequestResponse({
      title: "",
      message: "",
      icon: "",
      open: false,
      success: false,
    });
  };

  const handleCloseEdit = () => {
    handleClearFields();
    setOpenEdit(false);
  };

  const handleCancel = () => {
    handleClearFields();
    handleCloseAdd();
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
    requestResponse,


    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,

    fields,
    openEdit,

    getAllBrands,
    handleSubmit,
    deleteBrand,
    handleCancel,
    handleClearRequestResponse,
    handleCloseEdit,
    handleEditClick,
    handleChange,
  };
}
