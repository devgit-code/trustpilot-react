import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard.jsx'
import Pagination from '@/Components/Pagination';

// const pagination = {
//     current_page: 1, // Current page in pagination
//     last_page: 5, // Total number of pages
//     per_page: 10, // Items per page
//     total: 50, // Total number of items
//     links: {
//       first: "/api/data?page=1", // Link to the first page
//       last: "/api/data?page=5", // Link to the last page
//       next: "/api/data?page=2", // Link to the next page (null if no next page)
//       prev: null, // Link to the previous page (null if no previous page)
//     },
// }

export default function PaginationList({ pagination, reviews}) {
    return (
        <>
            {
                reviews.length === 0 && (
                    <p className='text-center text-lg font-bold text-gray-700 py-5'>There is no review.</p>
                )
            }
            {
                reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))
            }
            <Pagination
                className='mb-2 flex justify-center itmes-center'
                pagination={pagination}
                />
        </>
    )
}
