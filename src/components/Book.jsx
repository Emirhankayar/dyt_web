import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import supabase from './supabase';
import Alert from './Alert';
import { Button, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Recaptcha from './Recaptcha';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';

// TODO IMPLEMENT ERROR SPANS

export default function Booking() {
  registerLocale('tr', tr);
  setDefaultLocale('tr', tr);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const pdfFileName = 'Danisan_Bilgi_Formu.pdf';
  const pdfFilePath = '/src/assets/';
  const [formData, setFormData] = useState({
    recaptchaValue: null,
  });

  const handleRecaptchaChange = (value) => {
    setFormData({ ...formData, recaptchaValue: value });
  };

  const getPdfUrl = (fileName) => {
    return `${window.location.origin}${pdfFilePath}${fileName}`;
  };

  const handleOpenPdf = () => {
    const pdfUrl = getPdfUrl(pdfFileName);
    window.open(pdfUrl, "_blank");
  };

  const handleDownloadPdf = () => {
    const pdfUrl = getPdfUrl(pdfFileName);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfFileName;
    link.click();
  };


  const handleBooking = async (e) => {
    e.preventDefault();

    if (!formData.recaptchaValue) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('appointment')
        .insert([
          {
            created_at: selectedDate.toISOString(),
            name: name,
            email: email,
            phone_number: phoneNumber,
          },
        ]);

      if (error) {
        console.error('Error inserting booking:', error);
        setAlertMessage('Booking failed. Please try again.');
      } else {
        console.log('Booking inserted successfully:', data);
        setBookingSuccess(true);
        setAlertMessage('Booking successful!');
      }
    } catch (error) {
      console.error('Error inserting booking:', error);
      setAlertMessage('Booking failed. Please try again.');
    }
  };

  return (
    <div id='book' className="container max-w-lg mx-auto p-1 bg-transparent rounded font-jet h-screen flex-col flex justify-center">
      <div className='container rounded-lg p-6 bg-gray-100 shadow-xl'>
        <form onSubmit={handleBooking}>


          <div className="mb-4 mt-4">
            <label htmlFor="namesur" className="block text-sm font-medium ">
              İsim Soyisim:
            </label>
            <input
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              type="text"
              placeholder="İsim Soyisim"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email2" className="block text-sm font-medium ">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium ">
              Telefon Numarası:
            </label>
            <PhoneInput
              className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
              placeholder="Telefon Numarası"
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
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="dd/MM/yyyy H:mm"
              locale="tr"
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
            <Button onClick={handleBooking}
              type="submit"
              className="px-4 py-2 h-12 w-full rounded-xl focus:outline-1 shadow-md capitalize"
            >Randevu Oluştur</Button>
          </div>
          {bookingSuccess && <Alert message={alertMessage} type="success" />}
          {!bookingSuccess && alertMessage && (
            <Alert message={alertMessage} type="error" />
          )}

        </form>
      </div>
    </div>
  );
}
