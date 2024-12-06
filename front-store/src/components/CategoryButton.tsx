import Link from "next/link";
import { Category } from "@/interfaces/Category";

interface CategoryButtonProps {
  category: Category;
  currentCategoryId: string | null;
  sort: string;
}

const CategoryButton = ({
  category,
  currentCategoryId,
  sort,
}: CategoryButtonProps) => (
  <Link href={`/products?categoryId=${category.id}&sort=${sort}`} passHref>
    <button
      className={`px-4 py-2 ${
        currentCategoryId === category.id.toString()
          ? "bg-[#4A90E2] text-white"
          : "bg-[#FAFAFA] text-[#333333]"
      } font-semibold rounded hover:bg-[#F0F0F0] transition-colors`}
    >
      {category.name}
    </button>
  </Link>
);

export default CategoryButton;
