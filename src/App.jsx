
import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./sections/Hero'));
//const About = React.lazy(() => import('./sections/About'));
const Blog = React.lazy(() => import('./sections/Blog'));
const Recipe = React.lazy(() => import('./sections/Recipes'));
const Contact = React.lazy(() => import('./sections/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

import Spinner from './components/Spinner'

export default function App() {

  return (

    <ThemeProvider>

      <div className='bg-gray-200'>

        <Suspense fallback={<Spinner/>}>

          <Navbar />

          <Hero />

          <Blog />
          <Recipe />
          <Contact/>
          
          <Footer />
          
        </Suspense>

      </div>
    </ThemeProvider>

  )
}

