import "./_carousel.scss";

import React, { useEffect } from "react";

import { useCarousel } from "./useCarousel";

interface CarouselProps {
  images: string[];
  onImageClick?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ images, onImageClick }) => {
  const {
    currentIndex,
    setCurrentIndex,

    nextSlide,
    prevSlide,
  } = useCarousel({ images });

  useEffect(() => {
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(images.length > 0 ? images.length - 1 : 0);
    }
  }, [images]);

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-slides">
        {images.length > 0 && (
          <div className="carousel-slide">
            <img src={images[currentIndex]} alt={`image-${currentIndex + 1}`} />
          </div>
        )}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
