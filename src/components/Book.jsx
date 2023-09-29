// Book.jsx
import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-number-input';
import tr from 'date-fns/locale/tr';
import emailjs from 'emailjs-com';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Button, Typography } from "@material-tailwind/react";
import Recaptcha from './Recaptcha';
import { supabaseClient as supabase, downloadPDF, viewPDF } from '../utils/utils';
import { useFetchAppointments } from '../services/services';
import { SkeletonBook } from './Skeleton';
import { format, addDays } from 'date-fns';

export default function Booking() {
  const serviceID = import.meta.env.VITE_SERVICE;
  const templateID = import.meta.env.VITE_TEMPLATE;
  const userID = import.meta.env.VITE_USER;
  
  
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when content is loaded
    }, 1500); // Adjust the delay time as needed
  }, []);

  registerLocale('tr', tr);
  setDefaultLocale('tr', tr);

  const pdfFileName = 'Danisan_Bilgi_Formu.pdf';
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [phoneNumber, setPhoneNumber] = useState('');
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


  async function handleDownloadPdf() {
    const pdfFileName = 'example.pdf';
    await downloadPDF(pdfFileName);
  }

  async function handleOpenPdf() {
    const pdfFileName = 'example.pdf';
    await viewPDF(pdfFileName);
  }

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

      setPhoneNumber(''); 

    } catch (error) {
      console.error('Error inserting booking or sending emails:', error);
      alert('Rezervasyonunuz oluşturulamadı.');
    }
  };
  
  const [finalDate, setFinalDate] = useState(null);
  useFetchAppointments(
    setAppointmentsLoaded,
    setExcludedTimes,
    setFullyBookedDates,
    setAllAppointments,
    setSelectedDate,
    setFinalDate 
  );

  useEffect(() => {
    if (appointmentsLoaded) {
      // Generate and set the excluded times based on the selected date and allAppointments
      setExcludedTimes(generateExcludedTimes(selectedDate, allAppointments));
    }
  }, [selectedDate, allAppointments, appointmentsLoaded]);

  const fullyBookedDatesArray = useMemo(() => fullyBookedDates.map((dateString) => new Date(dateString)), [fullyBookedDates]);
  


  const generateExcludedTimes = (date, allAppointments) => {
    const selectedDateDateString = date.toDateString();

    // Find appointments for the selected date
    const appointmentsForSelectedDate = allAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === selectedDateDateString;
    });

    // Generate an array of hours to be excluded based on existing appointments
    const excludedTimes = appointmentsForSelectedDate.map((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate(), appointment.hours, 0, 0, 0);
    });
    return excludedTimes;
  };

  return (   
    <>

    <div className="container max-w-lg mx-auto p-1 bg-transparent rounded font-jet h-screen flex-col justify-center mt-12">

      <div className='container h-4/5 sm:h-3/4 md:h-3/4 lg:h-3/4 rounded-lg p-4 md:p-6 sm:p-6 lg:p-6 bg-gray-100 shadow-xl'>
    {isLoading ? ( 
    <SkeletonBook/>
    ) : (

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

              locale="tr"
              onChange={(date) => {
                setSelectedDate(date);

                setExcludedTimes(generateExcludedTimes(date, allAppointments));
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="Saat"
              dateFormat="dd/MM/yyyy HH:mm"
              prevMonthButtonDisabled
              selected={selectedDate}
              openToDate={finalDate}
              startDate={finalDate}
              minDate={finalDate}
              minTime={new Date(selectedDate).setHours(8, 0, 0)}
              maxTime={new Date(selectedDate).setHours(17, 0, 0)}
              excludeTimes={excludedTimes}
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
            <div className="mt-12 mb-4 sm:mt-0 md:mt-0 lg:mt-0">
              <Recaptcha onRecaptchaChange={handleRecaptchaChange} />
            </div>
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
      )}
      </div>
    </div>

  </>   
);
}