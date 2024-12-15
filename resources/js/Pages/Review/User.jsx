import { Head, Link } from '@inertiajs/react';
import React, {useState} from 'react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import ReviewCard from './Partial/ReviewCard.jsx'
import UserAvatar from '@/Components/UserAvatar';
import Pagination from '@/Components/Pagination';


export default function Detail({data}) {
    const [currentPage, setCurrentPage] = useState(0)
    return (
        <>
            <FrontendLayout>
                <Head title={data.user.name} />

                <div className='bg-whtie border-b '>
                    <div className='container-sm p-4'>
                        <div className='mt-3 flex items-center'>
                            <UserAvatar user={data.user} avatar={data.userinfo.avatar} width='5rem' height='5rem'/>
                            <div className='ml-5'>
                                <p className='text-gray-800 text-2xl font-extrabold'>
                                    {data.user.name}
                                </p>
                                <p className='mb-0 text-gray-700 capitalize'>{data.userinfo.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm flex justify-center'>
                        <div className='mt-3 grid gap-5 mb-5'>
                            {
                                data.reviews.map((review, index) => (
                                    <div key={index} className='max-w-screen-sm '>
                                        <p className='p-2 text-sm text-gray-700'>Review of
                                            <Link href={route('reviews.company', review.business_id)} className='ml-2 hover:no-underline'>{review.business_name}</Link>
                                        </p>

                                        <div className='mt-3'>
                                            <ReviewCard review={review}/>
                                        </div>
                                    </div>
                                ))
                            }

                            <Pagination
                                className='mb-2 flex justify-center itmes-center'
                                totalPages={1}
                                currentPage={1}
                                onPageChange={(page) => setCurrentPage(page)}
                                />
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
