import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function ContactPopup() {
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
                    className="flex items-center text-lg px-3 py-2 text-gray-400 bg-white hover:text-blue-500"
                >
                    <FaEnvelope className="mr-2" /><FaGlobe className="mr-2" /><FaPhoneAlt/>
                </button>

                {/* Contact Popup */}
                {showPopup && (
                    <div className={`absolute ${position === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}
                         left-0 z-10 w-64 p-4 mt-2 bg-white border rounded-lg shadow-lg`}
                        ref={popupRef}>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="flex items-center mb-3">
                            <FaGlobe className="text-gray-500 mr-2" />
                            <a href="https://jessemade.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            jessemade.com
                            </a>
                        </div>
                        <div className="flex items-center mb-3">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <a href="mailto:support@jessemade.com" className="text-blue-600 hover:underline">
                            support@jessemade.com
                            </a>
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-gray-500 mr-2" />
                            <span>United States</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
