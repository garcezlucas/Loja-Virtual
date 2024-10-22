import { useState } from "react";

interface useCarouselProps {
  images: string[];
}

export function useCarousel({ images }: useCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return {
    currentIndex,
    setCurrentIndex,

    nextSlide,
    prevSlide,
  };
}
