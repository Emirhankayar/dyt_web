import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import supabase from './supabase'; 
import Alert from "./Alert";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleBooking = async () => {
    try {
      // Insert the booking data into your Supabase table
      const { data, error } = await supabase
        .from('appointment')
        .insert([
          {
            created_at: selectedDate.toISOString(), // Store the selected date and time in 'created_at'
            name: name, // Add the user's name
            email: email, // Add the user's email
          },
        ]);
  
      if (error) {
        console.error('Error inserting booking:', error);
        setAlertMessage('Booking failed. Please try again.'); // Set error message
      } else {
        console.log('Booking inserted successfully:', data);
        setBookingSuccess(true); // Set booking success state
        setAlertMessage('Booking successful!'); // Set success message
      }
    } catch (error) {
      console.error('Error inserting booking:', error);
      setAlertMessage('Booking failed. Please try again.'); // Set error message
    }
  };
  
  
  return (
    <div className="Test">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <DatePicker
        className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="dd/MM/yyyy H:mm"
      />
      <button onClick={handleBooking}>Book</button>

      {bookingSuccess && <Alert message={alertMessage} type="success" />}
      {!bookingSuccess && alertMessage && <Alert message={alertMessage} type="error" />}
    </div>
  );
}

