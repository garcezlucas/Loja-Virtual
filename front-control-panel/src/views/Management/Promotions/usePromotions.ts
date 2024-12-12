import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PromotionsService } from "../../../service/Promotions.service";
import { ProductsService } from "../../../service/Products.service";

import { Promotion } from "../../../interfaces/Promotion";
import { Product } from "../../../interfaces/Product";

import { DynamicField } from "../../../components/DynamicForm/DynamicForm";

import { getFieldValue } from "../../../utils/getFieldValue";

type FieldName = "discount" | "product";

interface usePromotionsProps {
  handleCloseAdd: () => void;
  fields: DynamicField[];
  setFields: React.Dispatch<React.SetStateAction<DynamicField[]>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPromotion: React.Dispatch<
    React.SetStateAction<Promotion | null>
  >;
}

export function usePromotions ({
  handleCloseAdd,
  fields,
  setFields,
  setOpenEdit,
  setSelectedPromotion,
}: usePromotionsProps) {
    const queryClient = useQueryClient();

    const { data: tableData = [], isLoading } = useQuery<Promotion[], Error>({
      queryKey: ["promotions"],
      queryFn: PromotionsService.getAllPromotions,
    });

    const { data: products = [] } = useQuery<Product[], Error>({
      queryKey: ["products"],
      queryFn: ProductsService.getAllProducts,
    });
  
    const updateFieldsWithStates = () => {
      try {
        if (products?.length > 0) {
          const productOptions = products.map((product: Product) => ({
            value: product.id,
            label: product.shortDescription,
          }));
  
          const options = [
            { value: 0, label: "Selecione um produto" },
            ...productOptions,
          ];
  
          setFields((prevFields) =>
            prevFields.map((field) => {
              if (field.name === "product") {
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
        console.error(`Error when update fields with products: ${error}`);
      }
    };
  
    const handleSubmit = async (
      event: React.FormEvent,
      fields: DynamicField[],
      selectedPromotion: Promotion | null
    ) => {
      event.preventDefault();
      const productId = getFieldValue(fields, "product") as number;
      const isValid = getFieldValue(fields, "isValid") as string;
      const discount = getFieldValue(fields, "discount") as number;
  
      if (selectedPromotion) {
        updatePromotion.mutate({
          id: selectedPromotion.id,
          product: { id: productId } as Product,
          isValid: isValid === 'Válido' ? true : false,
          discount: discount
        } as Promotion);
      } else {
        createPromotion.mutate({
          product: { id: productId } as Product,
          isValid: isValid === 'Válido' ? true : false,
          discount: discount
        } as Promotion);
      }
    };
  
    const createPromotion = useMutation<void, Error, Omit<Promotion, "id">>({
      mutationFn: (promotion) => PromotionsService.createPromotion(promotion),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["promotions"] });
        handleCloseAdd();
      },
    });
  
    const updatePromotion = useMutation<void, Error, Promotion>({
      mutationFn: (promotion) => PromotionsService.updatePromotion(promotion),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["promotions"] });
        handleCloseEdit();
      },
    });
  
    const deletePromotion = useMutation<void, Error, number>({
      mutationFn: (id) => PromotionsService.deletePromotion(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["promotions"] });
      },
    });
  
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
  
    const handleEditClick = (row: Promotion) => {
      setSelectedPromotion(row);
      setOpenEdit(true);
  
      const fieldMap: Record<FieldName, string | number> = {
        discount: row.discount,
        product: row.product.id,
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
        products,
        isLoading,
        deletePromotion,
        updateFieldsWithStates,
        handleSubmit,
        handleChange,
        handleEditClick,
        handleCancel,
        handleCloseEdit,
    }
}