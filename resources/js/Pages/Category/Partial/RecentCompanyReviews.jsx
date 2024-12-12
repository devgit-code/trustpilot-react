import React, { useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ReviewCard from './RecentCompanyReviewCard.jsx';


const RecentCompanyReviews = ({ reviews }) => {
    return (
        <div className="">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-lg font-bold my-2">Recently reviewed companies</h2>
                {/* See More Button */}
                {/* <div className="flex items-center justify-center">
                    <button className="inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                    See more
                    </button>
                </div> */}
            </div>

            <div className="relative flex items-center pt-3 mb-5">
                <div className="flex lg:grid lg:grid-cols-3 lg:w-full gap-3 px-3 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth pb-5">
                {
                    reviews.length == 0 && (
                        <p className='text-center text-gray-700 text-lg'>No company</p>
                    )
                }
                {reviews.map((item, index) => (
                    <ReviewCard
                        key={index}
                        {...item}
                    />
                ))}
                </div>
            </div>
        </div>
    );
};

export default RecentCompanyReviews;
