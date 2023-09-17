import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import { Button, Typography } from "@material-tailwind/react";

const siteKey = import.meta.env.VITE_APP_SITE;
const serviceID = import.meta.env.VITE_SERVICE;
const templateID = import.meta.env.VITE_TEMPLATE;
const userID = import.meta.env.VITE_USER;

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        description: '',
        date: '',
        recaptchaValue: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRecaptchaChange = (value) => {
        setFormData({ ...formData, recaptchaValue: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.recaptchaValue) {
            alert('Please complete the reCAPTCHA verification.');
            return;
        }

        try {
            const emailParams = {
                from_name: formData.name,
                from_subject: formData.subject,
                to_name: 'Emirhan Kayar',
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
                date: '',
                recaptchaValue: null,
            });

            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (

        <>
            <div className="container flex flex-wrap justify-between w-5/6 items-center mx-auto">
                <Typography className="text-2xl font-bold">İletişime Geçin</Typography>
                <a href="https://diyetzamanidostum.blogspot.com/search/label/Advise" target="_blank" rel="noopener noreferrer">
                    <Button className="h-10 shadow-xl capitalize">
                        Randevu Oluştur
                    </Button>
                </a>
            </div>

            <div id='contact' className="container max-w-lg mx-auto p-1 bg-transparent rounded font-jet h-screen flex-col flex justify-center">
                <div className='container rounded-lg p-6 bg-gray-100 shadow-xl'>
                    <div className="w-full flex h-9 text-left items-center">
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium ">
                                İsim Soyisim:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
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
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="w-full px-3 py-2 mt-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <ReCAPTCHA
                                hl='tr'
                                sitekey={siteKey}
                                onChange={handleRecaptchaChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Button
                                type="submit"
                                className="px-4 py-2 h-12 w-full rounded-md focus:outline-1 shadow-md capitalize"
                            >
                                Gönder
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </>

    );
};

export default ContactForm;