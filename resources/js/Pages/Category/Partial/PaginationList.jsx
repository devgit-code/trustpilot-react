import React, { useState } from 'react';

import Pagination from '@/Components/Pagination';
import CompanyItem from './CompanyItem';

// Dummy data for companies
const companies = [
    {
        name: 'Crystal Imagery Inc.',
        website: 'crystalimagery.com',
        trustScore: 4.9,
        reviews: 2358,
        location: 'York Springs, United States',
        latestReviews: [
        { review_id:1, date: 'Jan 29, 2024', user: {'name':"KaRa Jason",}, rating: 5, text: 'Great craftsmanship and quality!' },
        { review_id:4, date: 'Nov 21, 2023', user: {'name':"TaRa Jason",}, rating: 5, text: 'Excellent engraving and service.' },
        { review_id:5, date: 'Aug 21, 2023', user: {'name':"SaRa Jason",}, rating: 5, text: 'Great product at a great price.' },
        ],
    },
    {
        name: 'Treetime',
        website: 'www.treetime.com',
        trustScore: 4.5,
        reviews: 1676,
        location: 'Lake Barrington, United States',
        latestReviews: [
        { review_id:9, date: 'Dec 15, 2023', user: {'name':"Alexandor Lemicov",}, rating: 5, text: 'Beautiful and durable Christmas trees!' },
        ],
    },
];

export default function PaginationList({ pagination,  companies}) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-2">
            <div className='mb-2'>
                {/* Company List */}
                {companies.map((company, index) => (
                    <CompanyItem key={index} index={index} company={company} />
                ))}
            </div>

            <Pagination
                className='mb-2 flex justify-center itmes-center'
                totalPages={1}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                />
        </div>
    );
}
