import React from 'react';

export function SkeletonBook() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
      <div className="space-y-8 mt-4">
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>

        <div className="mb-4 flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between items-center">
          <div className='w-2/4 h-4 bg-gray-400 rounded-lg'></div>
          <div className="flex flex-row p-2 w-1/4 justify-center items-center">
            <div className="bg-gray-400 rounded-full p-6 h-10 w-10"></div>
            <div className="bg-gray-400 rounded-full p-6 h-10 w-10"></div>
          </div>
        </div>
        <div className='space-y-2 -mt-8'>
          <div className='w-full h-4 bg-gray-400 rounded-lg'></div>
          <div className='w-3/4 h-4 bg-gray-400 rounded-lg'></div>
          <div className='w-2/4 h-4 bg-gray-400 rounded-lg'></div>
        </div>

        <div className="w-2/3 h-20 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>


      </div>
    </div>
  );
}


export function SkeletonReach() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
      <div className="space-y-10 mt-4">
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-full h-32 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-2/3 h-20 rounded-lg bg-gray-400 rounded-lg"></div>

      </div>

      <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>


    </div>
  );
}

export function SkeletonBlog() {
  return (

    <div className='w-full h-[66vh]'>
    <div className="w-full h-80 flex-col items-center justify-center space-y-5 rounded-lg animate-pulse p-4">
      <div className="h-full max-w-sm">
        <div className="w-full h-2/3 rounded-t-lg bg-gray-400"></div>
        <div className="flex-col flex items-center justify-center rounded-lg space-y-4 bg-gray-300">

          <div className="w-full h-5/6 object-cover rounded-t-lg bg-gray-400"></div>
          <div className="w-1/3 h-6 bg-gray-400 rounded-lg"></div>

          <div className="flex flex-col justify-center items-start w-full space-y-2 p-4">
            <div className="w-full h-4 bg-gray-400 rounded-lg"></div>
            <div className="w-2/3 h-4 bg-gray-400 rounded-lg"></div>
            <div className="w-1/3 h-4 bg-gray-400 rounded-lg"></div>
          </div>

          <div className="w-1/3 h-4 bg-gray-400 rounded-lg"></div>
          <div className="w-1/3 h-8 bg-gray-400 rounded-lg" style={{ marginBottom: '20px' }}></div>
        </div>
      </div>
    </div>
    </div>

  );
}

export function SkeletonBlogSub() {
  return (
     <div className="p-4 w-screen h-full">
    <div className=" h-[100px] animate-pulse rounded-lg grid grid-cols-1 place-center justify-center">
      <div className='max-w-lg bg-gray-400 w-full rounded-lg mx-auto'>

      </div>
    </div>
  </div>


  );
}

export function SkeletonRecipe() {
  return (
    <div className='w-full h-[40vh]'>

    <div className="w-full h-full space-y-5 rounded-lg animate-pulse p-4">
      <div className="h-52 max-w-sm bg-gray-400 rounded-lg">

      </div>
    </div>
    </div>

  );
}



export default { SkeletonBook, SkeletonReach, SkeletonBlog, SkeletonRecipe, SkeletonBlogSub };
