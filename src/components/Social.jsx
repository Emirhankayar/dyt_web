import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Typography } from '@material-tailwind/react';
import { SkeletonSocial } from './Skeleton';

const Social = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const socialMediaIcons = {
    facebook: {
      icon: faFacebook,
      url: 'https://www.facebook.com/your-facebook-page',
    },
    twitter: {
      icon: faTwitter,
      url: 'https://twitter.com/your-twitter-account',
    },
    instagram: {
      icon: faInstagram,
      url: 'https://www.instagram.com/your-instagram-account',
    },
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full text-black">
          <div className="text-left flex flex-col-auto px-6">
            <div className="bg-gray-100 px-6 py-8 w-full max-w-sm rounded-lg shadow-xl mx-auto">
            {Loading ? (
                        <SkeletonSocial />
                    ) : (
              <div>
                <div className="mb-2 text-left">
                  <Typography htmlFor="name" className="block text-lg font-bold">
                    Sosyal Medya
                  </Typography>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-justify">
                    Buradan sosyal medya adreslerimize ulaşarak yayınlarımızı takip edebilirsiniz.
                  </label>
                  <div className="flex flex-row items-center justify-center mt-4">
                    {Object.keys(socialMediaIcons).map((socialMedia) => (
                      <a
                        key={socialMedia}
                        href={socialMediaIcons[socialMedia].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='py-2 px-2'
                        aria-label={socialMedia}
                      >
                        <FontAwesomeIcon
                          icon={socialMediaIcons[socialMedia].icon}
                          className="text-black text-2xl mx-4 -mb-2"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
