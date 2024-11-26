import React from "react";

function Ratings({ className, rating, width='w-5', height='w-5' }) {
    return (

        <div className={`${className} flex items-center space-x-1`}>
            {[...Array(5)].map((_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`${width} ${height} p-1 text-white ${
                    index < (Math.floor(rating + 0.5))
                        ? rating < 1.8
                            ? 'bg-red-500'
                            : rating < 2.8
                            ? 'bg-orange-400'
                            : rating < 3.8
                            ? 'bg-yellow-500'
                            : rating < 4.3
                            ? 'bg-lime-500'
                            : 'bg-green-500'
                        : 'bg-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.417 8.258L12 18.9l-7.417 4.955L6 15.596 0 9.748l8.332-1.73L12 .587z" />
            </svg>
            ))}
        </div>
    );
}

export default Ratings;
