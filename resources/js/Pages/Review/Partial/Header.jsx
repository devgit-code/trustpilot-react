import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import company_logo from "@/../images/company-logo.png"
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs"
import { LuMessagesSquare } from "react-icons/lu";
import Rating from '@/Components/Ratings';

function Status({className, rating, total}) {
    return (
        <p className={`${className} `}>
            {
                rating < 1.8
                    ? 'Bad'
                    : rating < 2.8
                    ? 'Poor'
                    : rating < 3.8
                    ? 'Average'
                    : rating < 4.3
                    ? 'Great'
                    : 'Excellent '
            }
        </p>
    )
}

export default function Header({company_name, company_email, profile, primary_business_category, website, email_verified_at, rating_statistic}) {
    return (
        <div className='p-2 bg-whtie border-b'>
            <div className='container-lg'>
                <div className='mt-2 flex items-center'>
                    {
                        primary_business_category && (
                            <>
                                <div className='flex items-center'>
                                    <Link href={route('categories.show', primary_business_category.sub_category.category.id)}
                                        className='text-gray-800 text-sm capitalize no-underline hover:underline mr-3'>
                                        {primary_business_category.sub_category.category.name}
                                    </Link>
                                    &gt;
                                </div>
                                <Link href={route('categories.detail', primary_business_category.sub_category.id)}
                                    className='text-gray-700 text-sm capitalize no-underline hover:underline ml-2'>
                                    {primary_business_category.sub_category.name}
                                </Link>
                            </>
                        )
                    }
                </div>
                <div className='mt-3 grid md:grid-cols-[2fr_1fr] gap-4 grid-cols-1'>
                    <div className="p-2">
                        <div className='flex gap-16'>
                            <div className="hidden sm:inline-flex items-center justify-center w-36 h-36 border rounded">
                                <img
                                    src={profile?.logo ? `/storage/images/logo/${profile.logo}` : company_logo}
                                    alt={company_name}
                                    className="object-cover"
                                    style={{ maxWidth: '144px', maxHeight: '144px' }} />
                            </div>
                            <div className="mt-2 flex-1">
                                <p className='text-3xl text-gray-800 font-black mb-0'>{company_name}</p>
                                <div className='flex items-center mt-2'>
                                    <p className='text-gray-600 mb-0'>Reviews
                                        <span className='mx-3 text-gray-700'>{rating_statistic.total}</span>
                                        &#10625;
                                    </p>
                                    <Status className='pl-3 text-gray-700 mb-0' rating={rating_statistic.avg} total={rating_statistic.total}/>
                                </div>
                                <div className='flex items-center mt-1'>
                                    <Rating rating={Number(rating_statistic.avg)} width='w-8' height='w-8'/>
                                    <span className='ml-4 text-gray-500'>{rating_statistic.avg}</span>
                                </div>
                                <div className='mt-2 flex items-center'>
                                    {
                                        !company_email && (
                                            <p className={`bg-red-100 py-2 px-3 rounded-sm bg-gray-100 inline-flex text-sm items-center mr-3 mb-0`}>
                                                <BsFillExclamationOctagonFill className='text-danger text-base'/>
                                                <span className='ml-3 text-gray-700 uppercase text-xs font-bold'>Unclaimed</span>
                                            </p>
                                        )
                                    }
                                    <p className={`${email_verified_at ? 'bg-green-200' : ''} m-0 py-1 px-3 rounded-sm bg-gray-100 inline-flex text-sm items-center`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="inline mr-1">
                                            <path fill={`${email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                                            <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                                        </svg>
                                        <span className='text-gray-700 uppercase text-xs font-bold'>{email_verified_at ? 'Verified Company' : 'Unverified Company'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 mb-5 md:mb-0">
                        <div className='flex w-full'>
                            <a href={`https://${website}`} target="_blank" rel="noopener noreferrer"  className='no-underline w-full p-3 border border-blue-400 rounded group hover:bg-blue-200 hover:border-blue-200'>
                                <div className='flex items-center justify-between text-sm'>
                                    <div className=''>
                                        <p className='text-blue-600 mb-1'>
                                            <FaExternalLinkAlt className='inline mr-2 text-sm group-hover:text-gray-600'/>
                                            <span className='text-sm font-bold text-blue-600 group-hover:text-gray-700'>{company_name}</span>
                                        </p>
                                        <p className='text-sm text-gray-400 mb-0'>Visit this website</p>
                                    </div>
                                    <FaArrowRight className='mr-3 text-sm group-hover:text-gray-500'/>
                                </div>
                            </a>
                        </div>
                        <div className='mt-2'>
                            <p className='text-gray-700'>
                                <LuMessagesSquare className='inline mr-3'/>
                                Replied to {rating_statistic.low_reviews.count_replies} out of {rating_statistic.low_reviews.count_reviews} negative reviews
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
