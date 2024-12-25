import React, { useState } from 'react';


export default function RatingFilter({ score, onChange }) {
    // State to track selected rating
    const [selectedRating, setSelectedRating] = useState(score);

  // Function to handle click on rating button
    const handleRatingClick = (value) => {
        setSelectedRating(value);
        onChange(value);
    };

    return (
        <>
            <h3 className="font-semibold text-lg">Rating</h3>
            <div className="w-full rounded">
                <div className="grid grid-cols-4">
                    {['any', '3.0', '4.0', '4.5'].map((rating) => (
                    <button
                        key={rating}
                        onClick={() => handleRatingClick(rating)}
                        className={`py-2 text-sm m-0 border border-black ${selectedRating === rating ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-700'} hover:bg-gray-300 focus:outline-none`}
                    >
                        {rating === 'all' ? 'Any' : `★ ${rating}+`}
                    </button>
                    ))}
                </div>
            </div>
        </>
    );
}
