import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { SkeletonBanner } from './Skeleton';
import { setupIntersectionObserver, fetchIntersectionObserver } from '../utils/utils'; 
const SocLinks = React.lazy(() => import('./SocLinks'));
import images from '../images/banner.webp'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const DUMMY_IMAGE_URL = images

const Banner = () => {
    const [Loading, setLoading] = useState(true);
  
    setupIntersectionObserver('.hidden-class', 'show');
    setupIntersectionObserver('.hidden-class-up', 'show-up');

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
  
    const { inViewport, cardRef } = fetchIntersectionObserver(options);
  
    useEffect(() => {
      if (inViewport) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    }, [inViewport]);
  return (
    <>
        <div className="hidden-class">

            <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mx-auto">
            <Typography variant='h4'>İletişim</Typography>

            </div>
            </div>


      <div className="container mx-auto">
        <div className='hidden-class-up' ref={cardRef}>
        <div className="w-full">
          <div className="text-left px-6">
            <div className="bg-gray-100 px-8 py-8 w-full max-w-4xl rounded-lg shadow-xl mx-auto">
            {Loading ? (
                        <SkeletonBanner />
                    ) : (
              <div>
                <div className="mb-2">
                  <Typography variant='h5'>
                    Bize Ulaşın
                  </Typography>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-6 ">
                  <Typography variant='paragraph' className="block text-justify mt-4 lg:w-1/2">
                     Bu platform üzerinden, kurumsal sosyal medya hesaplarımıza kolayca ulaşabilirsiniz. Ayrıca, bizimle e-posta yoluyla iletişime geçme imkanına sahipsiniz. İhtiyaçlarınıza uygun randevular oluşturabilir ve en güncel bilgileri ve özel kampanyaları takip edebilmeniz için e-posta bültenimize abone olabilirsiniz. Müşteri deneyiminizi en üst düzeye çıkarmak ve size en iyi hizmeti sunmak için buradayız.
                  </Typography>
                  <LazyLoadImage src={DUMMY_IMAGE_URL} alt="card-image"  className='rounded-lg w-full lg:w-1/2'/>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-6 lg:gap-0 items-center lg:items-end mt-4 justify-between lg:pl-6">
                    <div className='flex flex-col items-center justify-center lg:w-2/5'>

                      <SocLinks/>

                    </div>

                    <a href="/iletisim" className='w-full lg:w-1/2'>
                  <Button variant="gradient" color="light-blue" className="w-full lg:w-full capitalize font-light transition-all duration-300"
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
