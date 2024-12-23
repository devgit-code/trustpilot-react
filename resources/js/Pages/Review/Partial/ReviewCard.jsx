import React from 'react';
import { Link, usePage } from '@inertiajs/react'

import moment from 'moment'
import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Ratings';
import { FaRegThumbsUp, FaShareAlt, FaFlag, FaMapMarkerAlt, FaReply, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ReviewCard({ review }) {
    console.log('d-------', review)
    const { auth } = usePage().props;

    const handleUseful = async (e, id) => {
        e.preventDefault()

        if(!auth.user){
            toast.error('Please login first');
            return;
        }

        try {
            const queryString = new URLSearchParams({id: id}).toString();
            const response = await fetch(`/api/reviews/useful?${queryString}`);
            const data = await response.json();

            if(data.status == 'success')
                toast.success(data.message);
            else
                toast.warning(data.message);
        } catch (error) {
            toast.error('An error occurred!');
            console.error("Error fetching reviews:", error);
        } finally {

        }
    }

    const handleFlag = async (e, id) => {
        e.preventDefault()

        if(!auth.user){
            toast.error('Please login first');
            return;
        }


        try {
            const queryString = new URLSearchParams({id: id}).toString();
            const response = await fetch(`/api/reviews/flag?${queryString}`);
            const data = await response.json();

            if(data.status == 'success')
                toast.success(data.message);
            else
                toast.warning(data.message);
        } catch (error) {
            toast.error('An error occurred!');
            console.error("Error fetching reviews:", error);
        } finally {

        }
    }

    return (
        <div className='p-4 bg-white border rounded'>
            <div className=' pb-3 border-b border-b-2 flex items-center'>
                <UserAvatar user={review.userinfo} avatar={review.userinfo.avatar} width='3rem' height='3rem'/>
                <Link href={route('reviews.user', review.userinfo.name)} className='no-underline ml-3'>
                    <p className='text-gray-800 text-sm font-bold mb-0 capitalize'>
                        {review.userinfo.name}
                    </p>
                    <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 items-center mt-1'>
                        <p className='mb-0 text-gray-700 text-sm'>{review.userinfo.count_reviews} review</p>
                        {
                            review.userinfo.location && (
                                <p className='mb-0 text-gray-700 flex items-center'><FaMapMarkerAlt className='inline mr-1'/>{review.userinfo.location}</p>
                            )
                        }
                    </div>
                </Link>
            </div>

            <div className='py-2 border-b border-b-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Rating className="inline-flex" rating={review.rating}/>
                        {/* {
                            review.business.email_verified_at ? (
                                <div className='ml-3 flex items-center'>
                                    <FaCheckCircle className='text-gray-500'/>
                                    <p className='ml-1 mb-0'>Verified</p>
                                </div>
                            ):(
                                <></>
                            )
                        } */}
                    </div>
                    <p className='mb-0 text-sm'>{moment(review.date_experience).fromNow()}</p>
                </div>
                {
                    review.is_product !== 0 && (
                        <p className='mt-2 mb-0 text-gray-700 text-base'>Review for Product: <span className='text-gray-700 font-bold underline'>{review.product?.name}</span></p>
                    )
                }

                <div className='mt-3'>
                    <div className='flex'>
                        <Link href={route('reviews.detail', {website:review.business.website, title:review.title})} className='capitalize block text-gray-700 text-xl font-bold p-2 px-4 no-underline hover:underline'>
                            {review.title}
                        </Link>
                    </div>
                    <pre className="text-black whitespace-pre-wrap font-medium min-h-16">{review.description}</pre>
                </div>
                <p className='text-sm text-gray-800'><span className='text-gray-800 font-bold mr-2'>Date of experience:</span>{moment(review.date_experience).format("MMM D, YYYY")}</p>
            </div>
            <div className='flex items-center justify-between mt-2'>
                <div className='flex gap-9'>
                    <Link
                        // href={route('reviews.review.thumbup', review.id)}
                        // method="post"
                        onClick={(e)=>handleUseful(e, review.id)}
                        as="button"
                        className="flex items-center text-gray-600"
                    ><FaRegThumbsUp className='inline mr-2'/>Useful</Link>
                    {/* <button className='flex items-center text-gray-400'><FaShareAlt className='inline mr-2'/>Share</button> */}
                </div>

                <Link
                    onClick={(e)=>handleFlag(e, review.id)}
                    as="button"
                    className="flex items-center text-gray-600"
                ><FaFlag className='inline italic'/></Link>
            </div>
            {
                review.reply?.comment.length && (
                <div className='mt-3 bg-[#F1F1E8] rounded-lg border-l-4 p-3 border-blue-500 flex'>
                    <div><FaReply className='text-gray-700 mt-1'/></div>
                    <div className='ml-3 flex-grow'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-gray-800 font-bold'>
                            Reply from <a className='text-sm text-gray-800 font-bold'>{review.business.company_name}</a>
                            </span>
                            <p className='mb-0 text-sm'>
                            Updated {moment(review.reply.updated_at).fromNow()}
                            </p>
                        </div>

                        <pre className="mt-3 text-black text-sm whitespace-pre-wrap min-h-24 font-medium">{review.reply.comment}</pre>
                    </div>
                </div>
                )
            }
        </div>
    )
}
