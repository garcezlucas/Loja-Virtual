import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { StatesService } from "../../../service/States.service";

import { State } from "../../../interfaces/State";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";

type FieldName = "name" | "acronym";

interface useStatesProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedState: React.Dispatch<React.SetStateAction<State | null>>;
}

export function useStates({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedState,
}: useStatesProps) {
  const queryClient = useQueryClient();

  const { data: tableData = [], isLoading } = useQuery<State[], Error>({
    queryKey: ["states"],
    queryFn: StatesService.getAllStates,
  });

  const createState = useMutation<void, Error, Omit<State, "id">>({
    mutationFn: (brand) => StatesService.createStates(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      handleCloseAdd();
    },
  });

  const updateState = useMutation<void, Error, State>({
    mutationFn: (brand) => StatesService.updateStates(brand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      handleCloseEdit();
    },
  });

  const deleteState = useMutation<void, Error, number>({
    mutationFn: (id) => StatesService.deleteState(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
  });

  const handleSubmit = async (
    event: React.FormEvent,
    fields: DynamicField[],
    selectedState: State | null
  ) => {
    event.preventDefault();
    const name = getFieldValue(fields, "name") as string;
    const acronym = getFieldValue(fields, "acronym") as string;

    if (selectedState) {
      updateState.mutate({
        id: selectedState.id,
        name,
        acronym,
      } as State);
    } else {
      createState.mutate({
        name,
        acronym,
      } as State);
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

  const handleEditClick = (row: State) => {
    setSelectedState(row);
    setOpenEdit(true);

    const fieldMap: Record<FieldName, string | number> = {
      name: row.name,
      acronym: row.acronym,
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
  };

  return {
    tableData,
    isLoading,
    deleteState,
    handleSubmit,
    handleChange,
    handleEditClick,
    handleCancel,
    handleCloseEdit,
  };
}
