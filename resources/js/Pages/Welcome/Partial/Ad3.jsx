import React, { useState, useEffect } from 'react';
import banner from '../../../../images/profile1.png'

const AnimatedComponent = () => {

    return (
        <div className="bg-[#234F3F] rounded-2xl my-5 p-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between container-md mx-auto shadow-lg">
            {/* Text Section */}
            <div className="flex-1 mr-4 p-4">
                <h2 className="text-3xl font-bold text-white mb-3">Are you a business?</h2>
                <p className="text-white text-md text-black mb-4">Join Trustpilot and inspire customer confidence with real reviews.

</p>
                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <a className="btn btn-outline-light px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-200"
                        href={route('yonetici.register')}>
                        Get started
                    </a>
                </div>
            </div>


            <div className="flex-grow justify-end">
                <div className="w-1/2 float-right px-4">
                    <div className="flex rounded-lg">
                        <img
                            src={banner}
                            alt="ad banner"
                            className="w-full aspect-[1/1] rounded-lg shadow"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AnimatedComponent;
