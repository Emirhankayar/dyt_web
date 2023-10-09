import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function useFetchAppointments(
    setAppointmentsLoaded,
    setExcludedTimes,
    setFullyBookedDates,
    setAllAppointments,
    setSelectedDate,
    setFinalDate // Add setFinalDate as a parameter
  ) {
    useEffect(() => {
      const fetchAllAppointments = async () => {
        try {
          const { data, error } = await supabaseClient.from('appointment').select('created_at');
  
          if (error) {
            console.error('Error fetching appointments:', error);
            return;
          }
  
          // Store all appointments in an array
          const allAppointments = data.map((appointment) => ({
            date: new Date(appointment.created_at),
            hours: new Date(appointment.created_at).getHours(),
          }));
  
          // Set fully booked dates
          const fullyBookedDates = {};
          allAppointments.forEach((appointment) => {
            const date = appointment.date.toDateString();
            if (!fullyBookedDates[date]) {
              fullyBookedDates[date] = 0;
            }
            fullyBookedDates[date]++;
          });
  
          const fullyBookedDatesArray = Object.keys(fullyBookedDates).filter(
            (date) => fullyBookedDates[date] >= 10
          );
  
          setFullyBookedDates(fullyBookedDatesArray);
  
          // Now, call calculateStartDate with the populated fullyBookedDatesArray
          const calculatedFinalDate = calculateStartDate(fullyBookedDatesArray);
          
          // Set the final date using the setFinalDate function
          setFinalDate(calculatedFinalDate);
  
          // Set the selected date to the calculated final date
          setSelectedDate(calculatedFinalDate);
  
          // Set all appointments
          setAllAppointments(allAppointments);
  
          // Indicate that appointments have been loaded
          setAppointmentsLoaded(true);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
      fetchAllAppointments();
    }, []);
  }
  

export function calculateStartDate(fullyBookedDatesArray) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    let startDate = new Date(tomorrow);
  
    // Create a copy of the fullyBookedDatesArray to avoid overwriting
    const sortedBookedDates = [...fullyBookedDatesArray]
      .map((date) => new Date(date))
      .sort((a, b) => a - b);
  
    for (let i = 0; i < sortedBookedDates.length; i++) {
      const fullyBookedDate = sortedBookedDates[i];
      // Check if fully booked date is the same as the current startDate
      if (fullyBookedDate.getTime() === startDate.getTime()) {
        // Date is fully booked, check the next day
        startDate.setDate(startDate.getDate() + 1);
      } else if (fullyBookedDate > startDate) {
        // Found a fully booked day after tomorrow, setting startDate to that day
        startDate = fullyBookedDate;
        break; 
      }
    }
  
    return startDate;
  }

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


  export { supabaseClient, useFetchAppointments }