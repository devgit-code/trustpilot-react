import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

import RatingClick from '@/Components/RatingClick.jsx';
import user from '@/../images/profile-not-found.png'

export default function ClickableWrite({value}){
    const { get } = useForm();

    const handleRatingClick = (rating) => {
        get(route('reviews.evaluate', value)+'?star='+rating)
    }

    return (
        <div className="p-3 bg-white border rounded flex items-center justify-between">
            <div className='flex items-center'>
                <img src={user} className='inline w-10 h-10 rounded-full'/>
                <Link href={route('reviews.evaluate', value)} className='ml-5 no-underline hover:underline text-sm'>Write a review</Link>
            </div>
            <RatingClick onClick={handleRatingClick}/>
        </div>
    );
}
