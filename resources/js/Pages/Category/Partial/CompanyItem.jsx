import React, {useState} from 'react'
import { Head, Link } from '@inertiajs/react';

import Rating from '@/Components/Ratings';
import UserAvatar from '@/Components/UserAvatar';
import company_logo from "@/../images/company-logo.png"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import ContactPopup from './ContactPopup';

export default function CompanyItem({index, company}){
    const [expandedReview, setExpandedReview] = useState(null);

    // Toggle review expansion
    const toggleReview = (companyIndex) => {
        setExpandedReview(expandedReview === companyIndex ? null : companyIndex);
    };

    return (
        <div className="bg-white border rounded-lg mb-4 hover:shadow-md">
            <Link href={route('reviews.company', company.website)} className='no-underline'>
                <div className="flex p-3 gap-4">
                    <div className="inline-flex items-center w-20 h-20">
                        <img
                            src={company.logo ? `/storage/images/logo/${company.logo}` : company_logo}
                            alt={company.company_name}
                            className="object-cover"
                            style={{ maxWidth: '80px', maxHeight: '80px' }} />
                    </div>
                    <div className='overflow-hidden'>
                        <h3 className="text-lg text-black font-semibold m-0 break-words">{company.company_name}</h3>
                        <p className="text-sm text-gray-500 no-underline m-0 break-words">{company.website} </p>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-2 text-gray-900">
                            <Rating className="inline-flex" rating={Number(company.avg_rating)}/>
                            <span className="text-sm ml-1"> {Number(company.avg_rating).toFixed(1)} ({company.count_reviews} reviews)</span>
                        </div>
                        {/* <p className="text-sm text-gray-500 pt-2 m-0 no-underline">{company.profile_location} </p> */}
                    </div>
                </div>
            </Link>
            <div className="border-t flex justify-between items-center px-3 py-1">
                <div className='flex'>
                    <ContactPopup company={company}/>
                    <span className='ml-2 text-sm border-l text-gray-800 pl-3'>
                    {company.profile_location?.length > 60 ? `${company.profile_location.slice(0, 60)}...` : company.profile_location}
                    </span>
                </div>

                {/* <button
                    onClick={() => toggleReview(index)}
                    className="text-blue-600 focus:outline-none flex items-center"
                >
                    {expandedReview === index ? 'Hide reviews' : 'Latest reviews'}
                    {expandedReview === index ? <FaAngleUp className='ml-1 inline'/> : <FaAngleDown className='ml-1 inline'/>}
                </button> */}
            </div>

            {/* Reviews section */}
            {expandedReview === index && (
            <div className="p-4 flex lg:grid lg:grid-cols-3 lg:w-full gap-2 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                {company.latestReviews.map((review, reviewIndex) => (
                <div key={reviewIndex} className="mt-1 border rounded hover:shadow">
                    <Link href={route('reviews.detail', {website:company.website, title:review.slug})}  className='no-underline'>
                        <div className='px-4 mt-2'>
                            <p className="text-gray-700 text-sm">
                                5 hours ago
                            </p>
                            <div className="flex items-center">
                                <div className="flex items-center justify-center">
                                    <UserAvatar user={review.user}/>
                                </div>
                                <div className="ml-3 ">
                                    <div className="flex space-x-1">
                                        <Rating rating={review.rating}/>
                                        <span></span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm px-4 mt-3 min-h-[60px]">
                                {review.text.length > 60 ? `${review.text.slice(0, 60)}...` : review.text}
                            </p>
                        </div>
                    </Link>
                </div>
                ))}
            </div>
            )}
        </div>
    );
}
