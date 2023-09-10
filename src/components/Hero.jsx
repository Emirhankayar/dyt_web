import React from "react";
import { Carousel } from "@material-tailwind/react";

const images = [
  {
    src:
         "https://images.pexels.com/photos/2407409/pexels-photo-2407409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "image 1",
  },
  {
    src:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    alt: "image 2",
  },
  {
    src:
      "https://images.pexels.com/photos/2724241/pexels-photo-2724241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "image 3",
  },
];

export default function CarouselCustomNavigation() {
  return (
    <div className="carousel-container mb-32 relative w-full h-[80vh]">
      <Carousel
        loop={true}
        autoplay={500}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
