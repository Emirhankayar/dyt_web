import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { SkeletonEmail } from './Skeleton';
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const serviceID = import.meta.env.VITE_SERVICE;
const templateID = import.meta.env.VITE_TEMPLATEE;
const userID = import.meta.env.VITE_USER;

const emailNewsForm = () => {
    const [Loading, setLoading] = useState(true); // State to track loading status
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submit button disabled state


    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setLoading(false); // Set Loading to false when content is loaded
        }, 1000); // Adjust the delay time as needed
    }, []);

    const [formData, setFormData] = useState({
        emailNews: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true)

            const emailParams = {
                email: formData.emailNews,
                message: `Bir yeni email bülteni abonesi : ${formData.emailNews}`,
                message_user: 'Email Bültenimize Kayıt Olduğunuz için Teşekkür Ederiz. İptal etmek için bize ulaşabilirsiniz.',
            };

            emailParams.emailNews = formData.emailNews;

            await emailjs.send(serviceID, templateID, emailParams, userID);

            setFormData({
                email: '',
            });
            
            setIsSubmitting(false)
            
            alert('emailNews başarıyla gönderildi!');
        } catch (error) {
            console.error('Error sending emailNews:', error);
            alert('emailNews gönderilemedi, lütfen daha sonra tekrar deneyiniz.');
        }
    };

    return (

        <>
            <div className="container mx-auto">


            <div className="w-full text-black ">
                <div className="text-left flex flex-col-auto px-6">
                    <div className="bg-gray-100 px-6 py-8 w-full max-w-sm rounded-lg shadow-xl mx-auto">
                    
                    {Loading ? (
                        <SkeletonEmail />
                    ) : (

                        <form onSubmit={handleSubmit}>


                            <div className="mb-2 text-left">
                                <Typography variant='h5'>
                                    Email Bülteni
                                </Typography>
                            </div>
                            <div className="mb-4">
                                <Typography variant='paragraph' htmlFor="emailNews" className="text-justify">
                                En yeni bilgilere ulaşmak için bültenimize kaydolarak, güncellemelerden haberdar olabilirsiniz.
                                </Typography>
                                <div className='flex flex-row items-center justify-center mt-4'>
                                <input
                                    type="emailNews"
                                    id="emailNews"
                                    name="emailNews"
                                    placeholder='email@ornek.com'
                                    value={formData.emailNews}
                                    onChange={handleChange}
                                    required
                                    aria-label='eposta'
                                    autoComplete='on'
                                    className="w-full px-3 py-2  border-gray-600 bg-white rounded-lg focus:outline-1 focus:border-gray-700"
                                />

                                <Button
                                    type="submit"
                                    variant="gradient"
                                    color="light-blue"
                                    aria-label="email bültenine üye ol"
                                    required
                                    className="w-1/4 ml-2 rounded-md focus:outline-1 shadow-md transition-all duration-300 flex items-center justify-center"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    >
                                    {isSubmitting ? (
                                        <Spinner color='white' className='h-4 w-full m-0 p-0'></Spinner>
                                    ) : (
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    )}
                                    </Button>
                            </div>
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

export default emailNewsForm;