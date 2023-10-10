import React from 'react';

export function SkeletonBook() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
      <div className='w-2/4 h-4 bg-gray-400 rounded-lg'></div>
      <div className="space-y-6 mt-4">
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10  mb-8 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>

        <div className='space-y-10'>

          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>


      </div>
    </div>
  );
}

export function SkeletonReach() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
      <div className='w-2/4 h-4 bg-gray-400 rounded-lg'></div>
      <div className="space-y-6 mt-4">
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-1/3 h-4 bg-gray-400 rounded-lg'></div>
          <div className="w-full h-20 rounded-lg bg-gray-400 rounded-lg"></div>
        </div>
        <div className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>


      </div>
    </div>
  );
}

export function SkeletonEmail() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
      <div className="space-y-10 mt-4">
        <div className='space-y-2 -mt-8'>
          <div className='w-1/4 h-4 bg-gray-400 rounded-lg'></div>
          <div className='w-full h-4 bg-gray-400 rounded-lg'></div>
          <div className='w-3/4 h-4 bg-gray-400 rounded-lg'></div>
        </div>

      </div>
      <div className='w-full space-x-5 flex flex-row items-center justify-center'>
        <div className="w-3/4 h-10 rounded-lg bg-gray-400 rounded-lg"></div>
        <div className="w-1/4 h-10 rounded-lg bg-gray-400 rounded-lg"></div>
      </div>
    </div>
  );
}

export function SkeletonSocial() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
      <div className="space-y-10 mt-4">
        <div className='space-y-2 -mt-8'>
          <div className='w-1/4 h-4 bg-gray-400 rounded-lg'></div>
          <div className='w-full h-4 bg-gray-400 rounded-lg'></div>
          <div className='w-3/4 h-4 bg-gray-400 rounded-lg'></div>
        </div>
      </div>
      <div className='w-full space-x-5 flex flex-row items-center justify-center'>
        <div className="w-1/6 h-10 rounded-xl bg-gray-400 rounded-lg"></div>
        <div className="w-1/6 h-10 rounded-xl bg-gray-400 rounded-lg"></div>
        <div className="w-1/6 h-10 rounded-xl bg-gray-400 rounded-lg"></div>
      </div>
    </div>
  );
}
export function SkeletonBanner() {
  return (
    <div className="mb-2 lg:-mb-8 animate-pulse">
      <div className='w-1/3 lg:w-1/6 bg-gray-400 h-4 rounded-full mb-6'></div>
      
      <div className='flex flex-col lg:flex-row items-center gap-6 lg:mb-10'>
      <div className='w-full lg:w-1/2 space-y-4'>
      <div className='w-full bg-gray-400 h-4 rounded-full'></div>
      <div className='w-full bg-gray-400 h-4 rounded-full'></div>
      <div className='w-full hidden lg:block bg-gray-400 h-4 rounded-full'></div>
      <div className='w-full hidden lg:block bg-gray-400 h-4 rounded-full'></div>
      <div className='w-full hidden lg:block bg-gray-400 h-4 rounded-full'></div>
      <div className='w-4/5 bg-gray-400 h-4 rounded-full'></div>
      <div className='w-1/2 bg-gray-400 h-4 rounded-full'></div>

      </div>
      <div className='bg-gray-300 lg:w-1/2 w-full h-80 rounded-lg'>
        
      </div>

      </div>
      <div className='w-full flex flex-col lg:flex-row justify-center lg:justify-end items-center mb-6 gap-10 mt-10 lg:mt-4 lg:gap-20'>
      <div className='lg:w-1/3 flex flex-row space-x-10 justify-end items-center'>
        <div className='bg-gray-300 h-10 w-10 rounded-full'></div>
        <div className='bg-gray-300 h-10 w-10 rounded-full'></div>
        <div className='bg-gray-300 h-10 w-10 rounded-full'></div>
      </div>
        <div className='bg-gray-300 h-10 lg:w-1/2 w-full rounded-full'></div>
      </div>

    </div>


  );
}

export function SkeletonBlog() {
  return (

    <div className='w-full h-full flex flex-row items-center justify-center'>
      <div className="w-full h-80 flex-col items-center justify-center space-y-5 rounded-t-lg animate-pulse mx-auto p-4">
        <div className="h-full max-w-sm mx-auto">
          <div className="w-full h-2/3 rounded-t-lg bg-gray-400"></div>
          <div className="flex-col flex items-center justify-center rounded-b-lg space-y-4 bg-gray-300">
            <div className="w-full h-5/6 object-cover rounded-lg bg-gray-400"></div>
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
    <div className='container grid grid-cols-1 w-full mx-auto'>
      <div className="p-4 w-full h-full max-w-lg">
        <div className=" h-[100px] animate-pulse rounded-lg grid grid-cols-1 place-center justify-center">
          <div className='max-w-lg bg-gray-400 w-full rounded-lg mx-auto'>

          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonRecipe() {
  return (
    <div className='h-full w-full'>
      <div className="p-4 h-screen shadow-none relative">
        <div className="h-[30vh] bg-gray-400 animate-pulse rounded-lg mx-auto max-w-sm"></div>
      </div>
    </div>
  );
}


export default { SkeletonBook, SkeletonReach, SkeletonEmail, SkeletonSocial, SkeletonBlog, SkeletonRecipe, SkeletonBlogSub, SkeletonBanner };
