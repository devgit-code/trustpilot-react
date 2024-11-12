import { Head } from '@inertiajs/react';
import React, {useState} from 'react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import ReviewCard from './Partial/ReviewCard.jsx'
import UserAvatar from '@/Components/UserAvatar';
import Pagination from '@/Components/Pagination';


const data = {
    user: {
        name: 'Zoey',
        location: 'US',
        reviews: '1'
    },
    reviews: [
        {
            review_id: 113,
            title:'Please dont buy this phone',
            comment:`Please, for the love of God, DO NOT BUY THIS PHONE. I'm 13 and this type of phone is the only phone I've personally had, but I'm not stupid enough to not realize how horrible it is. I've owned three, and all of them are horrible.
1. Gabb Messenger.
It's supposed to flag potentially harmful messages, which is awesome in general, but when it starts flagging kittens and a pile of books as nudity? Like come on. It's like every other image i receive is flagged. Also it sends my mom emails saying I'm sending or receiving this type of thing even when I'm not.
Twice so far with my current phone I've had to reset the settings because my Messenger was not receiving direct messages but instead made me download all of them. (Most of the time it wouldn't even let me).
I'm writing this because I've been waiting ten minutes for the messenger to load. Sure, this is the first time it's been this bad, but a lot of the times it takes at least a minute for it to load completely onto a profile so I can message someone. The same thing happens with calling. The first time I try to call someone, the call doesn't send. Then it takes it another thirty seconds to re-call them. Gabb, if someone's breaking into my house and I'm home alone unarmed, and I'm trying to call the cops, do you think the criminal will sit there waiting for 5 minutes so my phone will load, then start attacking me? I might be young, but I don't think so.
2. Turning the phone on.`,
            rating:1,
            date:'2024 October, 13',
            company: {
                name: "Gabb",
                website: "www.gabb.com",
            },
            user: {
                name: 'Zoey',
                location: 'US',
                reviews: '1'
            },
        },
    ],
}

export default function Detail() {
    const [currentPage, setCurrentPage] = useState(0)
    return (
        <>
            <FrontendLayout>
                <Head title="Write a Review" />

                <div className='bg-whtie border-b '>
                    <div className='container-sm p-4'>
                        <div className='mt-3 flex items-center'>
                            <UserAvatar user={data.user} width='5rem' height='5rem'/>
                            <div className='ml-5'>
                                <p className='text-gray-800 text-2xl font-extrabold'>
                                    {data.user.name}
                                </p>
                                <p className='mb-0 text-gray-700'>United States</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm flex justify-center'>
                        <div className='mt-3 grid gap-5 mb-5'>
                            {
                                [...Array(2)].map((_, index) => (
                                    <div key={index} className='max-w-screen-sm '>
                                        <p className='p-2 text-sm text-gray-700'>Review of
                                            <a href="#" className='ml-2 hover:no-underline'>{data.reviews[0].company.name}</a>
                                        </p>

                                        <div className='mt-3'>
                                            <ReviewCard review={data.reviews[0]}/>
                                        </div>
                                    </div>
                                ))
                            }

                            <Pagination
                                className='mb-2 flex justify-center itmes-center'
                                totalPages={3}
                                currentPage={2}
                                onPageChange={(page) => setCurrentPage(page)}
                                />
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
