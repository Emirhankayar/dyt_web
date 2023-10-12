import React from 'react';
import { Typography } from '@material-tailwind/react';
const Reach = React.lazy(() => import('../components/Reach'));
const Book = React.lazy(() => import('../components/Book'));
const Email = React.lazy(() => import('../components/Email'));
const Social = React.lazy(() => import('../components/Social'));
import { setupIntersectionObserver } from '../utils/utils';
import "../components/Animations.css"

export default function ContactPage() {

  setupIntersectionObserver('.hidden-class', 'show');
  setupIntersectionObserver('.hidden-class-l', 'show-l');

  return (
    <>
      <div className='bg-gray-200 pb-40 pt-40'>
      <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mt-10 mx-auto">
        <div className="hidden-class">
                 <div className="max-w-full">
                     <Typography variant='h4'>İletişim</Typography>
                     <Typography variant='paragraph' className="w-full mt-2 text-justify">Bu sayfa aracılığıyla bizimle iletişim kurabilir, randevu talebinde bulunabilir, e-posta bültenimize kaydolabilir veya sosyal medya bağlantılarımıza erişebilirsiniz.</Typography>
                 </div>
 
        </div>

        </div>

        
         <div className='container grid grid-cols-1 lg:grid-cols-2 mx-auto gap-20'>
            <div className='hidden-class'>
                <Reach/>
            </div>
            <div className='hidden-class-l'>
              <div className='z-10000'>

                <Book/>
              </div>
            </div>
            <div className='hidden-class'>
                <Email/>
            </div>
            <div className='hidden-class-l'>
              <div className='z-0'>
              <Social/>

              </div>
            </div>
        </div>
        </div>
    </>
  )
}
