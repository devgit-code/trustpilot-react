import React from 'react';
import { Head, Link } from '@inertiajs/react';

import moment from 'moment';
import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Ratings';
import logo from "@/../images/company-logo.png"

const ReviewCard = ({ id, user, rating, reply, company, description, date_experience, trustscore, count_reviews }) => {

  return (
    <div className="bg-white text-black rounded-lg flex flex-col group border border-gray-200 hover:shadow-xl" style={{minWidth: '200px'}}>
        <Link href={route('reviews.detail', id)} className='no-underline'>
            <div>
                {/* Company Logo and Name */}
                <div className="text-black m-2 px-2 min-h-[120px]" >
                    <h4 className="pt-1 text-base font-bold">{company.name.length > 20 ? `${company.name.slice(0, 20)}...` : company.name}</h4>
                    <div className="flex items-center space-x-1">
                        <Rating rating={Number(company.trustscore)}/>
                        <span className='text-xs'>{company.trustscore} | {company.count_reviews} reviews</span>
                    </div>

                    <p className="text-gray-700 text-sm mt-2 mb-0">
                        {description.length > 40 ? `${description.slice(0, 40)}...` : description}
                    </p>
                </div>

                {/* User Avatar, Name, and Rating */}
                <div className='m-2 border rounded min-h-[160px]'>
                    <p className="text-gray-700 px-4 mt-3 text-sm">
                        {moment(date_experience).fromNow()}
                    </p>
                    <div className="flex items-center px-1">
                        <div className="flex items-center justify-center">
                            <UserAvatar user={user} avatar={user.profile?.image}/>
                        </div>
                        <div className="ml-3 ">
                            <div className="flex space-x-1">
                                <Rating rating={rating}/>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    {
                        reply && (
                            <p className="text-gray-700 text-sm px-4 mt-3 h-[40px]">
                                {reply?.comment?.length > 50 ? `${reply.comment.slice(0, 50)}...` : reply.comment}
                            </p>
                        )
                    }
                </div>

            </div>
        </Link>
    </div>

  );
};

export default ReviewCard;
