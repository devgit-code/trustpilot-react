import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs"
import { LuMessagesSquare } from "react-icons/lu";
import Rating from '@/Components/Ratings';

export default function ProductHeader({company, product}) {
    return (
        <div className='p-2 bg-whtie border-b'>
            <div className='container-lg'>
                <div className='mt-2 flex items-center'>
                    {
                        company.primary_business_category && (
                            <>
                                <div className='flex items-center'>
                                    <Link href={route('categories.show', company.primary_business_category.sub_category.category.id)}
                                        className='text-gray-800 text-sm capitalize no-underline hover:underline mr-3'>
                                        {company.primary_business_category.sub_category.category.name}
                                    </Link>
                                    &gt;
                                </div>
                                <Link href={route('categories.detail', company.primary_business_category.sub_category.id)}
                                    className='text-gray-700 text-sm capitalize no-underline hover:underline mx-2'>
                                    {company.primary_business_category.sub_category.name}
                                </Link>
                                &gt;
                                <Link href={route('reviews.company', company.website)}
                                    className='text-gray-700 text-sm capitalize no-underline hover:underline mx-2'>
                                    {company.company_name}
                                </Link>
                            </>
                        )
                    }
                </div>
                <div className='mt-3 grid md:grid-cols-[2fr_1fr] gap-4 grid-cols-1'>
                    <div className="p-2">
                        <div className='flex gap-16'>
                            <div className="hidden sm:inline-flex items-center justify-center w-36 h-36 border rounded">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="object-cover"
                                    style={{ maxWidth: '140px', maxHeight: '140px' }} />
                            </div>
                            <div className="mt-2 flex-1">
                                <p className='text-3xl text-gray-800 font-black mb-0 capitalize'>{product.name}</p>
                                <div className='flex items-center mt-4'>
                                    <Rating rating={Number(company.rating_statistic.avg)} width='w-8' height='w-8'/>
                                    <span className='ml-4 text-gray-500'>{company.rating_statistic.avg} / {company.rating_statistic.total} reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 mb-5 md:mb-0">
                        <div className='flex w-full'>
                            <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer"  className='no-underline w-full p-3 border border-blue-400 rounded group hover:bg-blue-200 hover:border-blue-200'>
                                <div className='flex items-center justify-between text-sm'>
                                    <div className=''>
                                        <p className='text-blue-600 mb-1'>
                                            <FaExternalLinkAlt className='inline mr-2 text-sm group-hover:text-gray-600'/>
                                            <span className='text-sm font-bold text-blue-600 group-hover:text-gray-700'>{company.company_name}</span>
                                        </p>
                                        <p className='text-sm text-gray-400 mb-0'>Visit this website</p>
                                    </div>
                                    <FaArrowRight className='mr-3 text-sm group-hover:text-gray-500'/>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
