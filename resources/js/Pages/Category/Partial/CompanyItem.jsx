import React, {useState} from 'react'

import Rating from '@/Components/Rating';
import UserAvatar from '@/Components/UserAvatar';
import logo from '@/../images/company-logo.png';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import ContactPopup from './ContactPopup';
import ReviewCard from './RecentCompanyReviewCard.jsx';

export default function CompanyItem({index, company}){
    const [expandedReview, setExpandedReview] = useState(null);

    // Toggle review expansion
    const toggleReview = (companyIndex) => {
        setExpandedReview(expandedReview === companyIndex ? null : companyIndex);
    };

    return (
        <div className="bg-white border rounded-lg mb-4 hover:shadow-md">
            <a href="#" className='no-underline'>
                <div className="flex p-3 gap-4">
                    <div className="inline-flex items-center w-20 h-20">
                        <img src={logo} alt={company.name} className="w-20 object-cover" />
                    </div>
                    <div className=''>
                        <h3 className="text-lg text-black font-semibold m-0">{company.name}</h3>
                        <p className="text-sm text-gray-500 no-underline m-0">{company.website} </p>
                        <div className="flex items-center mt-2 text-gray-900">
                            <Rating className="inline-flex" rating={company.trustScore}/>
                            <span className="text-sm ml-1">Trustscore {company.trustScore} |</span>
                            <span className="text-sm ml-2">{company.reviews} reviews</span>
                        </div>
                        <p className="text-sm text-gray-500 pt-2 m-0 no-underline">{company.location} </p>
                    </div>
                </div>
            </a>
            <div className="border-t flex justify-between items-center px-3 py-1">
                <div className='flex items-center'>
                    <ContactPopup />
                    <span className='ml-2 text-sm border-l text-gray-900 pl-3'>
                    {company.location.length > 15 ? `${company.location.slice(0, 15)}...` : company.location}
                    </span>
                </div>

                <button
                    onClick={() => toggleReview(index)}
                    className="text-blue-600 focus:outline-none flex items-center"
                >
                    {expandedReview === index ? 'Hide reviews' : 'Latest reviews'}
                    {expandedReview === index ? <FaAngleUp className='ml-1 inline'/> : <FaAngleDown className='ml-1 inline'/>}
                </button>
            </div>

            {/* Reviews section */}
            {expandedReview === index && (
            <div className="p-4 flex lg:grid lg:grid-cols-3 lg:w-full gap-2 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                {company.latestReviews.map((review, reviewIndex) => (
                <div key={reviewIndex} className="mt-1 border rounded hover:shadow">

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

                </div>
                ))}
            </div>
            )}
        </div>
    );
}
