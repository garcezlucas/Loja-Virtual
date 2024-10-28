import { DynamicField } from "../components/DynamicForm/DynamicForm";

export const getFieldValue = (
  fields: DynamicField[],
  fieldName: string
): string | number | string[] | undefined => {
  const field = fields?.find((field) => field.name === fieldName);
  return field?.value;
};
