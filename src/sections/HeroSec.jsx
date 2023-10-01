import React from "react";
import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    <div className="carousel-container mb-32 relative w-full h-[80vh] pointer-events-none">

        {images.map((image, index) => (
          <LazyLoadImage
            key={index}
            src={image.src}
            alt={image.alt}
            decoding="async"
            fetchpriority="high"
            useIntersectionObserver={true}
            effect="blur"
            className="h-[700px] w-full object-cover pointer-events-none"
          />
        ))}
    </div>
  );
}
