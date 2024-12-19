import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import company_logo from "@/../images/company-logo.png"
import Rating from '@/Components/Ratings';
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs"
import { LuMessagesSquare } from "react-icons/lu";

export default function SpinBar({id, profile, company_email, company_name, website, email_verified_at, rating_statistic }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to handle scroll position
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100); // Show when scroll is > 300px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup
    }, []);

    return (
        <>
        {isVisible && (
            <div className={`sticky top-0 z-10 bg-gray-50 p-1 border-b text-white shadow-md transition-all duration-500 ease-out z-20`}>
                <div className='container-lg '>
                    <div className='my-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="p-2">
                            <div className='flex gap-4'>
                                <div className="relative inline-flex items-center justify-center w-20 h-20 border-2 bordered rounded">
                                    <img
                                        src={profile?.logo ? `/storage/images/logo/${profile.logo}` : company_logo}
                                        alt={company_name}
                                        className="object-cover rounded"
                                        style={{ maxWidth: '80px', maxHeight: '80px' }}/>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        className="absolute -top-2 -right-2">
                                        <path fill={`${email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                                        <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                                    </svg>
                                </div>
                                <div className="">
                                    <div className='text-2xl text-gray-800 font-extrabold mb-0'>
                                        {company_name}
                                        {
                                            !profile?.logo && (
                                                <p className={`ml-3 bg-red-100 py-1 px-2 rounded inline-flex text-sm items-center mb-0`}>
                                                    <BsFillExclamationOctagonFill className='text-danger text-base'/>
                                                    <span className='ml-1 text-gray-700 text-xs font-bold'>Unclaimed</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                    <div className='flex items-center mt-3'>
                                        <Rating rating={Number(rating_statistic.avg)}/>
                                        <span className='ml-4 text-gray-500'>{rating_statistic.avg} ({rating_statistic.total} reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 flex flex-col justify-end items-end">
                            {/* <div className='flex justify-center'>
                                <p className='text-gray-700'>
                                    <LuMessagesSquare className='inline mr-3'/>
                                    Replied to {rating_statistic.low_reviews.count_replies} out of {rating_statistic.low_reviews.count_reviews} negative reviews
                                </p>
                            </div> */}
                            <div className='flex gap-4'>
                                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className='no-underline p-1 px-4 border border-blue-400 rounded-full group hover:bg-blue-100 hover:border-blue-200'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <p className='text-blue-600 mb-1'>
                                            <FaExternalLinkAlt className='inline mr-2 text-sm group-hover:text-gray-600'/>
                                            <span className='text-sm font-bold text-blue-600 group-hover:text-gray-700'>{website}</span>
                                        </p>
                                    </div>
                                </a>
                                <Link href={route('reviews.evaluate', id)} className='no-underline bg-blue-500 p-1 px-4 border border-blue-400 group rounded-full hover:bg-blue-100 hover:border-blue-200'>
                                    <span className='text-sm font-bold text-gray-100 group-hover:text-gray-700 '>Write a review</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )}
        </>
    )
}
