import React, { useState } from 'react';

import Pagination from '@/Components/Pagination';
import CompanyItem from './CompanyItem';

const pagination = {
    current_page: 1, // Current page in pagination
    last_page: 5, // Total number of pages
    per_page: 10, // Items per page
    total: 50, // Total number of items
    links: {
      first: "/api/data?page=1", // Link to the first page
      last: "/api/data?page=5", // Link to the last page
      next: "/api/data?page=2", // Link to the next page (null if no next page)
      prev: null, // Link to the previous page (null if no previous page)
    },
}

export default function PaginationList({ companies}) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-2">
            <div className='mb-2'>
                {/* Company List */}
                {
                    companies.length == 0 && (
                        <p className='text-center text-gray-700 font-bold text-lg'>There is no company.</p>
                    )
                }
                {companies.map((company, index) => (
                    <CompanyItem key={index} index={index} company={company} />
                ))}
            </div>

            <Pagination
                pagination={pagination}
                className='mb-2 flex justify-center itmes-center'
                />
        </div>
    );
}
