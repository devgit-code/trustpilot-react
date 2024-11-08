import React, { useState, useEffect } from 'react';
import RatingClick from '@/Components/RatingClick.jsx';

import user from '@/../images/profile-not-found.png'
export default function ClickableWrite({name='eniyi'}){
    const [rating, setRating] = useState(0);

    const handleRatingClick = (rating) => {
        console.log('hrere++', rating)
    }

    return (
        <div className="p-3 bg-white border rounded flex items-center justify-between">
            <div className='flex items-center'>
                <img src={user} className='inline w-10 h-10 rounded-full'/>
                <a href="" className='ml-5 no-underline hover:underline text-sm'>Write a review</a>
            </div>
            <RatingClick onClick={handleRatingClick}/>
        </div>
    );
}
