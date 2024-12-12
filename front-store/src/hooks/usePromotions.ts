import { Promotion } from "@/interfaces/Promotion";
import { PromotionsService } from "@/service/Promotions.service";

export const getPromotionsViewModel = async (): Promise<Promotion[]> => {
  try {
    const promotions = await PromotionsService.getAllPromotions();
    return promotions;
  } catch (error) {
    console.error(`Erro ao buscar produtos: ${error}`);
    throw new Error("Erro ao carregar produtos.");
  }
};

export const getPromotionViewModel = async (id: string): Promise<Promotion> => {
  try {
    const promotion = await PromotionsService.getPromotion(id);
    return promotion;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}: ${error}`);
    throw new Error("Erro ao carregar produto.");
  }
};
