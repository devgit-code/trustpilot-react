import React, { useState, useEffect } from 'react';

const AnimatedComponent = ({bgColor, headTitle, bodyText, imgSrc, imgClassName="", imgAspect="2/1"}) => {

    return (
        <div className="rounded-2xl mt-5 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between container-md mx-auto shadow-lg" style={{backgroundColor: bgColor}}>
            {/* Text Section */}
            <div className="flex-1 mr-4 p-4">
                <h2 className="text-3xl font-bold mb-3">{headTitle}</h2>
                <p className="text-md text-black mb-4">{bodyText}</p>
                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-200">
                        What we do
                    </button>
                </div>
            </div>


            <div className="flex-grow">
                <div className={`${imgClassName} image rounded-lg`}>
                    <img
                        src={imgSrc}
                        alt="ad banner"
                        className="rounded-lg shadow"
                        style={{aspectRatio: imgAspect}}
                    />
                </div>
            </div>

        </div>
    );
};

export default AnimatedComponent;
