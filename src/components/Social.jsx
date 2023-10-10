import React, { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';
import { SkeletonSocial } from './Skeleton';
const SocLinks = React.lazy(() => import('./SocLinks'));


const Social = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full">
          <div className="flex flex-col-auto px-6">
            <div className="bg-gray-100 px-6 py-8 w-full max-w-sm rounded-lg shadow-xl mx-auto">
            {Loading ? (
                        <SkeletonSocial />
                    ) : (
              <div>
                <div className="mb-2 text-left">
                  <Typography variant='h5'>
                    Sosyal Medya
                  </Typography>
                </div>
                <div className="mb-4">
                  <Typography variant='paragraph' className="text-justify">
                    Buradan sosyal medya adreslerimize ulaşarak yayınlarımıza göz atabilir veya sosyal hesaplarımızı takip edebilirsiniz.
                  </Typography>
                    <SocLinks/>
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
