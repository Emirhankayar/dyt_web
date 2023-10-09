// utils.js
import { createClient } from '@supabase/supabase-js';
import he from "he";
import { useState, useCallback, useEffect } from 'react';

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

  return { showAll, expanded, toggleShowAll };

}

function setupIntersectionObserver(className) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll(className);
    hiddenElements.forEach((el) => observer.observe(el));
  }, [className]);
}

function setupIntersectionObserverUP(className) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-up');
        } else {
          entry.target.classList.remove('show-up');
        }
      });
    });

    const hiddenElements = document.querySelectorAll(className);
    hiddenElements.forEach((el) => observer.observe(el));
  }, [className]);
}

function setupIntersectionObserverL(className) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-l');
        } else {
          entry.target.classList.remove('show-l');
        }
      });
    });

    const hiddenElements = document.querySelectorAll(className);
    hiddenElements.forEach((el) => observer.observe(el));
  }, [className]);
}

export { supabaseClient, extractImageAndDate, getNumCols, handleResize, useToggleShowAll, setupIntersectionObserver, setupIntersectionObserverUP, setupIntersectionObserverL };
