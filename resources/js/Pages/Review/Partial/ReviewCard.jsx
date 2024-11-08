import React from 'react';

import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Rating';
import { FaRegThumbsUp, FaShareAlt, FaFlag, FaMapMarkerAlt, FaReply, FaCheckCircle } from 'react-icons/fa';

export default function ReviewCard({review}) {
    return (
        <div className='p-4 bg-white border rounded'>
            <div className='py-3 border-b border-b-2 flex items-center'>
                <UserAvatar user={review.user} width='3rem' height='3rem'/>
                <div className='ml-3'>
                    <a href="#" className='no-underline text-gray-800 text-sm font-bold'>
                        {review.user.name}
                    </a>
                    <div className='flex items-center mt-1'>
                        <p className='mb-0 text-gray-700 text-sm'>{review.user.reviews} review</p>
                        <p className='mb-0 text-gray-700 ml-4 flex items-center'><FaMapMarkerAlt className='inline mr-2'/>{review.user.location}</p>
                    </div>
                </div>
            </div>

            <div className='py-2 border-b border-b-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Rating className="inline-flex" rating={review.rating}/>
                        {
                            review.company.is_verified ? (
                                <div className='ml-3 flex items-center'>
                                    <FaCheckCircle className='text-gray-500'/>
                                    <p className='ml-1 mb-0'>Verified</p>
                                </div>
                            ):(
                                <></>
                            )
                        }
                    </div>
                    <p className='mb-0 text-sm'>A day ago</p>
                </div>
                <div className='mt-3'>
                    <a href={"/reviews/review/" + review.review_id} className='block text-gray-700 text-xl font-bold p-2 no-underline hover:underline'>{review.title}</a>
                    <pre className="text-black whitespace-pre-wrap font-medium">{review.comment}</pre>
                </div>
                <p className='text-sm text-gray-800'><span className='text-gray-800 font-bold mr-2'>Date of experience:</span>{review.date}</p>
            </div>
            <div className='flex items-center justify-between mt-2'>
                <div className='flex gap-9'>
                    <button className='flex items-center text-gray-400'><FaRegThumbsUp className='inline mr-2'/>Useful</button>
                    <button className='flex items-center text-gray-400'><FaShareAlt className='inline mr-2'/>Share</button>
                </div>

                <button className='flex items-center text-gray-600'><FaFlag className='inline italic'/></button>
            </div>
            {
                review.reply.length ? (
                <div className='mt-3 bg-[#F1F1E8] rounded-lg border-l-4 p-3 border-blue-500 flex'>
                    <div><FaReply className='text-gray-700 mt-1'/></div>
                    <div className='ml-3 flex-grow'>
                        <div className='flex items-center justify-between'>
                            <a className='text-sm text-gray-800 font-bold no-underline'>
                            Reply from {review.company.name}
                            </a>
                            <p className='mb-0 text-sm'>
                            Updated 7 hours ago
                            </p>
                        </div>

                        <pre className="mt-3 text-black text-sm whitespace-pre-wrap font-medium">{review.reply[0].comment}</pre>
                    </div>
                </div>
                ):(
                    <></>
                )
            }
        </div>
    )
}
