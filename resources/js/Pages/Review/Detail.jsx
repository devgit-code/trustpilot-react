import { Head } from '@inertiajs/react';
import React from 'react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import ReviewCard from './Partial/ReviewCard.jsx'

const review = {
    review_id: 13,
    title:'Do not use this company product',
    comment:`Quick review - Currently been waiting in the queue for a few days. Have been constantly asking for update on how much longer my order will take to complete, with no answers. Have asked to upgrade from standard delivery to express delivery to fasten the delivery time, however was told not to as my order is almost first in line. Still 24 hours later, I am still waiting with no indication of how long my order will take to complete.

If your someone who is using bot lobbies to grind camos in BO6, be wary as now I can prestige, however I cant because I will need to re-unlock guns to get headshots with them.

I would carefully consider purchasing if you are in a similar situation as me - with`,
    rating:2,
    date:'2024 November, 3',
    company: {
        name: "MitchCactus",
        website: "www.MitchCactus.com",
    },
    user: {
        name: 'Nicholas Orange',
        location: 'NZ',
        reviews: '32'
    },
    reply: [
        {
            comment: `Hey Nicholas,

We're sorry to hear about the delay and lack of communication regarding your order. We understand how frustrating it can be, especially when you're aiming to complete camo challenges before prestiging. We strive to provide updates, but high demand sometimes affects response times.

We're already on your ticket and prioritizing it. Thank you for your patience and understanding. We're committed to making this right and getting you back to your game as soon as possible.

We hope that you can update your review as it seems your bot lobbies are already in progress.

Also, your comment on Prestiging is unrelated to our services and is just apart of the mechanics of Black Ops 6. Regardless of whether you purchase Bot Lobbies or not, this is an underlying game-feature. We'll sort out your lobbies irrespectively of this though :)`,
            date: '2024-11-03'
        },
    ]
}

export default function Detail() {
    return (
        <>
            <FrontendLayout>
                <Head title="Write a Review" />

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm'>
                        <div className='max-w-screen-sm my-5 lg:ml-32'>
                            <p className='p-2 text-sm text-gray-700'>Review of
                                <a href={'/reviews/company/' + review.company.name} className='ml-2 hover:no-underline'>{review.company.name}</a>
                            </p>

                            <div className='mt-3 pb-5'>
                                <ReviewCard review={review}/>
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
