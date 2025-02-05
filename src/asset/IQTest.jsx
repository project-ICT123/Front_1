import React from 'react';
import math from "../image/math.png";
import { GiBrain } from "react-icons/gi";
import crown from "../image/8.png";

function IQTest() {
  return (
    <div className="bg-logocolor text-white shadow  lg:h-[250px] sm:h-[200px] h-[150px] rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center relative hover:shadow-2xl cursor-pointer transition-all duration-300 lg:col-span-2">
      <div className="relative flex items-center justify-center">
        <GiBrain className="text-white text-5xl sm:text-6xl mr-3" />
        <img src={math} alt="Math" className="w-16 sm:w-20" />
      </div>
      <h3 className="font-semibold text-sm sm:text-base mt-4 text-center">IQ Test</h3>
      <p className="text-xs mt-2 text-center">
        <span className="line-through text-gray-300">$0.99</span>{" "}
        <span>$0.49</span>
      </p>
      <div className="absolute top-3 right-3">
        <img src={crown} alt="Math" className="w-10 sm:w-15" />
      </div>
    </div>
  );
}

export default IQTest;