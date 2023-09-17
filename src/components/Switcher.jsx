import React, { useState } from "react";
import Contact from "./Contact";
import Book from "./Book";
import { Typography, Button } from "@material-tailwind/react";
import Spinner from './Spinner'
import { Suspense } from "react";

export default function Switcher() {
  const [showContact, setShowContact] = useState(true);

  const toggleComponent = () => {
    setShowContact(!showContact);
  };

  return (
    <>
      <Suspense fallback={<Spinner />}>

        <div className="container flex flex-wrap justify-between w-5/6 items-center mx-auto">
          <Typography className="text-2xl font-bold">
            {showContact ? "İletişime Geçin" : "Randevu Oluştur"}
          </Typography>
          <Button
            className="h-10 shadow-xl capitalize"
            onClick={toggleComponent}
          >
            {showContact ? "Randevu Oluştur" : "  İletişime Geçin  "}
          </Button>
        </div>

        {showContact ? <Contact /> : <Book />}
      </Suspense>
    </>
  );
}
