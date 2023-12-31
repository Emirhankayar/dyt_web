
import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
const Hero = React.lazy(() => import('../sections/HeroSec'));
const About = React.lazy(() => import('../sections/AboutSec'));
const BlogSec = React.lazy(() => import('../sections/BlogSec'));
const RecipeSec = React.lazy(() => import('../sections/RecipeSec'));
const BannerSec = React.lazy(() => import('../sections/BannerSec'));

export default function MainPage() {

  return (
    <>


      <div className='bg-gray-200 pb-20'>

          <Hero />
          <About />
          <BlogSec />
          <RecipeSec />
          <BannerSec />
        
      </div>

    </>
  )
}
