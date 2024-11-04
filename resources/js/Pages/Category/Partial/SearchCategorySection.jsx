import React, { useRef, useEffect, useState } from 'react';

function SearchSection() {
    return (
        <div className="relative flex items-center justify-center h-[45vh] bg-[#F1F1E8] overflow-hidden">
            {/* Central text and input */}
            <div className="text-center z-10">
                <h2 className="text-4xl font-bold text-gray-900 px-16 pb-3">What are you looking for?</h2>

                <div className="relative max-w-sm md:max-w-xl mx-auto">
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
                        placeholder="Search"
                        className="w-full py-3 px-5 rounded-2 text-gray-700 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchSection;
