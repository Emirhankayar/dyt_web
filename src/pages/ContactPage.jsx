
import React from 'react';


import { Typography } from '@material-tailwind/react';
const Reach = React.lazy(() => import('../components/Reach'));
const Book = React.lazy(() => import('../components/Book'));
const Email = React.lazy(() => import('../components/Email'));
const Social = React.lazy(() => import('../components/Social'));


export default function ContactPage() {

  return (
    <>
      <div className='bg-gray-200 pb-40 pt-40'>
      <div className="hidden-class">
      <div className="container flex flex-wrap justify-between w-5/6 items-center mb-10 mt-10 mx-auto">
                 <div className="max-w-full text-justify">
                     <Typography className="text-2xl font-bold">İletişim</Typography>
                     <Typography className="text-md w-full mt-2 leading-loose">Bu sayfa aracılığıyla bizimle iletişim kurabilir, randevu talebinde bulunabilir, e-posta bültenimize kaydolabilir veya sosyal medya bağlantılarımıza erişebilirsiniz.</Typography>
                 </div>
 
                 </div>

        </div>


         <div className='container grid grid-cols-1 lg:grid-cols-2 mx-auto gap-20'>
            <div>
                <Reach/>
            </div>

            <div>
                <Book/>
            </div>


            <div>
                <Email/>

            </div>
            <div>
                
            <Social/>
            </div>


        </div>


        </div>
    </>
  )
}
