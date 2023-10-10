import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
import images from '../images/hero.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you need

const DUMMY_IMAGE_URL = images

export default function Hero() {
  const [stopAnimation, setStopAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Define a scroll threshold (e.g., 300 pixels) where you want to stop the animation
      const scrollThreshold = 300;

      if (window.scrollY >= scrollThreshold) {
        setStopAnimation(true);
      } else {
        setStopAnimation(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[90vh] pointer-events-none border-b border-gray-50 shadow-xl">
      <Helmet>
        <link rel="preload" as="image" href={DUMMY_IMAGE_URL} />
      </Helmet>
      <LazyLoadImage
        src={DUMMY_IMAGE_URL}
        alt="title image"
        className="object-cover overflow-hidden w-full h-full brightness-50"
      />
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="absolute -top-10 left-0 w-full h-full flex items-center justify-center">
            <div className="text-5xl font-bold text-center text-gray-100 animated-text animate-slide-in-left">
              Sağlıklı Yaşam İçin
            </div>
          </div>
          <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
            <div className="text-3xl font-bold text-center text-gray-100 animated-text animate-slide-in-right">
              Doğru Yolu Keşfedin
            </div>
          </div>
          <div className="absolute top-80 left-0 w-full h-full flex items-center justify-center">
            <div className={`text-3xl font-bold text-center text-white-100 animated-text ${stopAnimation ? "" : "animate-slide-in-down"}`}>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
