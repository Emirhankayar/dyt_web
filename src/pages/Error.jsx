
import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import ErrorComp from '../components/ErrorComp'

export default function ErrorPage() {

  return (
    <>
    <ThemeProvider>

      <div className='bg-gray-200 pb-20'>

        <ErrorComp/>
      </div>
    </ThemeProvider>
    </>
  )
}
