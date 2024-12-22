import React, { useState } from 'react';

import Pagination from '@/Components/Pagination';
import CompanyItem from './CompanyItem';

export default function PaginationList({ pagination,  companies}) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-2">
            <div className='mb-2'>
                {/* Company List */}
                {
                    companies.length == 0 && (
                        <p className='text-center text-gray-700 font-bold text-lg'>No company</p>
                    )
                }
                {companies.map((company, index) => (
                    <CompanyItem key={index} index={index} company={company} />
                ))}
            </div>

            <Pagination
                className='mb-2 flex justify-center itmes-center'
                totalPages={1}
                currentPage={1}
                onPageChange={(page) => setCurrentPage(page)}
                />
        </div>
    );
}
