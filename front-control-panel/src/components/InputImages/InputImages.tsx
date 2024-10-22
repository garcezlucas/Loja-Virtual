import "./_inputImages.scss";
import React from "react";
import { useInputImage } from "./useInputImages";
import AddPhotoIcon from "../../assets/icons/add-photo.svg";
import Carousel from "../Carosel/Carousel";

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
  onImageRemove?: () => void;
  initialImages?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  onImageRemove,
  initialImages,
}) => {
  const {
    imagePreview,
    selectedFiles,
    currentImageIndex,

    handleImageClick,
    handleImageChange,
    handleRemoveImage,
    handleUploadImages,
  } = useInputImage({ onImageUpload, onImageRemove, initialImages });

  return (
    <div className="input-image-container">
      <label htmlFor="file-upload">
        {imagePreview.length > 0 ? (
          <Carousel images={imagePreview} onImageClick={handleImageClick} />
        ) : (
          <div className="input-image-container-placeholder">
            <img src={AddPhotoIcon} alt="add-photo" />
            <span>Clique para adicionar uma imagem</span>
          </div>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {imagePreview.length > 0 && (
        <span>Clique sobre a imagem para adicionar outra imagem</span>
      )}
      <footer className="input-image-container-buttons">
        <button
          onClick={handleRemoveImage}
          disabled={currentImageIndex === null}
          style={{ backgroundColor: "#FF0000" }}
        >
          <span>Remover imagem</span>
        </button>
        <button
          onClick={handleUploadImages}
          disabled={selectedFiles.length === 0}
          style={{ backgroundColor: "#3CB371" }}
        >
          <span>Adicionar imagens</span>
        </button>
      </footer>
    </div>
  );
};

export default ImageUploader;
