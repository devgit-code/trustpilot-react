import React, { useRef, useEffect, useState } from 'react';

function SearchSection() {
    return (
        <div className="relative flex items-center justify-center h-[80vh] bg-[#FCFBF3] overflow-hidden">
            {/* Background shapes */}
            <div className="absolute w-1/2 aspect-[1/1] inset-1/4 -top-[40%] md:-top-[90%] bg-[#FD791A] rounded-full animate-horizontal"></div>
            <div className="absolute md:-bottom-[55%] md:-left-[8%] w-1/3 aspect-[1/1] bg-[#FFE400] rounded-[40px] rotate-45 animate-spin-reverse"></div>
            {/* <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-green-500 rounded-[40px]"></div> */}

    {/* Rotating Triangle with Rounded Corners */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="animate-spin"
        style={{ animationDuration: '4s' }}
      >
        <defs>
          <filter id="rounded-corners">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>
        <polygon
          points="100,10 40,190 160,190"
          fill="#4CAF50"
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
