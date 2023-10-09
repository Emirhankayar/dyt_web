import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Typography, Button } from '@material-tailwind/react';
import { SkeletonSocial } from './Skeleton';
import { setupIntersectionObserver, setupIntersectionObserverUP } from '../utils/utils'; 
import images from '../images/banner.jpeg'

const DUMMY_IMAGE_URL = images

const Banner = () => {
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
    setupIntersectionObserver('.hidden-class');
    setupIntersectionObserverUP('.hidden-class-up');

  return (
    <>
        <div className="hidden-class">

            <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mx-auto">
            <Typography className="text-2xl font-bold">İletişim</Typography>

            </div>
            </div>

        <div className='hidden-class-up'>

      <div className="container mx-auto">
        <div className="w-full text-black">
          <div className="text-left px-6">
            <div className="bg-gray-100 px-8 py-8 w-full max-w-4xl rounded-lg shadow-xl mx-auto">
            {Loading ? (
                        <SkeletonSocial />
                    ) : (
              <div>
                <div className="text-left mb-2 lg:-mb-8">
                  <Typography className="block text-lg font-bold">
                    Bize Ulaşın
                  </Typography>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-6 ">
                  <label className="block text-sm font-medium text-justify leading-8 lg:w-1/2">
                     Bu platform üzerinden, kurumsal sosyal medya hesaplarımıza kolayca ulaşabilirsiniz. Ayrıca, bizimle e-posta yoluyla iletişime geçme imkanına sahipsiniz. İhtiyaçlarınıza uygun randevular oluşturabilir ve en güncel bilgileri ve özel kampanyaları takip edebilmeniz için e-posta bültenimize abone olabilirsiniz. Müşteri deneyiminizi en üst düzeye çıkarmak ve size en iyi hizmeti sunmak için buradayız.
                  </label>
                  <img src={DUMMY_IMAGE_URL} alt="card-image"  className='rounded-lg w-full lg:w-1/2'/>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-6 lg:gap-0 items-center lg:items-end mt-4 justify-between lg:pl-6">
                    <div>

                {Object.keys(socialMediaIcons).map((socialMedia) => (
                    <a
                    key={socialMedia}
                    href={socialMediaIcons[socialMedia].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='py-2 px-2'
                    >
                        <FontAwesomeIcon
                          icon={socialMediaIcons[socialMedia].icon}
                          className="text-black text-2xl mx-8"
                          />
                      </a>
                    ))}
                    </div>

                    <a href="/iletisim" className='w-full lg:w-1/2'>
                  <Button size='small' className="w-full lg:w-full"
                    aria-label='Bize Ulaşın'>
                    Bize Ulaşın
                  </Button>
                    </a>
                </div>


              </div>
)}
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
};

export default Banner;
