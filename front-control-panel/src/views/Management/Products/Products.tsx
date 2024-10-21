import "../_management.scss";

import { useCallback, useEffect, useMemo } from "react";

import { useProducts } from "./useProducts";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterShortDescriptionDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";
import { maskCurrency } from "../../../utils/Currencymask";

interface ProductsProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Products: React.FC<ProductsProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const {
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
  } = useProducts({ handleCloseAdd });

  useEffect(() => {
    getAllProducts();
    getAllBrands();
    getAllCategories();
  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterShortDescriptionDataIgnoringAccents(
        tableData,
        searchTerm
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, tableData]);

  const renderActionButtons = useCallback(
    (value: number, row: any) => (
      <div className="action-buttons">
        <button
          className="action-buttons-edit"
          onClick={() => handleEditClick(row)}
        >
          <img src={EditIcon} alt="edit" />
        </button>
        <button
          className="action-buttons-delete"
          onClick={() => deleteProduct(value)}
        >
          <img src={DeleteIcon} alt="delete" />
        </button>
      </div>
    ),
    []
  );

  const titleColumns = useMemo(
    () => [
      { label: "ID", width: "20%" },
      { label: "Produto", width: "20%" },
      { label: "Marca", width: "20%" },
      { label: "Categoria", width: "20%" },
      { label: "Preço de custo", width: "20%" },
      { label: "Preço de venda", width: "20%" },
      { label: "", width: "20%" },
    ],
    []
  );

  const columns: Column[] = useMemo(
    () => [
      { label: "id", format: (value) => value || "-", width: "20%" },
      {
        label: "shortDescription",
        format: (value) => value || "-",
        width: "20%",
      },
      { label: "brand", format: (value) => value.name || "-", width: "20%" },
      { label: "category", format: (value) => value.name || "-", width: "20%" },
      {
        label: "expense",
        format: (value) => maskCurrency(value * 100) || "-",
        width: "20%",
      },
      {
        label: "price",
        format: (value) => maskCurrency(value * 100) || "-",
        width: "20%",
      },
      {
        label: "id",
        format: (value, row) => renderActionButtons(value, row),
        width: "20%",
      },
    ],
    []
  );

  const dataTable = filteredData;
  const totalItems = filteredData?.length;
  const heightTable = "42.7rem";
  const heightLoading = "30rem";

  const tableProps = {
    titleColumns,
    columns,
    dataTable,
    page,
    setPage,
    rowsPerPage,
    totalPages,
    setTotalPages,
    totalItems,
    heightTable,
    loading,
    heightLoading,
  };

  return (
    <div>
      <TableComponent tableProps={tableProps} />

      <Modal isOpen={openAdd} onClose={handleCloseAdd}>
        <DynamicForm
          title="Cadastro"
          fields={fields}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={handleSubmit}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Products;
