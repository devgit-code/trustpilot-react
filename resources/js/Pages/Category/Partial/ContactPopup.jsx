import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function ContactPopup({ company }) {
    const [showPopup, setShowPopup] = useState(false);
    const [position, setPosition] = useState('down'); // 'down' or 'up'
    const popupRef = useRef(null);

    const handleTogglePopup = (e) => {
        const clickY = e.clientY; // Get the vertical position of the click
        const halfScreen = window.innerHeight / 2;

        setPosition(clickY > halfScreen ? 'up' : 'down'); // Set popup position
        setShowPopup(true);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false); // Close the popup when clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="relative">
                {/* Contact Button */}
                <button
                    onClick={(e)=>handleTogglePopup(e)}
                    className="flex items-center text-lg px-3 py-2 space-x-3 text-gray-400 bg-white hover:text-blue-500"
                >
                    <FaGlobe />
                    {company.profile_email && (<FaEnvelope />)}
                    {company.profile_phone && (<FaPhoneAlt />)}
                </button>

                {/* Contact Popup */}
                {showPopup && (
                    <div className={`absolute ${position === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}
                         left-0 z-10 min-w-60 p-3 mt-2 bg-white border rounded-lg shadow-lg`}
                        ref={popupRef}>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="flex items-center mb-3">
                            <FaGlobe className="text-gray-500 mr-2" />
                            <a href={`http://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            {company.website}
                            </a>
                        </div>
                        {
                            company.profile_email && (
                                <div className="flex items-center mb-3 pt-3 border-t-2">
                                    <FaEnvelope className="text-gray-500 mr-2" />
                                    <a href={`mailto:${company.profile_email}`} className="text-sm text-blue-600 hover:underline">
                                    {company.profile_email}
                                    </a>
                                </div>
                            )
                        }
                        {
                            company.profile_phone && (
                                <div className="flex items-center mb-3 pt-3 border-t-2">
                                    <FaPhoneAlt className="text-gray-500 mr-2" />
                                    <a href={`tel:${company.profile_phone}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                    {company.profile_phone}
                                    </a>
                                </div>
                            )
                        }
                        {
                            company.profile_location && (
                                <div className="flex items-center pt-3 border-t-2">
                                    <FaMapMarkerAlt className="text-gray-500 mr-2 w-5 h-5" />
                                    <span className='ml-1 text-sm '>{company.profile_location}</span>
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        </>
    );
}
