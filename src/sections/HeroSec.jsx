import { Typography } from "@material-tailwind/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const DUMMY_IMAGE_URL = 'https://images.pexels.com/photos/8845106/pexels-photo-8845106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

export default function Hero() {
  return (
    <div className="relative w-full h-[80vh] pointer-events-none">
      <div>
        <LazyLoadImage
          src={DUMMY_IMAGE_URL}
          alt="hero–image"
          decoding="async"
          fetchpriority="high"
          useIntersectionObserver={true}
          effect="blur"
          className="h-[700px] relative z-0 w-full object-cover pointer-events-none brightness-75 "
        />
        <div className="absolute -top-10 left-0 w-full h-full flex items-center justify-center">
          <div className="text-6xl font-bold text-center text-gray-100 animated-text animate-slide-in-left">
            Placeholder
          </div>
        </div>
        <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
          <div className="text-6xl font-bold text-center text-gray-100 animated-text animate-slide-in-right">
            For Hero
          </div>
        </div>
      </div>
    </div>
  );
}
