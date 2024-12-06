import { Category } from "@/interfaces/Category";
import CategoryButton from "./CategoryButton";
import SortButton from "./SortButton";
import Link from "next/link";

interface FiltersProps {
  categories: Category[];
  categoryId: string | null;
  sort: string;
}

const Filters = ({ categories, categoryId, sort }: FiltersProps) => (
  <section className="container mx-auto py-8 px-4 flex flex-wrap justify-between items-center gap-12">
    <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
      <Link href="/products" passHref>
        <button
          className={`px-4 py-2 ${
            !categoryId
              ? "bg-[#4A90E2] text-white"
              : "bg-[#FAFAFA] text-[#333333]"
          } font-semibold rounded hover:bg-[#3A70B3] transition-colors`}
        >
          Todos
        </button>
      </Link>
      {categories?.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
          currentCategoryId={categoryId}
          sort={sort}
        />
      ))}
    </div>

    <div className="flex flex-wrap gap-4">
      <SortButton currentSort={sort} sortOption="recent" label="Mais Recentes" />
      <SortButton
        currentSort={sort}
        sortOption="low_to_high"
        label="Preço: Menor para Maior"
      />
      <SortButton
        currentSort={sort}
        sortOption="high_to_low"
        label="Preço: Maior para Menor"
      />
    </div>
  </section>
);

export default Filters;
