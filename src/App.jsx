
import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./components/Hero'));
const Blog = React.lazy(() => import('./components/Blog'));
//const Pack = React.lazy(() => import('./components/Package'));

const Footer = React.lazy(() => import('./components/Footer'));

import Spinner from './components/Spinner'

export default function App() {

  return (
    <ThemeProvider>
      <div className='bg-white'>
        <Suspense fallback={<Spinner/>}>
          <Navbar />
          <Hero />
          <Blog />


          <Footer />
        </Suspense>

      </div>
    </ThemeProvider>

  )
}

