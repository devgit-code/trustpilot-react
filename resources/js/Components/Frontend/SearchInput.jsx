import React from 'react';
import "./Style.css"

export default function SearchInput() {
    return (
        <div className="relative w-full py-48 overflow-hidden bg-[#FCFBF3]">
            {/* Rotating Circle */}
            <div className="absolute top-0 w-32 h-32 bg-blue-300 rounded-full opacity-50 animate-spin-slow" />


            {/* Rotating Triangle */}
            <div className="rounded-triangle absolute right-0 bottom-0 transform translate-x-1/2 -translate-y-1/2 animate-spin-slow" />

<div className="w-96 h-96">
            {/* SVG Triangle with All Rounded Corners */}
            <svg
                width="150"
                height="150"
                viewBox="0 0 100 100"
                className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"
            >
                <path
                    d="
                        M 50,5
                        Q 90,15 85,50  /* Top Right Corner */
                        Q 95,90 50,85  /* Bottom Right Corner */
                        Q 10,90 15,50  /* Bottom Left Corner */
                        Z
                    "
                    fill="#FFD700"
                />
            </svg>
        </div>
            <div className="w-1/4 aspect-[1/1] bg-yellow-400 rounded-lg clip-triangle"></div>
        </div>
        // <div className="relative w-full h-96 overflow-hidden ">
        //     {/* Main Background */}
        //     <div className="absolute inset-0 w-full h-full bg-[#FCFBF3] opacity-90" />

        //     {/* Animated Block 1 - Horizontal movement */}
        //     <div className="absolute top-0 w-1/2 h-16 bg-[#FD791A] opacity-75 animate-moveHorizontal" />

        //     {/* Animated Block 2 - Vertical movement */}
        //     <div className="absolute left-0 h-1/2 w-16 bg-[#FFE400] opacity-75 animate-moveVertical" />

        //     {/* Animated Block 2 - Vertical movement */}
        //     <div className="absolute right-0 h-1/2 w-16 bg-[#04DA8D] opacity-75 animate-spin animate-duration-[5000ms]" />
        // </div>
    );
}
