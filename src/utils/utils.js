// utils.js
import { createClient } from '@supabase/supabase-js';

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

export { supabaseClient, downloadPDF, viewPDF };
