import React from "react";

function Card({ image, title, link, rating, reviews }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col group items-center text-center border border-gray-200 hover:">
            <div className="w-16 h-16 mb-3">
                <img src={image} alt={title} className="w-full h-full object-cover rounded" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <a href={link} className="text-sm text-gray-500">
                {link.replace("https://", "").replace("www.", "")}
            </a>
            <div className="flex items-center mt-3 space-x-1">
                <div className="flex space-x-1">
                    {/* Add star icons or other rating symbols as needed */}
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                    <span className="text-green-500">★</span>
                </div>
                <span className="text-gray-700 font-semibold">{rating}</span>
                <span className="text-gray-400">({reviews})</span>
            </div>
        </div>
    );
}

export default Card;
