import "../_management.scss";

import { useCallback, useEffect, useMemo } from "react";

import { useProducts } from "./useProducts";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import ImageUploader from "../../../components/InputImages/InputImages";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import AddPhotoIcon from "../../../assets/icons/add-photo.svg";

import { filterShortDescriptionDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";
import { maskCurrency } from "../../../utils/Currencymask";
import { Image } from "../../../interfaces/Image";
import Carousel from "../../../components/Carosel/Carousel";

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
    selectedProduct,
    loading,

    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,

    fields,
    openEdit,
    openImage,

    getAllProducts,
    getAllBrands,
    getAllCategories,
    handleSubmit,
    deleteProduct,
    handleCancel,
    handleCloseEdit,
    uploadImage,
    handleOpenImageModal,
    handleCloseImageModal,
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
          className="action-buttons-add"
          onClick={() => handleOpenImageModal(row)}
        >
          <img src={AddPhotoIcon} alt="edit" />
        </button>
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
      { label: "ID", width: "12.5%" },
      { label: "Imagem", width: "12.5%" },
      { label: "Produto", width: "12.5%" },
      { label: "Marca", width: "12.5%" },
      { label: "Categoria", width: "12.5%" },
      { label: "Preço de custo", width: "12.5%" },
      { label: "Preço de venda", width: "12.5%" },
      { label: "", width: "12.5%" },
    ],
    []
  );

  const renderImages = (images: Image[]) => {
    if (!images || images.length === 0) {
      return "-";
    }

    const lisImages = images.map((image) => {
      return `data:image;base64, ${image.file}`;
    });

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "3rem",
          height: "3rem",
        }}
      >
        <Carousel images={lisImages} />
      </div>
    );
  };

  const columns: Column[] = useMemo(
    () => [
      { label: "id", format: (value) => value || "-", width: "12.5%" },
      {
        label: "images",
        format: (value) => renderImages(value),
        width: "12.5%",
      },
      {
        label: "shortDescription",
        format: (value) => value || "-",
        width: "12.5%",
      },
      { label: "brand", format: (value) => value.name || "-", width: "12.5%" },
      {
        label: "category",
        format: (value) => value.name || "-",
        width: "12.5%",
      },
      {
        label: "expense",
        format: (value) => maskCurrency(value.toFixed(2)) || "-",
        width: "12.5%",
      },
      {
        label: "price",
        format: (value) => maskCurrency(value.toFixed(2)) || "-",
        width: "12.5%",
      },
      {
        label: "id",
        format: (value, row) => renderActionButtons(value, row),
        width: "12.5%",
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

  const initialImages = selectedProduct?.images.map((image) => {
    return `data:image;base64, ${image.file}`;
  });

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

      <Modal isOpen={openImage} onClose={handleCloseImageModal}>
        <ImageUploader
          onImageUpload={uploadImage}
          initialImages={initialImages}
        />
      </Modal>
    </div>
  );
};

export default Products;
