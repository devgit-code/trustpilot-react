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

const Tooltip = ({ text, children }) => {
    const [show, setShow] = useState(false);

    return (
        <div
            className="relative block"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            >
            {show && (
                <div
                className="absolute bottom-full mb-2 bg-white border text-black text-sm px-2 py-1 rounded "
                style={{
                    left: "50%",
                    transform: "translateX(-50%)", // Center the tooltip
                }}
                >
                {text}
                </div>
            )}
            {children}
        </div>
    );
};

export default function FilterReview({ ratings }) {
    const [checkedRating, setCheckedRating] = useState([false, false, false, false, false])
    const [sortBy, setSortBy] = useState('Most relevant')

    const handleCheckboxChange = (index) => {
        const updatedChecked = [...checkedRating];
        updatedChecked[index] = !updatedChecked[index]; // Toggle the value
        setCheckedRating(updatedChecked); // Update the state
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    // const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0)

    return (
        <div className="p-3 bg-white border rounded">
            <h3 className='text-xl font-bold'>Reviews</h3>
            <p className='ml-3 text-gray-500'>{formatNumber(ratings.total)} total</p>

            <div className='mt-2 pb-3'>
                <div className="space-y-6">
                {[...Array(5)].map((_, index) => {
                    const percentage = (ratings.total !== 0 && ratings.stars[4-index]) ? ((ratings.stars[4-index].count / ratings.total) * 100).toFixed(1) : 0;
                    return (
                        <Tooltip key={index} text={`${ratings.stars[4-index].count} of ${ratings.total} reviews`} className='flex'>
                            <div className="flex group items-center space-x-4 hover:cursor-pointer"
                                onClick={()=>handleCheckboxChange(5-index)}>
                                <input
                                    type="checkbox"
                                    className="hidden form-checkbox h-5 w-5 text-gray-600 rounded bg-gray-50
                                        group-hover:bg-blue-100
                                        group-active:bg-blue-300
                                        group-focus:ring-2 group-focus:ring-blue-500
                                        checked:bg-blue-500
                                        "
                                    id={`star-${5-index}`}
                                    checked={checkedRating[5-index]}
                                    onChange={() => handleCheckboxChange(5-index)}
                                    />
                                <label
                                    htmlFor={`star-${5-index}`}
                                    className="text-sm text-gray-800 whitespace-nowrap w-16"
                                    >
                                    {5-index}-star
                                </label>
                                <div className="relative w-full bg-gray-200 rounded-md overflow-hidden">
                                    <div
                                        className={`h-3 bg-gray-900 ${colors[index]} rounded-md`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <div className="text-sm text-gray-800 w-10 text-right">
                                {(percentage < 0 && percentage < 1) ? "<1" : Math.round(percentage)}%
                                </div>
                            </div>
                        </Tooltip>
                    );
                })}
                </div>
            </div>

            {/* <div className=' border-t-2 pt-3 flex items-center justify-between my-3'>
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
            </div> */}
        </div>
    )
}
