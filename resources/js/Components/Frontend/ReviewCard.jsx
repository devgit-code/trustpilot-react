import React, { useState } from 'react';

const ReviewCard = ({ logo, title, link, isVerified, rating, reviews }) => {
  return (
    <div className="min-w-[280px] bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      {/* Logo Section */}
      <div className="relative w-16 h-16 mx-auto mb-4">
        <img src={logo} alt={title} className="w-full h-full object-cover rounded-lg" />
        {isVerified && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            ✔
          </span>
        )}
      </div>

      {/* Title and Link */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <a href={`https://${link}`} target="_blank" rel="noopener noreferrer">
          <div className="text-sm text-gray-500 hover:bg-gray-100 p-1 rounded">
            {link.replace("https://", "").replace("www.", "")}
          </div>
        </a>
      </div>

      {/* Rating Section */}
      <div className="flex items-center justify-center mt-4 space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ${
              index < rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.417 8.258L12 18.9l-7.417 4.955L6 15.596 0 9.748l8.332-1.73L12 .587z" />
          </svg>
        ))}
        <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
        <span className="text-xs text-gray-500">({reviews})</span>
      </div>
    </div>
  );
};

export default ReviewCard;

