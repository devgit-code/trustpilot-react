import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ReviewCard from '@/Components/Frontend/ReviewCard';

import "./Style.css"
import {
    Link,
    usePage,
} from '@inertiajs/react';


const RecentReviewList = ({ reviews }) => {

    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-2xl font-bold my-2">Recent Reviews</h2>
                {/* See More Button */}
                {/* <div className="flex items-center justify-center">
                    <a href="/reviews/review/latest" className="no-underline inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                    See more
                    </a>
                </div> */}
            </div>

            <div className="relative flex items-center pt-3">
                <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-4 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                    {
                        reviews.length === 0 ? (
                            <div className='lg:col-span-4 text-2xl font-bold text-center text-gray-500'>There is no reviews yet.</div>
                        ):(
                            <>
                                {reviews.map((item, index) => (
                                    <ReviewCard
                                        key={index}
                                        {...item}
                                    />
                                ))}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default RecentReviewList;
