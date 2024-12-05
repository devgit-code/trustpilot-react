import React, { useState, useEffect } from "react";

const Alert = ({ message, type = "success", duration = 5000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [duration]);

    if (!isVisible) return null;

    const alertColors = {
        success: "bg-green-100 text-green-800 border-green-400",
        error: "bg-red-100 text-red-800 border-red-400",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
        info: "bg-blue-100 text-blue-800 border-blue-400",
    };

    return (
        <div
            className={`border px-4 py-3 rounded relative ${alertColors[type]} flex items-center my-2`}
            role="alert"
        >
            <span className="flex-1">{message}</span>
            <button
                type="button"
                className="ml-4 text-lg font-bold text-gray-800 hover:text-gray-500"
                onClick={() => setIsVisible(false)}
            >
                &times;
            </button>
        </div>
    );
};

export default Alert;
