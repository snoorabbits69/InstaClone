import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
export default function PostImages({ images,forpost }) {
  console.log(images)
  const [x, setX] = useState(0);

  const handleIncrement = (e) => {
    e.preventDefault();
    e.preventDefault();
    const comp=100-(100/images.length);

    if(x<comp-1)
    setX((prev)=>(prev+(100)/images.length));
  else
  setX(0);

  };
const handleDecrement=(e)=>{
  e.preventDefault();
if(x>0){
setX((prev)=>(prev-(100)/images.length));
}
else{
  setX(100-(100/images.length));
}

}
  return (
    <section className={"relative overflow-hidden Postblock "}>
      <div className="relative flex gap-2 transition-all duration-500 w-max" style={{ transform: `translateX(-${x}%)` }}>
        {images.map((imageURL, index) => (
          <img src={forpost?imageURL:URL.createObjectURL(imageURL)} key={index} className={ "block h-[30rem]  md:w-[30rem] pb-2"}  />
        ))}
      </div>

     
      { images.length>1 && <>
        <button onClick={(e)=>{handleDecrement(e)}} className="absolute text-2xl top-60"><FaAngleLeft className="text-black "/></button>
        <button onClick={(e)=>{handleIncrement(e)}} className="absolute right-0 text-2xl top-60 "><FaAngleRight className="text-black "/></button>
      </>
      }
      </section>
  );
}
