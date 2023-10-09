// Book.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-number-input';
import tr from 'date-fns/locale/tr';
import emailjs from 'emailjs-com';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { Button, Typography } from "@material-tailwind/react";
import ReCAPTCHA from 'react-google-recaptcha';
import { SkeletonBook } from './Skeleton';
import { format, addDays } from 'date-fns';
import { supabaseClient as supabase, useFetchAppointments } from '../utils/bookUtils';

// TODO IMPLEMENT PDF SENDING LOGIC TO EMAIL

export default function Booking() {
  const serviceID = import.meta.env.VITE_SERVICE;
  const templateID = import.meta.env.VITE_TEMPLATE;
  const userID = import.meta.env.VITE_USER;

  const siteKey = import.meta.env.VITE_APP_SITE;

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
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
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
  
    try {
      // Execute the reCAPTCHA challenge and get the response value
      const recaptchaValue = await recaptchaRef.current.executeAsync();
  
      // Check if recaptchaValue is truthy to ensure the challenge was completed
      if (!recaptchaValue) {
        console.log('reCAPTCHA challenge not completed');
        return;
      }
  
      // Continue with the form submission logic
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
    setLoading
    if (appointmentsLoaded) {
      setExcludedTimes(generateExcludedTimes(selectedDate, allAppointments));
    }
  }, [selectedDate, allAppointments, appointmentsLoaded]);

  const fullyBookedDatesArray = useMemo(() => {
    const bookedDates = fullyBookedDates.map((dateString) => new Date(dateString));

    // Add weekends (Saturdays and Sundays) to the array
    const startDate = new Date(); 
    const endDate = new Date(new Date().getFullYear() + 1, 11, 31); // You can adjust the end date as needed.

    while (startDate <= endDate) {
        const dayOfWeek = startDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            bookedDates.push(new Date(startDate)); // Sunday (0) or Saturday (6)
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    return bookedDates;
}, [fullyBookedDates]);


  const generateExcludedTimes = (date, allAppointments) => {
    const selectedDateDateString = date.toDateString();

    const appointmentsForSelectedDate = allAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === selectedDateDateString;
    });

    const excludedTimes = appointmentsForSelectedDate.map((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate(), appointment.hours, 0, 0, 0);
    });
    return excludedTimes;
  };

  return (
    <>
      <div className="container mx-auto">


      <div className="w-full text-black ">
                <div className="text-left flex flex-col-auto px-6">
                    <div className="bg-gray-100 px-6 py-8 w-full max-w-sm rounded-lg shadow-xl mx-auto">

          {loading ? (
            <SkeletonBook />
          ) : (

            <form id='booking' onSubmit={(e) => handleBooking(e)}>
                                          <div className="mb-6 text-left">
                                <Typography htmlFor="name" className="block text-lg font-bold ">
                                    Randevu Oluştur
                                </Typography>
                            </div>
              <div className="mb-4 ">
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
                  autoComplete='on'
                  aria-label='isim soyisim'

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
                  autoComplete='on'
                  aria-label='eposta'

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
                  autoComplete='on'
                  aria-label='telefon'
                />
              </div>
              <div className="my-4">
                <label htmlFor="date" className="block text-sm font-medium ">
                  Tarih:
                </label>
                <DatePicker
                  className="w-full px-3 py-2 mt-2 mb-12 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
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
                  disabledKeyboardNavigation
                  onFocus={e => e.target.blur()} 

                />

              </div>

              <div className='mt-6'>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    size="invisible"
                  />
                <Button
                  type="submit"
                  className="px-4 py-2 h-12 w-full rounded-lg focus:outline-1 shadow-md capitalize"
                  aria-label="Randevu Oluştur"
                >
                  Randevu Oluştur
                </Button>
              </div>
            </form>
          )}

        </div>
        
      </div>
      </div>
      </div>
      
    </>
  );
}