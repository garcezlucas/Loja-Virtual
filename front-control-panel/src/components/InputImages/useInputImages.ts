import { useState, ChangeEvent } from "react";

interface useInputImageProps {
  onImageUpload: (files: File[]) => void;
  onImageRemove?: () => void;
  initialImages?: string[];
}

export function useInputImage({
  onImageUpload,
  onImageRemove,
  initialImages = [],
}: useInputImageProps) {
  const [imagePreview, setImagePreview] = useState<string[]>(initialImages);
  const [selectedFiles, setSelectedFiles] = useState<File[]>(() =>
    Array.from({ length: initialImages.length }, () => new File([], ""))
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newImagePreview = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreview((prevImages) => [...prevImages, ...newImagePreview]);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview((prevImages) =>
      prevImages.filter((_, i) => i !== currentImageIndex)
    );
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== currentImageIndex)
    );

    if (onImageRemove) onImageRemove();
  };

  const handleUploadImages = () => {
    if (selectedFiles.length > 0) onImageUpload(selectedFiles);
  };
  
  return {
    imagePreview,
    selectedFiles,
    currentImageIndex,

    handleImageClick,
    handleImageChange,
    handleRemoveImage,
    handleUploadImages,
  };
}
