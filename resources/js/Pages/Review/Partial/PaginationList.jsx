import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard.jsx'
import Pagination from '@/Components/Pagination';

export default function PaginationList({reviews}) {
    return (
        <>
            {
                reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))
            }
            <Pagination
                className='mb-2 flex justify-center itmes-center'
                totalPages={1}
                currentPage={1}
                onPageChange={(page) => setCurrentPage(page)}
                />
        </>
    )
}
