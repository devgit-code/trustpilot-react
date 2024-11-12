import React, { useRef, useEffect, useState } from 'react';
import { IoSearchOutline, IoClose } from "react-icons/io5";

function SearchSection() {
    return (
        <div className="relative flex items-center justify-center h-[70vh] min-h-[516px] bg-[#FCFBF3] overflow-hidden">
            {/* Background shapes */}
            <div className="absolute w-1/2 aspect-[1/1] top-0 bg-[#FD791A] rounded-full animate-horizontal"
                style={{}}></div>
            <div className="absolute -left-[8%] -bottom-[25%] md:-bottom-[70%] md:-left-[20%] w-1/3 aspect-[1/1] bg-[#FFE400] rounded-[40px] rotate-45 animate-spin-reverse"></div>
            {/* <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-green-500 rounded-[40px]"></div> */}

{/* <div
        className="absolute w-1/3 aspect-[1/1] bg-green-500 animate-spin -right-[10%] -bottom-[10%]"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: '15%', // Adjust this value to control corner roundness
          animationDuration: '30s', // Adjust duration for rotation speed
        }}
      ></div> */}

<svg
        viewBox="0 0 100 100"
        className="animate-spin absolute md:-right-[21%] md:-bottom-[60%] -right-[10%] -bottom-[20%] w-1/3 aspect-[1/1]"
        style={{ animationDuration: '40s' }} // Adjust rotation speed as desired
      >
        <defs>
          <filter id="rounded-corners">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
        <polygon
          points="50,5 5,95 95,95"
          fill="#4CAF50" // Green color
          filter="url(#rounded-corners)"
        />
      </svg>

            {/* Central text and input */}
            <div className="text-center z-10 px-8">
                <h2 className="text-4xl font-bold text-gray-900 md:px-24 select-none">Find a company you can trust</h2>
                <p className="text-lg text-gray-600 mt-2 select-none">Real reviews by real people.</p>

                <div className="relative max-w-lg md:max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search company or category"
                        className="w-full py-3 px-5 rounded-full shadow-lg text-gray-700 focus:outline-none"
                    />
                    <button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2">
                        <IoSearchOutline className='text-xl'/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchSection;
