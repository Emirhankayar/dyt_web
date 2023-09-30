import React, { useState } from "react";
import Contact from "../components/Reach";
import Book from "../components/Book";
import { Typography, Button } from "@material-tailwind/react";

export default function Switcher() {
  const [showContact, setShowContact] = useState(true);

  const toggleComponent = () => {
    setShowContact(!showContact);
  };

  return (
    <>
        <div className="container flex flex-wrap justify-between w-5/6 items-center mx-auto">
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
      <div className="p-6">

        {showContact ? <Contact /> : <Book />}
      </div>

    </>
  );
}