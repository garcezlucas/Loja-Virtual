import Image from "next/image";

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ src, alt, onClick }) => (
  <button onClick={onClick} aria-label={alt} className="p-2">
    <Image src={src} alt={alt} width={24} height={24} />
  </button>
);

export default IconButton;
