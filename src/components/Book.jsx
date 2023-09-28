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
import emailjs from 'emailjs-com';
import { createClient } from '@supabase/supabase-js';
import { format,addDays } from 'date-fns';

// TODO CHANGE DEFAULT DATE TO FIRST AVAILABLE DATE PROBABLY WITH MIN DATE??
// TODO FIX ERROR MESSAGE LANGUAGES 
// TODO FIX NAMING 
// TODO DISABLE HOURS BEFORE TODAY TO PREVENT BUGS
// TODO DEBUG PORTAL SIZE

export default function Booking() {
  const serviceID = import.meta.env.VITE_SERVICE;
  const templateID = import.meta.env.VITE_TEMPLATE;
  const userID = import.meta.env.VITE_USER;
  
  registerLocale('tr', tr);
  setDefaultLocale('tr', tr);
  
  const [fullyBookedDates, setFullyBookedDates] = useState([]); 
  const [selectedDateHours, setSelectedDateHours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1)); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const pdfFileName = 'Danisan_Bilgi_Formu.pdf';
  const pdfFilePath = '/src/assets/';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    recaptchaValue: null,
  });
  

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
      alert('Lütfen reCAPTCHA doğrulamasını tamamlayın.');
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
        alert('Rezervasyonunuz oluşturulamadı.');
        return; 
      } else {
        console.log('Booking inserted successfully:', data);
        alert('Rezervasyonunuz başarıyla oluşturuldu!');
      }

      const formattedDate = format(selectedDate, 'dd/MM/yyyy HH:mm');

      const emailParamsOwner = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: phoneNumber,
        appointment_date: selectedDate,
        message: `Bir yeni rezervasyonunuz var.\n\nDetaylar:\n\nİsim: ${formData.name}\n\nEmail: ${formData.email}\n\nTel No:${phoneNumber}\n\nRandevu Tarihi: ${formattedDate}\n\n`,
        message_user: `Saygıdeğer Danışanımız ${formData.name},\n\nRandevunuz, "${formattedDate}" tarihi için başarıyla oluşturuldu!\n\n\nUYARI: FORMU ÖNCEDEN DOLDURMANIZI TAVSİYE EDERİZ...`,

      };

      await emailjs.send(serviceID, templateID, emailParamsOwner, userID);

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        recaptchaValue: null,
      });

      setPhoneNumber(''); // Reset phoneNumber to an empty string

      // Reset the selectedDate or other related state variables if needed
      setSelectedDate(new Date()); // Reset selectedDate to the initial value or another appropriate value
  

    } catch (error) {
      console.error('Error inserting booking or sending emails:', error);
      alert('Rezervasyonunuz oluşturulamadı.');
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
  
        console.log('Selected Date Hours:', selectedDateHours);
  
        const fullyBookedDates = {};
  
        data.forEach((appointment) => {
          const date = new Date(appointment.created_at).toDateString();
          if (!fullyBookedDates[date]) {
            fullyBookedDates[date] = 0;
          }
          fullyBookedDates[date]++;
        });
  
        const fullyBookedDatesArray = Object.keys(fullyBookedDates).filter(
          (date) => fullyBookedDates[date] >= 10
        );
  
        // Set the fullyBookedDates and selectedDateHours
        setFullyBookedDates(fullyBookedDatesArray);
        setSelectedDateHours(selectedDateHours);
  
        // Now, call calculateStartDate with the populated fullyBookedDatesArray
        const calculatedFinalDate = calculateStartDate(fullyBookedDatesArray);
        setFinalDate(calculatedFinalDate);
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
      }
    };
  
    fetchBookedAppointments();
  }, [selectedDate]);
  
  // Use useMemo to memoize the values
  //const memoizedBookedHours = useMemo(() => bookedHours, []);
  //const memoizedFullyBookedDates = useMemo(() => fullyBookedDates, []);

  const fullyBookedDatesArray = fullyBookedDates.map((dateString) => new Date(dateString));

  const calculateStartDate = (fullyBookedDatesArray) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    let startDate = new Date(tomorrow);
  
    // Create a copy of the fullyBookedDatesArray to avoid overwriting
    const sortedBookedDates = [...fullyBookedDatesArray]
      .map((date) => new Date(date))
      .sort((a, b) => a - b);
  
    console.log('Fully Booked Dates Array:', sortedBookedDates);
  
    for (let i = 0; i < sortedBookedDates.length; i++) {
      const fullyBookedDate = sortedBookedDates[i];
  
      console.log('Starting from:', startDate);
      console.log('Checking date:', fullyBookedDate);
  
      // Check if fully booked date is the same as the current startDate
      if (fullyBookedDate.getTime() === startDate.getTime()) {
        // Date is fully booked, check the next day
        startDate.setDate(startDate.getDate() + 1);
        console.log('Date is fully booked, checking the next day:', startDate);
      } else if (fullyBookedDate > startDate) {
        // Found a fully booked day after tomorrow, setting startDate to that day
        startDate = fullyBookedDate;
        console.log('Found a fully booked day after tomorrow, setting startDate to that day:', startDate);
        break; // Exit the loop once the first available day is found
      }
    }
  
    console.log('Final startDate:', startDate);
  
    return startDate;
  };
  
  
  const [finalDate, setFinalDate] = useState(null);
  
  // Use the useEffect hook to call the calculation function once when the component mounts
  useEffect(() => {
    const calculatedFinalDate = calculateStartDate(fullyBookedDatesArray);
    setFinalDate(calculatedFinalDate);
  }, []);

  const getHoursInRange = () => {
    const hours = [];
    
    for (let i = 8; i <= 17; i++) {
        // Convert single-digit hours to a string with leading zero (e.g., "08", "09")
        const hourString = i < 10 ? `0${i}` : `${i}`;
        
        // Push the formatted hour to the array
        hours.push(`${hourString}:00`);
    }
    
    return hours;
};

  
  return (
    <div className="container max-w-lg mx-auto p-1 bg-transparent rounded font-jet h-screen flex-col flex justify-center mt-12">
      <div className='container rounded-lg p-6 bg-gray-100 shadow-xl'>
        <form id='booking' onSubmit={handleBooking}>

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
              placeholder="email@ornek.com"
              value={formData.email}
              onChange={handleChange}
              required
              filterTimes={getHoursInRange}
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
              placeholder="000-000-00-00"
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
              placeholderText='Bir tarih seciniz'
              onChange={(date) => {
                setSelectedDate(date); // Update the selectedDate state
              }}
              locale="tr"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="Saat"
              dateFormat="dd/MM/yyyy HH:mm"
              prevMonthButtonDisabled
              selected={false}
              openToDate={finalDate}
              startDate={finalDate}
              minDate={finalDate}
              minTime={new Date(selectedDate).setHours(8, 0, 0)} 
              maxTime={new Date(selectedDate).setHours(17, 0, 0)}
              excludeTimes={selectedDateHours.map((hour) => new Date(selectedDate).setHours(hour, 0, 0, 0))}
              excludeDates={fullyBookedDatesArray}
              withPortal
            />

          </div>

          <div className="mb-4 flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between items-center">
            {pdfFileName}
            <div className='flex flex-row p-2 justify-center items-center'>
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

          <div className='block mb-20 sm:mb-10 md:mb-12 lg:mb-8 mt-4 w-full h-16 px-4 pb-12'>
            <Typography className='text-sm italic text-red-300 text-justify'>
              <FontAwesomeIcon icon={faCircleInfo} className='mr-1' />
              Bu form, danışanların danışmanlık hizmeti öncesinde veya
              sırasında doldurmaları gereken bir belgedir.
              Sorununuzu daha iyi anlamamıza yardımcı olur ve size daha ileri
              düzeyde hizmet sunmamıza imkan tanır.
            </Typography>
          </div>

          <div className="my-4">
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