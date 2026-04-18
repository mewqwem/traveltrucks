"use client";

import css from "./Gallery.module.css";
import Image from "next/image";
import { TruckGallery } from "@/types/campers";
import { useState } from "react";

interface ImageGalleryProps {
  images: TruckGallery[];
}

const Gallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainImage = images[selectedIndex]?.original;

  return (
    <div className={css.galleryWrapper}>
      <div className={css.imageContainer}>
        <Image
          src={mainImage}
          alt="Main camper image"
          className={css.image}
          width={638}
          height={505}
        />
      </div>

      <div className={css.thumbnailsContainer}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`${css.thumbnailButton} ${
              index === selectedIndex ? css.thumbnailButtonActive : ""
            }`}
          >
            <div className={css.thumbContainer}>
              <Image
                src={image.thumb}
                alt={`Camper thumbnail ${index + 1}`}
                className={css.thumbnailImage}
                width={136}
                height={144}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
