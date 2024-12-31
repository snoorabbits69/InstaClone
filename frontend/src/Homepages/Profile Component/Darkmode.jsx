import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import Darkmoding from './Darkmode.json';

export default function Darkmode() {
  const [isChecked, setIsChecked] = useState(()=>{
    let a=localStorage.getItem("dark");
   return a==="true"
  });
  const lottieRef = useRef(null);
useEffect(()=>{
  
     lottieRef.current.setSpeed(3);
        
        if (isChecked) {
          lottieRef.current.playSegments([0, 100], true);
          localStorage.setItem("dark",isChecked)
        } else {
          lottieRef.current.playSegments([100, 200], true);
          localStorage.setItem("dark",isChecked);

        }
      


},[isChecked])

  return (
    <button className="relative w-24 bottom-5" onClick={()=>{setIsChecked(!isChecked)}}>
      <Lottie 
        animationData={Darkmoding} 
        loop={false} 
        autoplay={false} 
        lottieRef={lottieRef} 
      />
    </button>
  );
}
