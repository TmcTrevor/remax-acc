"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PropertyCarousel = ({
  images,
  className,
  onClick,
}: {
  images: string[];
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload next and previous images
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (images[index]) {
        const img = new window.Image();
        img.src = images[index];
      }
    };

    preloadImage((currentIndex + 1) % images.length); // Preload next image
    preloadImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1); // Preload previous image
  }, [currentIndex, images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-[340px] overflow-hidden rounded-t-lg ${className}`}>
      {/* Image */}
      <Image
        src={images[currentIndex]}
        alt={`Property Image ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        priority // Ensures that the first image is eagerly loaded
        className="rounded-t-lg shadow-2xl"
      />

      {/* Navigation Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
        ›
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
