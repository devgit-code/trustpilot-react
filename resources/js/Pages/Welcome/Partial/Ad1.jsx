import React, { useState, useEffect } from 'react';
import firstbanner from '../../../../images/firstbanner.jpg'
import image1 from '../../../../images/Sir1.jpg'
import image2 from '../../../../images/Sir2.jpg'
import image3 from '../../../../images/sir3.jpg'
import image4 from '../../../../images/sir4.jpg'
import image5 from '../../../../images/sir5.jpg'
import image6 from '../../../../images/sirmain.jpg'

const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
];

const AnimatedComponent = () => {

    return (
        <div className="bg-[#F0D2BB] rounded-2xl mt-5 p-16 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between container-md mx-auto shadow-lg">
            {/* Text Section */}
            <div className="flex-1 mr-4 p-4">
                <h2 className="text-3xl font-bold mb-3">Help millions make the right choice</h2>
                <p className="text-md text-black mb-4">Share your experience on Trustpilot, where real reviews make a difference.</p>
                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="bg-orange-950 text-white px-4 py-2 rounded-full hover:bg-orange-700 hover:text-black">
                        Login or sign up
                    </button>
                </div>
            </div>

            <div className="flex-grow px-4">
                <div className="image rounded-lg">
                    <img
                        src={firstbanner}
                        alt="ad banner"
                        className="w-full aspect-[4/2] rounded-lg shadow"
                    />
                </div>
            </div>

        </div>
    );
};

export default AnimatedComponent;
