import React from 'react';
import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Rating';
import logo from "../../../images/company-logo.png"

const ReviewCard = ({ review_id, user, rating, comment, company }) => {
  return (
    <a className="no-underline">
        <div className="bg-white text-black rounded-lg mb-5 mx-3 flex flex-col group border border-gray-200 hover:shadow-xl" style={{minWidth: '280px'}}>
            {/* User Avatar, Name, and Rating */}
            <div className="flex items-center gap-2 px-4 mt-3">
                <div className="flex items-center justify-center">
                    <UserAvatar user={user}/>
                </div>
                <div className="ml-3 ">
                    <h3 className="text-lg font-semibold mb-0">{user.name}</h3>
                    <div className="flex space-x-1">
                        <Rating rating={rating}/>
                    </div>
                </div>
            </div>

            {/* Comment Section */}
            <p className="text-gray-700 px-4 mt-3 min-h-[112px]">
                {comment.length > 100 ? `${comment.slice(0, 100)}...` : comment}
            </p>

            {/* Company Logo and Name */}
            <div className="flex items-center gap-2 border-t rounded-b text-black px-4 py-2 hover:bg-gray-100" onClick={()=>console.log('navigate===')}>
                <div className="relative inline-flex items-center w-12 h-12 border-2 bordered rounded">
                    <img src={logo} alt={company.name} className="w-12 object-cover rounded border-2 border-white" />
                </div>
                <div>
                    <h4 className="pt-1 text-sm font-semibold">{company.name}</h4>
                    <p className="text-xs text-gray-500 mb-0">{company.website}</p>
                </div>
            </div>
        </div>
    </a>

  );
};

export default ReviewCard;
