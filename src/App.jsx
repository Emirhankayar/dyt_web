
import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Blog = React.lazy(() => import('./components/Blog'));
const Recipe = React.lazy(() => import('./components/Recipes'));
//const Pack = React.lazy(() => import('./components/Package'));

const Footer = React.lazy(() => import('./components/Footer'));

import Spinner from './components/Spinner'

export default function App() {

  return (
    <ThemeProvider>

      <div className='bg-gray-200'>

        <Suspense fallback={<Spinner/>}>

          <Navbar />
          <Hero />
          <About />
          <Blog />
          <Recipe />
          <Footer />
          
        </Suspense>

      </div>
    </ThemeProvider>

  )
}

