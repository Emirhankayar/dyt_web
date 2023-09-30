// utils.js
import { createClient } from '@supabase/supabase-js';
import he from "he";
import { useState, useCallback } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Function to get the PDF URL from Supabase
const getPdfUrlFromSupabase = async (fileName) => {
  const pdfUrl = `${supabaseUrl}/storage/v1/object/public/pdf/${fileName}`;

  // Check if the PDF file exists in the Supabase bucket
  const response = await fetch(pdfUrl);

  if (response.ok) {
    return pdfUrl;
  } else {
    console.error('PDF not found in database.');
    return null;
  }
};

// Function to download PDF
const downloadPDF = async (pdfFileName) => {
  const pdfUrl = await getPdfUrlFromSupabase(pdfFileName);
  if (pdfUrl) {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a temporary link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfFileName);

      // Trigger a click event to initiate the download
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      link.dispatchEvent(clickEvent);

      // Clean up the temporary URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  } else {
    console.error('PDF not found in database.');
  }
};

// Function to view PDF
const viewPDF = async (pdfFileName) => {
  const pdfUrl = await getPdfUrlFromSupabase(pdfFileName);
  if (pdfUrl) {
    // Create an anchor element with the target="_blank" attribute
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';

    // Trigger a click event to open the PDF in a new tab
    link.click();
  } else {
    console.error('PDF not found in database.');
  }
};

const extractImageAndDate = (html) => {
  const text = he.decode(html);
  const imgRegex = /<img.*?src=["'](.*?)["'].*?>/; // Regular expression to match image source
  const dateRegex = /<span[^>]*class=["']published["'][^>]*>(.*?)<\/span>/; // Regular expression to match date
  const imageMatch = imgRegex.exec(html);
  const dateMatch = dateRegex.exec(html);

  return {
    image: imageMatch ? imageMatch[1] : null,
    date: dateMatch ? dateMatch[1] : null,
    text: text.replace(/(<([^>]+)>)/gi, ""), // Remove HTML tags
  };
};

// Function to calculate the number of columns based on screen width
function getNumCols() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    return 3; // On large screens, show 3 columns
  } else if (screenWidth >= 768) {
    return 2; // On medium screens, show 2 columns
  } else {
    return 1; // On small screens, show 1 column
  }
}

// Function to handle window resize and update numCols
function handleResize(setNumCols) {
  function resizeHandler() {
    const numCols = getNumCols();
    setNumCols(numCols);
  }

  window.addEventListener("resize", resizeHandler);

  return () => {
    window.removeEventListener("resize", resizeHandler);
  };
}

function useToggleShowAll(initialValue = false) {
  const [showAll, setShowAll] = useState(initialValue);
  const [expanded, setExpanded] = useState(initialValue);

  const toggleShowAll = useCallback(() => {
    setShowAll((prevShowAll) => !prevShowAll);
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  console.log("showAll:", showAll, "expanded:", expanded); // Add this line

  return { showAll, expanded, toggleShowAll };
}

export { supabaseClient, downloadPDF, viewPDF, extractImageAndDate, getNumCols, handleResize, useToggleShowAll };