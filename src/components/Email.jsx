import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { SkeletonReach } from './Skeleton';
import { Button, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const serviceID = import.meta.env.VITE_SERVICE;
const templateID = import.meta.env.VITE_TEMPLATEE;
const userID = import.meta.env.VITE_USER;

const emailNewsForm = () => {
    const [Loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setLoading(false); // Set Loading to false when content is loaded
        }, 1000); // Adjust the delay time as needed
    }, []);

    const [formData, setFormData] = useState({
        emailNews: '',
    });
    const recaptchaRef = useRef();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const emailParams = {
                emailNews: formData.emailNews,
            };

            emailParams.emailNews = formData.emailNews;

            if (formData.subject) {
                emailParams.subject = formData.subject;
            }

            await emailjs.send(serviceID, templateID, emailParams, userID);

            setFormData({
                emailNews: '',
            });

            alert('emailNews başarıyla gönderildi!');
        } catch (error) {
            console.error('Error sending emailNews:', error);
            alert('emailNews gönderilemedi, lütfen daha sonra tekrar deneyiniz.');
        }
    };

    return (

        <>
            <div className="container mx-auto">


            <div class="w-full text-black ">
                <div class="text-left flex flex-col-auto px-6">
                    <div className="bg-gray-100 px-6 py-8 w-full max-w-sm rounded-lg shadow-xl mx-auto">
                    

                        <form onSubmit={handleSubmit}>


                            <div className="mb-2 text-left">
                                <Typography htmlFor="name" className="block text-lg font-bold ">
                                    Email Bülteni
                                </Typography>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="emailNews" className="block text-sm font-medium text-justify">
                                En yeni bilgilere ulaşmak için bültenimize kaydolarak, güncellemelerden haberdar olabilirsiniz.
                                </label>
                                <div className='flex flex-row items-center justify-center mt-4'>
                                <input
                                    type="emailNews"
                                    id="emailNews"
                                    name="emailNews"
                                    placeholder='emailNews@ornek.com'
                                    value={formData.emailNews}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                                />

                                <Button
                                disabled
                                    type="submit"
                                    className="w-1/4 ml-2 rounded-md focus:outline-1 shadow-md"
                                >
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                    
                                </Button>
                            </div>
                            </div>

                        </form>
                </div>
            </div>
            </div>
            </div>

        </>

    );
};

export default emailNewsForm;