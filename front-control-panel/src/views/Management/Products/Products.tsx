import "../_management.scss";

import { useEffect, useState } from "react";

import { useProducts } from "./useProducts";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";
import ImageUploader from "../../../components/InputImages/InputImages";
import Carousel from "../../../components/Carosel/Carousel";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import AddPhotoIcon from "../../../assets/icons/add-photo.svg";

import { filterShortDescriptionDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";
import { maskCurrency } from "../../../utils/CurrencyMask";

import { Image } from "../../../interfaces/Image";
import { Product } from "../../../interfaces/Product";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Descrição curta*",
      name: "shortDescription",
      type: "text",
      value: "",
      validationRules: {
        required: true,
        message: "Descrição curta é obrigatório",
      },
    },
    {
      label: "Descrição*",
      name: "description",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Descrição é obrigatório" },
    },
    {
      label: "Marca*",
      name: "brand",
      type: "select",
      value: 0,
      options: [],
      validationRules: { required: true, message: "Marca é obrigatório" },
    },
    {
      label: "Categoria*",
      name: "category",
      type: "select",
      value: 0,
      options: [],
      validationRules: { required: true, message: "Categoria é obrigatório" },
    },
    {
      label: "Preço de custo*",
      name: "expense",
      type: "text",
      value: "",
      mask: maskCurrency,
      validationRules: {
        required: true,
        message: "Preço de custo é obrigatório",
      },
    },
    {
      label: "Preço de venda*",
      name: "price",
      type: "text",
      value: "",
      mask: maskCurrency,
      validationRules: {
        required: true,
        message: "Preço de venda é obrigatório",
      },
    },
  ]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);

  const {
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
  } = useProducts({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setOpenImage,
    selectedProduct,
    setSelectedProduct,
  });

  useEffect(() => {
    updateFieldsWithCategories();
  }, [categories]);

  useEffect(() => {
    updateFieldsWithBrands();
  }, [brands]);

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterShortDescriptionDataIgnoringAccents(
        tableData,
        searchTerm
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, tableData]);

  const titleColumns = [
    { label: "ID", width: "12.5%" },
    { label: "Imagem", width: "12.5%" },
    { label: "Produto", width: "12.5%" },
    { label: "Marca", width: "12.5%" },
    { label: "Categoria", width: "12.5%" },
    { label: "Preço de custo", width: "12.5%" },
    { label: "Preço de venda", width: "12.5%" },
    { label: "", width: "12.5%" },
  ];

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

  const columns: Column[] = [
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
      format: (value, row) => (
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
            onClick={() => deleteProduct.mutate(value)}
          >
            <img src={DeleteIcon} alt="delete" />
          </button>
        </div>
      ),
      width: "12.5%",
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
          handleSubmit={(e) => handleSubmit(e, fields, selectedProduct)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedProduct)}
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
