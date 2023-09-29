import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-tailwind/react";

export default function ExpandingButton({ expanded, onClick }) {
  return (
    <div className="mt-4 flex justify-center">
       <Button onClick={onClick} className="bg-transparent text-black shadow-none hover:shadow-none capitalize text-sm">
        {expanded ? (
          <>
            Daha az Gör <FontAwesomeIcon icon={faChevronUp} />
          </>
        ) : (
          <>
            Daha Fazla Gör <FontAwesomeIcon icon={faChevronDown} />
          </>
        )}
      </Button>
    </div>
  );
}