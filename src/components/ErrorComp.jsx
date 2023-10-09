
import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
export default function ErrorComp() {

  return (
    <>


      <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <div className='container h-full w-full flex flex-col items-center justify-center'>
            <div className='w-full h-full flex flex-col h-full w-full justify-center text-center space-y-5'>

            <Typography className='text-8xl h-full font-bold'>
                404
            </Typography>
            <Typography className='text-3xl h-full font-regular'>
                Aradığınız Sayfa veya İçerik Bulunamadı
            </Typography>
            <Typography className='text-xl h-full font-regular'>
                Buradan Devam Edebilirsiniz
            </Typography>
            <a href='/'>
                <Button size='small' className=' font-regular text-center'>
                    Anasayfa
                </Button>
            </a>
            </div>
        </div>


      </div>

    </>
  )
}
