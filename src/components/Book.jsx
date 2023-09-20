import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Button, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Recaptcha from './Recaptcha';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import { createClient } from '@supabase/supabase-js';

export default function Booking() {
  registerLocale('tr', tr);
  setDefaultLocale('tr', tr);
  const [bookedHours, setBookedHours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const pdfFileName = 'Danisan_Bilgi_Formu.pdf';
  const pdfFilePath = '/src/assets/';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    recaptchaValue: null,
  });
  const [excludedTimes, setExcludedTimes] = useState([]); // Add this state variable


  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRecaptchaChange = (value) => {
    setFormData({ ...formData, recaptchaValue: value });
  };

  const getPdfUrl = (fileName) => {
    return `${window.location.origin}${pdfFilePath}${fileName}`;
  };

  const supabase_url = import.meta.env.VITE_SUPABASE_URL
  const supabase_key = import.meta.env.VITE_SUPABASE
  const supabase = createClient(supabase_url, supabase_key);
  const getPdfUrlFromSupabase = async (fileName) => {
    const pdfUrl = `${supabase_url}/storage/v1/object/public/pdf/${fileName}`;

    // Check if the PDF file exists in the Supabase bucket
    const response = await fetch(pdfUrl);

    if (response.ok) {
      return pdfUrl;
    } else {
      console.error('PDF not found in database.');
      return null;
    }
  };

  const handleOpenPdf = async () => {
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


  const handleDownloadPdf = async () => {
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


  const handleBooking = async (e) => {
    e.preventDefault();

    if (!formData.recaptchaValue) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const { data, error } = await supabase.from('appointment').insert([
        {
          created_at: selectedDate.toISOString(),
          name: formData.name,
          email: formData.email,
          phone: phoneNumber,
        },
      ]);

      if (error) {
        console.error('Error inserting booking:', error);
        alert('Booking failed. Please try again.');
      } else {
        console.log('Booking inserted successfully:', data);
        alert('Booking successful!');
      }
    } catch (error) {
      console.error('Error inserting booking:', error);
      alert('Booking failed. Please try again.');
    }
  };


  useEffect(() => {
    const fetchBookedAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('appointment')
          .select('created_at');
  
        if (error) {
          console.error('Error fetching booked appointments:', error);
          return;
        }
  
        // Extract booked hours for the selected date from the data
        const selectedDateHours = data
          .map((appointment) => new Date(appointment.created_at))
          .filter((date) => {
            const dateYear = date.getFullYear();
            const dateMonth = date.getMonth();
            const dateDay = date.getDate();
            return (
              dateYear === selectedDate.getFullYear() &&
              dateMonth === selectedDate.getMonth() &&
              dateDay === selectedDate.getDate()
            );
          })
          .map((date) => date.getHours());
  
        setBookedHours(selectedDateHours);
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
      }
    };
  
    fetchBookedAppointments();
  }, [selectedDate]);
  

  useEffect(() => {
    // Extract the year, month, and day components from the selected date
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    // Create an array to hold the timestamps of excluded times
    const excludeTimes = bookedHours.map((hour) =>
      new Date(selectedYear, selectedMonth, selectedDay, hour)
    );

    // Set the excluded times in the state
    setExcludedTimes(excludeTimes);
  }, [selectedDate, bookedHours]);

  



  return (
    <div className="container max-w-lg mx-auto p-1 bg-transparent rounded font-jet h-screen flex-col flex justify-center">
      <div className='container rounded-lg p-6 bg-gray-100 shadow-xl'>
        <form onSubmit={handleBooking}>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium ">
              İsim Soyisim:
            </label>
            <input
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              type="text"
              id="name"
              name="name"
              placeholder="İsim Soyisim"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium ">
              Telefon Numarası:
            </label>
            <PhoneInput
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Telefon Numarası"
              required
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="TR"
            />
          </div>
          <div className="my-4">
            <label htmlFor="date" className="block text-sm font-medium ">
              Tarih:
            </label>
            <DatePicker
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              id='date'
              name='date'
              required
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                handleChange({ target: { name: 'date', value: date } });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="dd/MM/yyyy HH:mm"
              locale="tr"
              minDate={new Date()} // Disable dates before today
              minTime={new Date(selectedDate).setHours(8, 0, 0)} // Set the minimum time to 8:00 AM
              maxTime={new Date(selectedDate).setHours(18, 0, 0)} // Set the maximum time to 6:00 PM
              excludeTimes={excludedTimes}
              filterDate={(date) => {
                // Get all working hours for the selected day (8 am to 6 pm)
                const workingHours = Array.from({ length: 10 }, (_, index) => index + 8);

                // Check if all working hours are booked
                const allWorkingHoursBooked = workingHours.every((hour) =>
                  bookedHours.includes(hour)
                );

                // If all working hours are booked, disable the day; otherwise, enable it
                return !allWorkingHoursBooked;
              }}
            />

          </div>

          <div className="mb-4 flex flex-row justify-between items-center">
            {pdfFileName}
            <div className='flex flex-row justify-center items-center'>
              <Button
                onClick={handleDownloadPdf}
                className=" rounded-full p-4 shadow-md flex flex-col justify-center items-center"
              >
                <FontAwesomeIcon icon={faDownload} />
              </Button>

              <Button
                className=" rounded-full p-4 shadow-md flex ml-4 flex-col items-center justify-center"
                onClick={handleOpenPdf}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </div>
          </div>

          <div className='mb-16 sm:mb-10 md:mb-12 lg:mb-8 mt-4 w-full h-16 px-4'>
            <Typography className='text-sm italic text-red-300 text-justify'>
              <FontAwesomeIcon icon={faCircleInfo} className='mr-1' />
              Bu form, danışanların danışmanlık hizmeti öncesinde veya
              danışmanlık süreci sırasında doldurmaları gereken bir belgedir.
              Sorununuzu daha iyi anlamamıza yardımcı olur ve size daha ileri
              düzeyde hizmet sunmamıza imkan tanır.
            </Typography>
          </div>

          <div className="mb-4">
            <Recaptcha onRecaptchaChange={handleRecaptchaChange} />
          </div>

          <div className="mb-4">
            <Button
              type="submit"
              className="px-4 py-2 h-12 w-full rounded-xl focus:outline-1 shadow-md capitalize"
            >
              Randevu Oluştur
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
