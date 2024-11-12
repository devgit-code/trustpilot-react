import React from "react";

function RatingAverage({ className, rating, width='w-5', height='w-5' }) {
    return (
        <div>
            <div className={`${className} p-1 rounded-md inline-flex items-center ${
                rating < 1.5
                    ? 'bg-red-200'
                    : rating < 2.5
                    ? 'bg-orange-100'
                    : rating < 3.5
                    ? 'bg-yellow-200'
                    : rating < 4.5
                    ? 'bg-lime-200'
                    : 'bg-green-200'
            }`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${width} ${height} p-1 m-0 text-white ${
                        rating < 1.5
                            ? 'bg-red-500'
                            : rating < 2.5
                            ? 'bg-orange-400'
                            : rating < 3.5
                            ? 'bg-yellow-500'
                            : rating < 4.5
                            ? 'bg-lime-500'
                            : 'bg-green-500'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.417 8.258L12 18.9l-7.417 4.955L6 15.596 0 9.748l8.332-1.73L12 .587z" />
                </svg>
                <span className="ml-1 text-gray-800 text-sm font-bold">{rating}</span>
            </div>
        </div>
    );
}

export default RatingAverage;
