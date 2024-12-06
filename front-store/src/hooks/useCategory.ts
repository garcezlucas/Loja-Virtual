import { Category } from "@/interfaces/Category";
import { CategoriesService } from "@/service/Categories.service";

export const getCategoriesViewModel = async (): Promise<Category[]> => {
  try {
    const categories = await CategoriesService.getAllCategories();
    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao carregar categorias.");
  }
};
