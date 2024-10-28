import React from 'react';

export default function DangerButton() {
    return (
        <div className="relative w-full h-96 overflow-hidden ">
            {/* Main Background */}
            <div className="absolute inset-0 w-full h-full bg-[#FCFBF3] opacity-90" />

            {/* Animated Block 1 - Horizontal movement */}
            <div className="absolute top-0 w-1/2 h-16 bg-[#FD791A] opacity-75 animate-moveHorizontal" />

            {/* Animated Block 2 - Vertical movement */}
            <div className="absolute left-0 h-1/2 w-16 bg-[#FFE400] opacity-75 animate-moveVertical" />

            {/* Animated Block 2 - Vertical movement */}
            <div className="absolute right-0 h-1/2 w-16 bg-[#04DA8D] opacity-75 animate-moveVertical" />
        </div>
    );
}
