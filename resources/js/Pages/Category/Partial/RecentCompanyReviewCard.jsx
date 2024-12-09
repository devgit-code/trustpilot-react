import React from 'react';
import { Head, Link } from '@inertiajs/react';

import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Ratings';
import logo from "@/../images/company-logo.png"

const ReviewCard = ({ review_id, user, rating, comment, company, sub_cats }) => {
  return (
    <div className="bg-white text-black rounded-lg flex flex-col group border border-gray-200 hover:shadow-xl" style={{minWidth: '200px'}}>
        <Link href={"/reviews/company/" + company.name} className='no-underline'>
            <div>
                {/* Company Logo and Name */}
                <div className="text-black m-2 px-2 min-h-[120px]" >
                    <h4 className="pt-1 text-base font-bold">{company.name.length > 20 ? `${company.name.slice(0, 20)}...` : company.name}</h4>
                    <div className="flex items-center space-x-1">
                        <Rating rating={rating}/>
                        <span className='text-xs'>4.9 | 477 reviews</span>
                    </div>

                    <p className="text-gray-700 text-sm mt-2 mb-0">
                        {sub_cats.length > 40 ? `${sub_cats.slice(0, 40)}...` : sub_cats}
                    </p>
                </div>

                {/* User Avatar, Name, and Rating */}
                <div className='m-2 border rounded'>
                    <p className="text-gray-700 px-4 mt-3 text-sm">
                        5 hours ago
                    </p>
                    <div className="flex items-center px-1">
                        <div className="flex items-center justify-center">
                            <UserAvatar user={user}/>
                        </div>
                        <div className="ml-3 ">
                            <div className="flex space-x-1">
                                <Rating rating={rating}/>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 text-sm px-4 mt-3 min-h-[60px]">
                        {comment.length > 60 ? `${comment.slice(0, 60)}...` : comment}
                    </p>
                </div>

            </div>
        </Link>
    </div>

  );
};

export default ReviewCard;
