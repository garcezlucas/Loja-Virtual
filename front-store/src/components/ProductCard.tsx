import { Product } from "@/interfaces/Product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <Image
      src={
        product?.images?.[0]?.file
          ? `data:image;base64, ${product.images[0].file}`
          : "/placeholder.png"
      }
      alt={product.shortDescription}
      className="w-full h-48 object-cover"
      width={600}
      height={400}
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{product.shortDescription}</h3>
      <p className="text-gray-600 mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {product.description}
      </p>
      {!product.discount ? (
        <p className="text-[#4A90E2] font-bold mt-2">R${product.price}</p>
      ) : (
        <div className="mt-2">
          <p className="text-gray-400 line-through">
            R$ {product?.price.toFixed(2)}
          </p>
          <p className="text-[#4A90E2] font-bold">
            R${" "}
            {(
              product?.price -
              product?.price * (product.discount ?? 0)
            ).toFixed(2)}
          </p>
        </div>
      )}
      <Link
        href={`/products/${product.id}`}
        className="mt-4 block text-center bg-[#4A90E2] text-white font-semibold py-2 px-4 rounded hover:bg-[#3A70B3] transition-colors"
      >
        Ver Detalhes
      </Link>
    </div>
  </div>
);

export default ProductCard;
