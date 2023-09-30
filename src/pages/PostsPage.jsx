
import React from 'react';


const BlogSub = React.lazy(() => import('../posts/BlogSub'));


export default function MainPage() {

  return (
    <>

      <div className='bg-gray-200 pb-40 pt-40'>
        <div className='flex flex-col items-center justify-center'>


          <BlogSub />

        </div>
      </div>
    </>
  )
}
