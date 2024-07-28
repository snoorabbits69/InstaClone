import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadPostRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import PostImages from './create components/PostImages';
import { HiOutlineX } from "react-icons/hi";
export default function Create({setShowCreate}) {
  const state = useSelector((state) => state.user);
  const [arr, setArr] = useState(1);
  const { handleSubmit, register, reset } = useForm();
  const [images, setImages] = useState([]);
const inputref=useRef(null);
  const current = () => {
    switch (arr) {
      case 1:
        return (
          <section>

<div className="flex flex-col justify-center w-80     lg:w-[30rem] "    >

          <input  type="file" id="inputfiles"  multiple {...register('files')}  onChange={(e) => {
              setImages([...e.target.files]);
           setArr(2);
            }}
            className="hidden"
            accept="image/*"
          />
          <div className="z-50 w-full flex justify-center  text-sm lg:text-base h-[34rem]" id="inputbox"> 
  <label htmlFor="inputfiles" className="mt-[40%] w-[50%] h-14 mx-12  bg-blue-500 text-center hover:opacity-75 hover:cursor-grab transition-all pt-4 border-2 border-solid left-0  z-50">
    Select From Computer
  </label>
  </div>
          </div>
          <section className="fixed top-0 left-0 w-screen h-screen bg-gray-400 clip opacity-10" style={{zIndex:0}} onDrop={(e)=>{e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  setImages(files);
if(images){
  setArr(2);
}
  }} 
  
  onDragOver={(e)=>{e.preventDefault();}}>

</section>
          </section>
        );
      case 2:
        return  <section className="lg:w-[30rem] w-80  ">
<PostImages images={images}/>
</section>
        
         
      case 3:
        return     <>
        <div className="flex flex-col lg:flex lg:flex-row w-min">
          <section className="lg:w-[30rem] w-80 p-2">
        <PostImages images={images} />
        </section>
          
        <div className=" border-2 w-80 lg:relative absolute -bottom-12 lg:bottom-0  lg:h-[70%] ">
          <textarea {...register('caption')} placeholder="caption" className="top-0 outline-none lg:h-32 w-80" autoFocus />
          </div>
          <button className='absolute right-2 -top-9'> submit </button>
          </div>
          </>
      
      default:
        return null;
    }
  };

  const submit = async (formData) => {
    const data = new FormData();
    images.forEach((image) => {
      data.append('files', image);
    });
    data.append('caption', formData.caption);

    try {
      const response = await axios.post(UploadPostRoute(state.currentUser._id), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      setImages([]);
      setArr(1);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className='fixed flex justify-center w-screen h-screen pt-2 border-solid lg:pl-12'>
 <button className="fixed z-50 right-4 top-4 md:text-3xl" onClick={()=>{
  setShowCreate(false);
  setImages([]);
 }}><HiOutlineX/></button>
      <div className="relative border-2 h-[72%] w-80 mt-12 lg:mt-0 lg:w-max   ">
      {arr>1 &&
        <div className="absolute flex justify-between w-full p-3 border-2 border-b-0 -top-12">
       <button onClick={() => setArr((prev) => Math.min(3, prev - 1))}>Prev</button>
          { arr!=3 &&   <button onClick={() => setArr((prev) => Math.max(3, prev + 1))}>Next</button> }

        </div>
    }
      <form onSubmit={handleSubmit(submit)}>
        {current()}
      </form>
      </div>
    </div>
  );
}
