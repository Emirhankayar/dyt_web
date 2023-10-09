import { Alert, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function AlertComp() {
  const [isAlertOpen, setIsAlertOpen] = useState(true);

  useEffect(() => {
    // Check if the user has given consent (e.g., by looking at a cookie or local storage flag)
    const hasConsent = localStorage.getItem("consentGiven"); // You can use cookies too

    // If the user has given consent, close the alert
    if (hasConsent) {
      setIsAlertOpen(false);
    }
  }, []);

  const closeAlert = () => {
    // Set the consent flag in local storage when the user clicks on the consent button
    localStorage.setItem("consentGiven", "true");

    setIsAlertOpen(false);
  };

  const denyConsent = () => {
    // Optionally, handle the case when the user denies consent (e.g., log or take appropriate action)
    setIsAlertOpen(false);
  };

  return (
    <>
      {isAlertOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4">
          <Alert variant="outlined" className="bg-gray-100">
            <button
              onClick={closeAlert}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {/* Close icon */}
              </svg>
            </button>
            <Typography className="font-bold text-3xl">
              Bu Sayfayı Ziyaret Etmeden Önce:
            </Typography>
            <ul className="mt-2 ml-2 list-inside list-disc">
              <li>At least 10 characters (and up to 100 characters)</li>
              <li>At least one lowercase character</li>
              <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeAlert}
                className="mr-4 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
              >
                Consent
              </button>
              <button
                onClick={denyConsent}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
              >
                Deny
              </button>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}
