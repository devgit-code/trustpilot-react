import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ReviewCard from '@/Components/Frontend/ReviewCard';

import "./Style.css"
import {
    Link,
    usePage,
} from '@inertiajs/react';


const reviews = [
    {
        review_id: '2332',
        user: {
            name: 'Rekha Sundavadra',
            avatar_url: null
        },
        rating: 5,
        comment: 'Anastacia has been nothing but fantastic. She has been very quick with communication and the speed at which she works at is outstanding. Any enquiries we have had...',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '233',
        user: {
            name: 'Se kang',
            avatar: null
        },
        rating: 2,
        comment: 'Like very well',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '2332',
        user: {
            name: 'Rekha Sundavadra',
            avatar_url: null
        },
        rating: 5,
        comment: 'Anastacia has been nothing but fantastic. She has been very quick with communication and the speed at which she works at is outstanding. Any enquiries we have had...',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '233',
        user: {
            name: 'Se kang',
            avatar: null
        },
        rating: 2,
        comment: 'Like very well',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '233',
        user: {
            name: 'Se kang',
            avatar: null
        },
        rating: 2,
        comment: 'Like very well',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '2332',
        user: {
            name: 'Rekha Sundavadra',
            avatar_url: null
        },
        rating: 5,
        comment: 'Anastacia has been nothing but fantastic. She has been very quick with communication and the speed at which she works at is outstanding. Any enquiries we have had...',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '233',
        user: {
            name: 'Se kang',
            avatar: null
        },
        rating: 2,
        comment: 'Like very well',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
    {
        review_id: '2332',
        user: {
            name: 'Rekha Sundavadra',
            avatar_url: null
        },
        rating: 5,
        comment: 'Anastacia has been nothing but fantastic. She has been very quick with communication and the speed at which she works at is outstanding. Any enquiries we have had...',
        company: {
            logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
            name: 'Liquid Expat Mortgages',
            website: 'liquidexpatmortgages.com',
        },
    },
];

const RecentReviewList = () => {

    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-2xl font-bold my-2">Recent Reviews</h2>
                {/* See More Button */}
                <div className="flex items-center justify-center">
                    <a href="/reviews/review/latest" className="no-underline inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                    See more
                    </a>
                </div>
            </div>

            <div className="relative flex items-center pt-3">
                <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-4 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
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

export default RecentReviewList;
