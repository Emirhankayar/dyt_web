import React from "react";
import { Carousel } from "@material-tailwind/react";
const DUMMY_IMAGE_URL = import.meta.env.VITE_DUMMY_IMG;

const images = [
  {
    src:
        `${DUMMY_IMAGE_URL}`,
    alt: "image 1",
  },
  {
    src:
        `${DUMMY_IMAGE_URL}`,
    alt: "image 2",
  },
  {
    src:
        `${DUMMY_IMAGE_URL}`,
    alt: "image 3",
  },
];

export default function CarouselCustomNavigation() {
  return (
    <div className="carousel-container mb-32 relative w-full h-[80vh]">
      <Carousel
        loop={true}
        autoplay={500}
        prevArrow={false}
        nextArrow={false}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-lg transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>
    </div>
  );
}
