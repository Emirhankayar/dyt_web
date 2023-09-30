import React from "react";
const DUMMY_IMAGE_URL = 'https://images.pexels.com/photos/8845106/pexels-photo-8845106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

const images = [
  {
    src:
        `${DUMMY_IMAGE_URL}`,
    alt: "image 1",
  },
];

export default function CarouselCustomNavigation() {
  return (
    <div className="carousel-container mb-32 relative w-full h-[80vh]">

        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        ))}
    </div>
  );
}
