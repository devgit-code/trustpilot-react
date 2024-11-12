import React, { useState, useEffect } from 'react';

import { RxMixerHorizontal } from "react-icons/rx";
import { RxCaretSort } from "react-icons/rx";

const colors = [
    'group-hover:bg-green-500',
    'group-hover:bg-lime-500',
    'group-hover:bg-yellow-500',
    'group-hover:bg-orange-400',
    'group-hover:bg-red-500',
];

const ratings = [
    { stars: 5, count: 870 },
    { stars: 4, count: 120 },
    { stars: 3, count: 70 },
    { stars: 2, count: 40 },
    { stars: 1, count: 20 },
];
export default function FilterReview() {
    const [checkedRating, setCheckedRating] = useState([false, false, false, false, false])
    const [sortBy, setSortBy] = useState('Most relevant')

    const handleCheckboxChange = (index) => {
        const updatedChecked = [...checkedRating];
        updatedChecked[index] = !updatedChecked[index]; // Toggle the value
        setCheckedRating(updatedChecked); // Update the state
    };

    const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0)

    return (
        <div className="p-3 bg-white border rounded">
            <h3 className='text-xl font-bold'>Reviews</h3>
            <p className=''>total</p>

            <div className='mt-2 pb-3 border-b-2'>
                <div className="space-y-6">
                {ratings.map((rating, index) => {
                    const percentage = ((rating.count / totalRatings) * 100).toFixed(1);
                    return (
                        <div key={index} className="flex group items-center space-x-4 hover:cursor-pointer"
                            onClick={()=>handleCheckboxChange(index)}>
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-gray-600 rounded bg-gray-50
                                    group-hover:bg-blue-100
                                    group-active:bg-blue-300
                                    group-focus:ring-2 group-focus:ring-blue-500
                                    checked:bg-blue-500
                                    "
                                id={`star-${rating.stars}`}
                                checked={checkedRating[index]}
                                onChange={() => handleCheckboxChange(index)}
                                />
                            <label
                                htmlFor={`star-${rating.stars}`}
                                className="text-sm text-gray-800 whitespace-nowrap w-16"
                                >
                                {rating.stars}-star
                            </label>
                            <div className="relative w-full bg-gray-200 rounded-md overflow-hidden">
                                <div
                                    className={`h-3 bg-gray-900 ${colors[index]} rounded-md`}
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

            <div className='flex items-center justify-between my-3'>
                <button className='no-underline p-1 px-4 border border-blue-400 rounded group hover:bg-blue-100 hover:border-blue-200'>
                    <div className='flex items-center justify-between text-sm'>
                        <p className='text-blue-600 mb-1'>
                            <span className='text-sm font-bold text-blue-600 group-hover:text-gray-700'>Filter</span>
                            <RxMixerHorizontal className='inline ml-2 text-sm group-hover:text-gray-600'/>
                        </p>
                    </div>
                </button>
                <div className='flex items-center'>
                    Sort:
                    <button className='no-underline ml-2 p-1 px-4 border border-blue-400 rounded group hover:bg-blue-100 hover:border-blue-200'>
                        <div className='flex items-center justify-between text-sm'>
                            <p className='text-blue-600 mb-1'>
                                <span className='text-sm font-bold text-blue-600 group-hover:text-gray-700'>{sortBy}</span>
                                <RxCaretSort className='inline ml-2 group-hover:text-gray-600'/>
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
