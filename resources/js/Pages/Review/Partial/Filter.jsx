import React, { useState, useEffect } from 'react';

const colors = [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500'
];

const ratings = [
    { stars: 5, count: 870 },
    { stars: 4, count: 120 },
    { stars: 3, count: 70 },
    { stars: 2, count: 40 },
    { stars: 1, count: 20 },
];
export default function FilterReview() {
    const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);

    return (
        <div className="p-3 bg-white border rounded">
            <h3 className='text-xl font-bold'>Reviews</h3>
            <p className=''>total</p>
            <div className='mt-2 pb-5 border-b-2'>
                <div className="space-y-6">
                {ratings.map((rating, index) => {
                    const percentage = ((rating.count / totalRatings) * 100).toFixed(1);
                    return (
                        <div key={index} className="flex group items-center space-x-4">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-gray-600"
                                id={`star-${rating.stars}`}
                                />
                            <label
                                htmlFor={`star-${rating.stars}`}
                                className="text-sm text-gray-800 whitespace-nowrap w-16"
                                >
                                {rating.stars}-star
                            </label>
                            <div className="relative w-full bg-gray-200 rounded-md overflow-hidden">
                                <div
                                    className={`h-3 bg-gray-900 hover:${colors[index+1]} rounded-md`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-800 w-10 text-right">
                            {percentage}%
                            </div>
                        </div>
                    );
                })}
                </div>

            </div>
        </div>
    )
}
