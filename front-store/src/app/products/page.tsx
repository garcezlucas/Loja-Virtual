import { getCategoriesViewModel } from "@/hooks/useCategory";
import {
  getProductsByCategoryViewModel,
  getProductsViewModel,
} from "@/hooks/useProducts";
import { Category } from "@/interfaces/Category";
import { Product } from "@/interfaces/Product";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";

const Products = async ({
  searchParams,
}: {
  searchParams: { categoryId: string | null; sort: string };
}) => {
  const { categoryId, sort } = searchParams || {
    categoryId: null,
    sort: "recent",
  };

  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    categories = await getCategoriesViewModel();
    if (categoryId) {
      products = await getProductsByCategoryViewModel(categoryId);
    } else {
      products = await getProductsViewModel();
    }
  } catch (error) {
    console.error("Erro ao carregar categorias ou produtos:", error);
  }

  const sortedProducts = [...products];
  if (sort === "recent") {
    sortedProducts.sort((a, b) => {
      const dateA = a.creationDate ? new Date(a.creationDate).getTime() : 0;
      const dateB = b.creationDate ? new Date(b.creationDate).getTime() : 0;
      return dateB - dateA;
    });
  } else if (sort === "low_to_high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high_to_low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-[#DDDEE5] min-h-screen">
      <header className="bg-[#FAFAFA] text-center py-12">
        <h1 className="text-4xl font-bold text-[#333333]">Produtos</h1>
        <p className="mt-4 text-lg text-[#333333]">
          Explore nossa seleção de produtos e encontre as melhores ofertas para
          você.
        </p>
      </header>
      <Filters categories={categories} categoryId={categoryId} sort={sort} />
      <section className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
