import React, { useRef, useEffect, useState } from 'react';

function SearchSection() {
    return (
        <div className="relative flex items-center justify-center h-[45vh] min-h-[331px] bg-[#9FF6D3] overflow-hidden">
            {/* Central text and input */}
            <div className="text-center z-10 px-8">
                <h2 className="text-4xl font-extrabold text-gray-900 select-none">Share your experience</h2>
                <p className="text-lg mt-3 text-black font-bold mt-2 select-none">Help others make the right choice.</p>

                <div className="relative my-3 max-w-lg mx-auto ">
                    <button className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-none text-gray-700 rounded-full p-2">
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
