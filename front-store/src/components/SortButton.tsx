import Link from "next/link";

interface SortButtonProps {
  currentSort: string;
  sortOption: string;
  label: string;
}

const SortButton = ({ currentSort, sortOption, label }: SortButtonProps) => (
  <Link href={`/products?sort=${sortOption}`} passHref>
    <button
      className={`px-4 py-2 ${
        currentSort === sortOption
          ? "bg-[#4A90E2] text-white"
          : "bg-[#FAFAFA] text-[#333333]"
      }`}
    >
      {label}
    </button>
  </Link>
);

export default SortButton;
