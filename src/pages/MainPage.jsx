
import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
const Hero = React.lazy(() => import('../sections/HeroSec'));
//const About = React.lazy(() => import('../sections/About'));
const BlogSec = React.lazy(() => import('../sections/BlogSec'));
const RecipeSec = React.lazy(() => import('../sections/RecipeSec'));
const Contact = React.lazy(() => import('../sections/ContactSec'));

export default function MainPage() {

  return (
    <>
    <ThemeProvider>

      <div className='bg-gray-200 pb-20'>

          <Hero />
          <BlogSec />
          <RecipeSec />
          <Contact/>

      </div>
    </ThemeProvider>
    </>
  )
}
