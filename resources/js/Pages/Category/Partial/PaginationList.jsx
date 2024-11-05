import React, { useState } from 'react';

import Pagination from './Pagination';
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
      { date: 'Jan 29, 2024', user: {'name':"KaRa Jason",}, rating: 5, text: 'Great craftsmanship and quality!' },
      { date: 'Nov 21, 2023', user: {'name':"TaRa Jason",}, rating: 5, text: 'Excellent engraving and service.' },
      { date: 'Aug 21, 2023', user: {'name':"SaRa Jason",}, rating: 5, text: 'Great product at a great price.' },
    ],
  },
  {
    name: 'Treetime',
    website: 'www.treetime.com',
    trustScore: 4.5,
    reviews: 1676,
    location: 'Lake Barrington, United States',
    latestReviews: [
      { date: 'Dec 15, 2023', user: {'name':"Alexandor Lemicov",}, rating: 5, text: 'Beautiful and durable Christmas trees!' },
    ],
  },
];

export default function PaginationList({ page, count }) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-2">
            <div className='mb-4 flex items center justify-between'>
                <div className='flex items-center'>
                    <p className='text-black text-sm'>{((page-1)*20+1)} - {page*20} of {count} results</p>
                </div>
                <div className='flex items-center p-2 w-96'>
                    <label className='w-16'>Sort by</label>
                    <select
                        // value={sortBy}
                        // onChange={(e) => setData('category_id', e.target.value)}
                        className="form-control ml-2"
                        style={{display:'inline-block'}}
                    >
                        <option value="relevant">Most relevant</option>
                        <option value="highest">Highest number of reviews</option>
                        <option value="recent">Most recent reviews</option>
                    </select>
                </div>
            </div>

            <div className='mb-2'>
                {/* Company List */}
                {companies.map((company, index) => (
                    <CompanyItem key={index} index={index} company={company} />
                ))}
            </div>

            <div className='mb-2 flex justify-center'>
                <Pagination
                    totalPages={10}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    />
            </div>
        </div>
    );
}
