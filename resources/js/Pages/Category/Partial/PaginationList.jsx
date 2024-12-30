import React, { useState } from 'react';

import CompanyItem from './CompanyItem';

export default function PaginationList({ companies}) {
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
        </div>
    );
}
