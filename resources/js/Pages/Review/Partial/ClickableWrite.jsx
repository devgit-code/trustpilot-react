import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

import RatingClick from '@/Components/RatingClick.jsx';
import user from '@/../images/profile-not-found.png'

export default function ClickableWrite({url}){
    const { get } = useForm();

    const handleRatingClick = (rating) => {
        get(url+'?star='+rating)
    }

    return (
        <div className="p-3 bg-white border rounded flex flex-col sm:flex-row gap-2 justify-between">
            <div className='flex items-center'>
                <img src={user} className='inline w-10 h-10 rounded-full'/>
                <Link href={url} className='ml-5 no-underline hover:underline text-sm'>Write a review</Link>
            </div>
            <RatingClick onClick={handleRatingClick}/>
        </div>
    );
}
