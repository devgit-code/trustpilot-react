import React, { useState, useEffect } from 'react';
import secondbanner from '../../../../images/secondbanner.jpg'

const AnimatedComponent = () => {

    return (
        <div className="bg-[#9AE9C9] rounded-2xl mb-5 p-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between container-md mx-auto shadow-lg">
            {/* Text Section */}
            <div className="flex-1 mr-4 p-4">
                <h2 className="text-3xl font-bold mb-3">We’re Trustpilot</h2>
                <p className="text-md text-black mb-4">We’re a review platform that’s open to everyone. Our vision is to become a universal symbol of trust — by empowering people to shop with confidence, and helping companies improve.

</p>
                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="bg-green-950 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-200">
                        What we do
                    </button>
                </div>
            </div>


            <div className="flex-grow px-4">
                <div className="flex image rounded-lg">
                    <img
                        src={secondbanner}
                        alt="ad banner"
                        className="w-full aspect-[4/2] rounded-lg shadow"
                    />
                </div>
            </div>

        </div>
    );
};

export default AnimatedComponent;
