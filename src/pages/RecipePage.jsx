
import React from 'react';


const RecipePost = React.lazy(() => import('../posts/RecipeSub'));


export default function MainPage() {

  return (
    <>

      <div className='bg-gray-200 pb-40 pt-40'>
        <div className='flex flex-col items-center justify-center'>

          <RecipePost />

        </div>
      </div>
    </>
  )
}
