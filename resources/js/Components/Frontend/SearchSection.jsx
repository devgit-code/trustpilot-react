import React, { useRef, useEffect, useState } from 'react';

function SearchSection() {
    return (
        <div className="relative flex items-center justify-center h-[80vh] bg-[#FCFBF3] overflow-hidden">
            {/* Background shapes */}
            <div className="absolute w-1/2 aspect-[1/1] inset-1/4 -top-[40%] md:-top-[90%] bg-[#FD791A] rounded-full animate-horizontal"></div>
            <div className="absolute md:-bottom-[55%] md:-left-[8%] w-1/3 aspect-[1/1] bg-[#FFE400] rounded-[40px] rotate-45 animate-spin-reverse"></div>
            {/* <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-green-500 rounded-[40px]"></div> */}

<div
        className="absolute w-1/3 aspect-[1/1] bg-green-500 animate-spin -right-[10%] -bottom-[10%]"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: '15%', // Adjust this value to control corner roundness
          animationDuration: '30s', // Adjust duration for rotation speed
        }}
      ></div>

<svg
        width="150"
        height="130"
        viewBox="0 0 100 100"
        className="animate-spin"
        style={{ animationDuration: '4s' }} // Adjust rotation speed as desired
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
                <h1 className="text-4xl font-bold text-gray-900 select-none">Find a company you can trust</h1>
                <p className="text-lg text-gray-600 mt-2 select-none">Real reviews by real people.</p>

                <div className="relative mt-6 max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search company or category"
                        className="w-full py-3 px-5 rounded-full shadow-lg text-gray-700 focus:outline-none"
                    />
                    <button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchSection;
