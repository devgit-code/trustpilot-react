import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import ReviewCard from './Partial/ReviewCard.jsx'

export default function Detail({review}) {
    return (
        <>
            <FrontendLayout>
                <Head title="Review" />

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm'>
                        <div className='max-w-screen-sm my-5 lg:ml-32'>
                            <p className='p-2 text-sm text-gray-700'>Review of
                                <Link href={route('reviews.company', review.business.website)} className='ml-2 hover:no-underline'>{review.business.company_name}</Link>
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
