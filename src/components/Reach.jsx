import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { SkeletonReach } from './Skeleton';
import { Button, Typography } from "@material-tailwind/react";
import ReCAPTCHA from 'react-google-recaptcha'
const serviceID = import.meta.env.VITE_SERVICE;
const templateID = import.meta.env.VITE_TEMPLATEE;
const userID = import.meta.env.VITE_USER;

const siteKey = import.meta.env.VITE_APP_SITE;


const ContactForm = () => {
    const [Loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setLoading(false); // Set Loading to false when content is loaded
        }, 1000); // Adjust the delay time as needed
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        description: '',
        recaptchaValue: null,
    });
    const recaptchaRef = useRef();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Execute the reCAPTCHA challenge and get the response value
            const recaptchaValue = await recaptchaRef.current.executeAsync();
            
            // Check if recaptchaValue is truthy to ensure the challenge was completed
            if (!recaptchaValue) {
                console.log('reCAPTCHA challenge not completed');
                return;
            }

            const emailParams = {
                name: formData.name,
                subject: formData.subject,
                email: formData.email,
                message: formData.description,
            };

            emailParams.email = formData.email;

            if (formData.subject) {
                emailParams.subject = formData.subject;
            }

            await emailjs.send(serviceID, templateID, emailParams, userID);

            setFormData({
                name: '',
                subject: '',
                email: '',
                description: '',
                recaptchaValue: null,
            });

            alert('Email başarıyla gönderildi!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Email gönderilemedi, lütfen daha sonra tekrar deneyiniz.');
        }
    };

    return (

        <>
            <div className="container mx-auto">


            <div className="w-full text-black ">
                <div className="text-left flex flex-col-auto px-6">
                    <div className="bg-gray-100 px-6 py-8 w-full max-w-sm rounded-lg shadow-xl mx-auto">
                    
                    {Loading ? (
                        <SkeletonReach />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6 text-left">
                                <Typography htmlFor="name" className="block text-lg font-bold ">
                                    Soru Sor
                                </Typography>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium ">
                                    İsim Soyisim:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="İsim Soyisim"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-2 border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                                    />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium ">
                                    Konu:
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder='Konu'
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 mt-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium ">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='email@ornek.com'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium ">
                                    Açıklama:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder='Açıklama...'
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="8"
                                    required
                                    className="w-full px-3 py-2 mt-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                                ></textarea>
                            </div>

                            <div>
                                            <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={siteKey}
                                    size="invisible"
                                />
                                <Button
                                    type="submit"
                                    className="px-4 py-2 h-12 w-full rounded-md focus:outline-1 shadow-md capitalize"
                                >
                                    Gönder
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
};

export default ContactForm;