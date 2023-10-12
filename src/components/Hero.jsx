import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
import images from '../images/hero.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; 
import { Typography } from "@material-tailwind/react";

const DUMMY_IMAGE_URL = images

export default function Hero() {
  const [stopAnimation, setStopAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
        className="object-cover overflow-hidden object-center w-full h-full brightness-50"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
      />

      <div>
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="space-y-20 sm:space-y-0 md:space-y-0 lg:space-y-0">

          <div className="absolute -top-10 left-0 w-full h-full flex items-center justify-center">
            <Typography variant='h1' color="white" className=" font-bold text-center max-w-md mx-auto animated-text animate-slide-in-left">
              Sağlıklı Yaşam İçin
            </Typography>
          </div>
          <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center">
            <Typography variant='h2' color="white" className="font-bold text-center max-w-md mx-auto animated-text animate-slide-in-right">
              Doğru Yolu Keşfedin
            </Typography>
          </div>
          </div>
          <div className="absolute top-80 left-0 w-full h-full flex items-center justify-center">
            <div className={`!text-3xl font-bold text-center !text-gray-100 !animated-text ${stopAnimation ? "" : "animate-slide-in-down"}`}>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
