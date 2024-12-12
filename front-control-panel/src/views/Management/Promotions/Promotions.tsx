import { useEffect, useState } from "react";

import { usePromotions } from "./usePromotions";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterShortDescriptionObjectDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";

import { Promotion } from "../../../interfaces/Promotion";

interface PromotionsProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Promotions: React.FC<PromotionsProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<Promotion[]>([]);
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Produto*",
      name: "product",
      type: "select",
      value: 0,
      options: [],
      validationRules: { required: true, message: "Produto é obrigatório" },
    },
    {
      label: "Desconto*",
      name: "discount",
      type: "number",
      value: 0,
      validationRules: { required: true, message: "Desconto é obrigatório" },
    },
    {
      label: "Ativo*",
      name: "isValid",
      type: "select",
      value: "",
      options: [
        { label: "Válido", value: "Válido" },
        { label: "Inválido", value: "Inválido" },
      ],
      validationRules: { required: true, message: "Campo é obrigatório" },
    },
  ]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const {
    tableData,
    products,
    isLoading,
    deletePromotion,
    updateFieldsWithStates,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  } = usePromotions({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setSelectedPromotion,
  });

  useEffect(() => {
    updateFieldsWithStates();
  }, [products]);

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterShortDescriptionObjectDataIgnoringAccents(tableData, searchTerm);
      setFilteredData(filtered);
    }
  }, [searchTerm, tableData]);

  const titleColumns = [
    { label: "ID", width: "25%" },
    { label: "Produto", width: "25%" },
    { label: "Desconto", width: "25%" },
    { label: "", width: "25%" },
  ];

  const columns: Column[] = [
    { label: "id", format: (value) => value || "-", width: "25%" },
    {
      label: "product",
      format: (value) => value.shortDescription || "-",
      width: "25%",
    },
    { label: "discount", format: (value) => `${value * 100}%`|| "-", width: "25%" },
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
            onClick={() => deletePromotion.mutate(value)}
          >
            <img src={DeleteIcon} alt="delete" />
          </button>
        </div>
      ),
      width: "25%",
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

  return (
    <div>
      <TableComponent tableProps={tableProps} />

      <Modal isOpen={openAdd} onClose={handleCloseAdd}>
        <DynamicForm
          title="Cadastro"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedPromotion)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedPromotion)}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Promotions;
