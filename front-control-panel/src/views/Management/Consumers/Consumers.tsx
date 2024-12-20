import "../_management.scss";

import { useEffect, useState } from "react";

import { useConsumers } from "./useConsumers";

import Modal from "../../../components/Modal/Modal";
import TableComponent, { Column } from "../../../components/Table/Table";
import DynamicForm, {
  DynamicField,
} from "../../../components/DynamicForm/DynamicForm";

import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { filterDataIgnoringAccents } from "../../../utils/filterDataIgnoringAccents";
import { Person, PersonPermission } from "../../../interfaces/Person";
import { cpfMask } from "../../../utils/cpfMask";
import { cpfValidator } from "../../../utils/cpfValidator";
import { emailValidator } from "../../../utils/emailValidator";
import { cepMask } from "../../../utils/cepMask";

interface ConsumersProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Consumers: React.FC<ConsumersProps> = ({
  searchTerm,
  openAdd,
  handleCloseAdd,
}) => {
  const [selectedConsumer, setSelectedConsumer] = useState<Person | null>(null);
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [fields, setFields] = useState<DynamicField[]>([
    {
      label: "Nome*",
      name: "name",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Nome é obrigatório" },
    },
    {
      label: "CPF*",
      name: "cpf",
      type: "text",
      value: "",
      mask: cpfMask,
      validationRules: { required: true, message: "Insira um CPF válido" },
      customValidator: cpfValidator,
    },
    {
      label: "Email*",
      name: "email",
      type: "email",
      value: "",
      validationRules: { required: true, message: "Insira um email válido" },
      customValidator: emailValidator,
    },
    {
      label: "Endereço*",
      name: "address",
      type: "text",
      value: "",
      validationRules: { required: true, message: "Edereço é obrigatório" },
    },
    {
      label: "CEP*",
      name: "codePostal",
      type: "text",
      value: "",
      mask: cepMask,
      validationRules: { required: true, message: "Cep é obrigatório" },
    },
    {
      label: "Cidade*",
      name: "city",
      type: "select",
      value: 0,
      options: [],
      validationRules: { required: true, message: "Cidade é obrigatório" },
    },
  ]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const {
    tableData,
    cities,
    isLoading,
    deleteConsumer,
    updateFieldsWithCities,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  } = useConsumers({
    handleCloseAdd,
    fields,
    setFields,
    setOpenEdit,
    setSelectedConsumer,
  });

  useEffect(() => {
    updateFieldsWithCities();
  }, [cities]);

  useEffect(() => {
    if (tableData.length > 0) {
      const filtered = filterDataIgnoringAccents(tableData, searchTerm);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, tableData]);

  const titleColumns = [
    { label: "ID", width: "14.28%" },
    { label: "Nome", width: "14.28%" },
    { label: "CPF", width: "14.28%" },
    { label: "Email", width: "14.28%" },
    { label: "Endereço", width: "14.28%" },
    { label: "Permissões", width: "14.28%" },
    { label: "", width: "14.28%" },
  ];

  const columns: Column[] = [
    { label: "id", format: (value) => value || "-", width: "14.28%" },
    { label: "name", format: (value) => value || "-", width: "14.28%" },
    { label: "cpf", format: (value) => cpfMask(value) || "-", width: "14.28%" },
    { label: "email", format: (value) => value || "-", width: "14.28%" },
    {
      label: "address",
      format: (value, row) =>
        `${value}, ${row.city.name} - ${row.city.state.acronym}` || "-",
      width: "14.28%",
    },
    {
      label: "personPermissions",
      format: (value: PersonPermission[]) => {
        if (value && value.length > 0) {
          return value
            .map((permission) => permission.permission.name)
            .join(", ");
        }
        return "-";
      },
      width: "14.28%",
    },
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
            onClick={() => deleteConsumer.mutate(value)}
          >
            <img src={DeleteIcon} alt="delete" />
          </button>
        </div>
      ),
      width: "14.28%",
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
          handleSubmit={(e) => handleSubmit(e, fields, selectedConsumer)}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      </Modal>

      <Modal isOpen={openEdit} onClose={handleCloseEdit}>
        <DynamicForm
          title="Editar"
          fields={fields}
          handleSubmit={(e) => handleSubmit(e, fields, selectedConsumer)}
          handleCancel={handleCloseEdit}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default Consumers;
