import React, { useRef, useEffect, useState } from 'react';
import { IoSearchOutline, IoClose } from "react-icons/io5";

function SearchSection() {
    return (
        <div className="relative flex items-center justify-center h-[45vh] min-h-[331px] bg-[#9FF6D3] p-2">
            {/* Central text and input */}
            <div className="text-center z-10 ">
                <h2 className="text-4xl font-extrabold text-gray-900 select-none">Share your experience</h2>
                <p className="text-lg mt-3 text-black font-bold mt-2 select-none">Help others make the right choice.</p>

                <div className="relative my-3 min-w-xl mx-auto z-20">
                    <button className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-none text-gray-700 rounded-full p-2">
                        <IoSearchOutline className='text-xl'/>
                    </button>
                    <input
                        type="text"
                        placeholder="Find a company to review"
                        className="w-full py-3 px-5 rounded-full shadow-lg text-gray-700 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchSection;
