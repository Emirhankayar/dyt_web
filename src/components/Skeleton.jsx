import React from 'react';

export function SkeletonBook() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
       <div className="space-y-8 mt-4">
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>

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

          <div  className="w-2/3 h-20 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>


        </div>
    </div>
  );
}


export function SkeletonReach() {
  return (
    <div className="w-full h-full space-y-5 rounded-lg p-4 animate-pulse">
       <div className="space-y-10 mt-4">
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-full h-32 rounded-lg bg-gray-400 rounded-lg"></div>
          <div  className="w-2/3 h-20 rounded-lg bg-gray-400 rounded-lg"></div>

        </div>

          <div  className="w-full h-10 rounded-lg bg-gray-400 rounded-lg"></div>


    </div>
  );
}

export default { SkeletonBook, SkeletonReach };
