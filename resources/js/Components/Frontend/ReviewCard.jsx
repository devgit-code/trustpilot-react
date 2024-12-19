import React from 'react';
import { Link, usePage, } from '@inertiajs/react';

import company_logo from "@/../images/company-logo.png"
import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Ratings';

const ReviewCard = ({ id, user, rating, description, company }) => {
    return (
        <div className="bg-white text-black rounded-lg mb-5 flex flex-col group border border-gray-200 hover:shadow-xl" style={{minWidth: '250px'}}>
            <Link href={route('reviews.detail', id)} className='no-underline'>
                {/* User Avatar, Name, and Rating */}
                <div className="flex items-center gap-2 px-4 mt-3">
                    <div className="flex items-center justify-center">
                        <UserAvatar user={user} avatar={user.profile?.image}/>
                    </div>
                    <div className="ml-3 ">
                        <h3 className="text-lg font-semibold text-gray-600 mb-0 capitalize">{user.name.length > 12 ? `${user.name.slice(0, 12)}...` : user.name}</h3>
                        <div className="flex space-x-1">
                            <Rating rating={rating}/>
                        </div>
                    </div>
                </div>

                {/* description Section */}
                <p className="text-gray-700 px-4 mt-3 min-h-[120px]">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>
            </Link>

            {/* Company Logo and Name */}
            <Link href={route('reviews.company', company.website)} className="no-underline flex items-center gap-2 border-t rounded-b text-black px-4 py-2 hover:bg-gray-100">
                <div className="relative inline-flex items-center justify-center w-12 h-12 border-2 bordered rounded">
                    <img src={company?.logo ? `/storage/images/logo/${company.logo}` : company_logo} alt={company.name} className="max-w-11 max-h-11 object-cover" />
                </div>
                <div>
                    <h4 className="pt-1 text-sm font-semibold">{company.name.length > 18 ? `${company.name.slice(0, 18)}...` : company.name}</h4>
                    <p className="text-xs text-gray-500 mb-0">{company.website.length > 26 ? `${company.website.slice(0, 26)}...` : company.website}</p>
                </div>
            </Link>
        </div>
    );
};

export default ReviewCard;
