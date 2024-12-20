import React, { useState, } from "react";
import { useEffect } from "react";

export default function RatingClick({ className, star='0', onClick }) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(parseInt(star))
    }, [star])


    return (

        <div className={`${className} inline-flex items-center space-x-1`}
            onMouseLeave={()=>setRating(parseInt(star))}>
            {[...Array(5)].map((_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-8 h-8 p-1 text-white ${
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
                onMouseEnter={()=>setRating(index+1)}
                onClick={()=>onClick(index+1)}
            >
                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.417 8.258L12 18.9l-7.417 4.955L6 15.596 0 9.748l8.332-1.73L12 .587z" />
            </svg>
            ))}
        </div>
    );
}

