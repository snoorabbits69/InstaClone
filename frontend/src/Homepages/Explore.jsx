import React from 'react'
import Search from './Search';
export default function Explore() {
  return (
   <section className="sm:mx-96 ">
    <div className="px-4 mb-4 sm:hidden">
    <Search/>
    </div>
<div className="grid grid-cols-3">
  <p className='w-auto h-32 bg-blue-500 sm:h-64 '></p>
  <p className='w-auto h-32 bg-green-600 sm:h-64'></p>
  <p className="w-auto h-auto row-span-2 bg-red-400 border-2 "></p>
  <p className='w-auto h-32 bg-yellow-300 sm:h-64'></p>
  <p className='w-auto h-32 bg-blue-200 sm:h-64'></p>
  
  <p className='w-auto h-auto row-span-2 bg-yellow-500 '></p>
  <p className='w-auto h-32 bg-blue-500 sm:h-64 '></p>
  <p className='w-auto h-32 bg-green-600 sm:h-64'></p>
  <p className='w-auto h-32 bg-blue-200 sm:h-64'></p>
  <p className="w-auto bg-red-400 "></p>

  <p className='w-auto h-32 bg-blue-500 sm:h-64 '></p>
  <p className='w-auto h-32 bg-green-600 sm:h-64'></p>
  <p className="w-auto h-auto row-span-2 bg-red-400 border-2 "></p>
  <p className='w-auto h-32 bg-yellow-300 sm:h-64'></p>
  <p className='w-auto h-32 bg-blue-200 sm:h-64'></p>
  
  
</div>
   </section>
  )
}
