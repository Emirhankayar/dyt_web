import React, { useState } from "react";
import Contact from "../components/Reach";
import Book from "../components/Book";
import { Typography, Button } from "@material-tailwind/react";
import { setupIntersectionObserver, setupIntersectionObserverUP } from '../utils/utils'; // Import the utility function
import '../components/Animations.css'

export default function Switcher() {
  const [showContact, setShowContact] = useState(true);

  setupIntersectionObserver('.hidden-class');
  setupIntersectionObserverUP('.hidden-class-up');

  const toggleComponent = () => {
    setShowContact(!showContact);
  };

  return (
    <>
    <div className="hidden-class">

        <div id="contactSection" className="container flex flex-wrap justify-between w-5/6 items-center mx-auto mb-10 mt-40">
          <Typography className="text-2xl font-bold">
            {showContact ? "Bize Ulaşın" : "Randevu Oluştur"}
          </Typography>
          <Button
            className="h-10 px-2 sm:px-4 md:px-4 lg:px-4 shadow-xl capitalize"
            onClick={toggleComponent}
            >
            {showContact ? "Randevu Oluştur" : "Bize Ulaşın"}
          </Button>
        </div>
      </div>

      <div className="hidden-class-up"> 

      <div className="mb-[40vh]">

        {showContact ? <Contact /> : <Book />}
      </div>

      </div>
    </>
  );
}

