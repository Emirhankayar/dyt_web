
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
import images from '../images/hero.jpeg'

const DUMMY_IMAGE_URL = images

export default function Hero() {
  return (
    <div className="relative w-full h-[90vh] pointer-events-none border-b border-gray-50 shadow-xl">
            <Helmet>
        <link rel="preload" as="image" href={DUMMY_IMAGE_URL} />
      </Helmet>
        <LazyLoadImage
            src={DUMMY_IMAGE_URL}
            alt="title image"
            className="object-cover overflow-hidden w-full h-full brightness-75"
            />
      <div>
        <div className="flex flex-col items-center justify-center">

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
    </div>
  );
}
