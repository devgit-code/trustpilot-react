import React from 'react';

export default function AnimateBack() {
    return (
        <div className='relative flex items-center justify-center h-full'>
            {/* Background shapes */}
            <div className="absolute w-1/2 aspect-[1/1] top-0 bg-[#FD791A] rounded-full animate-horizontal z-10"
                style={{}}>
            </div>
            <div className="absolute -left-[8%] -bottom-[25%] md:-bottom-[70%] md:-left-[20%] w-1/3 aspect-[1/1] bg-[#FFE400] rounded-[40px] rotate-45 animate-spin-reverse">
            </div>

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
        </div>
    )
}
