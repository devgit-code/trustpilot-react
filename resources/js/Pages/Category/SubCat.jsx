import React, { useState } from 'react';

// Dummy data for companies
const companies = [
  {
    name: 'Crystal Imagery Inc.',
    trustScore: 4.9,
    reviews: 2358,
    location: 'York Springs, United States',
    latestReviews: [
      { date: 'Jan 29, 2024', initials: 'KI', rating: 5, text: 'Great craftsmanship and quality!' },
      { date: 'Nov 21, 2023', initials: 'TJ', rating: 5, text: 'Excellent engraving and service.' },
      { date: 'Aug 21, 2023', initials: 'S', rating: 5, text: 'Great product at a great price.' },
    ],
  },
  {
    name: 'Treetime',
    trustScore: 4.5,
    reviews: 1676,
    location: 'Lake Barrington, United States',
    latestReviews: [
      { date: 'Dec 15, 2023', initials: 'AL', rating: 5, text: 'Beautiful and durable Christmas trees!' },
    ],
  },
];

export default function CompanyListing() {
    const [selectedRating, setSelectedRating] = useState('Any');
    const [expandedReview, setExpandedReview] = useState(null);

    // Handle rating click to filter companies
    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    // Toggle review expansion
    const toggleReview = (companyIndex) => {
        setExpandedReview(expandedReview === companyIndex ? null : companyIndex);
    };

    // Filtering logic based on rating
    const filteredCompanies = companies.filter((company) => {
        if (selectedRating === 'Any') return true;
        return company.trustScore >= parseFloat(selectedRating);
    });

    return (
        <div className="flex gap-4 p-4">
        {/* Sidebar Filters */}
        <aside className="w-1/4 bg-gray-50 p-4 rounded-lg border">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>

            {/* Rating Filter */}
            <div className="mb-6">
            <h3 className="font-semibold text-sm">Rating</h3>
            <div className="flex mt-2 space-x-2">
                {['Any', '3.0', '4.0', '4.5'].map((rating) => (
                <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className={`py-2 px-4 text-sm rounded-md border ${selectedRating === rating ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700'} focus:outline-none`}
                >
                    {rating === 'Any' ? 'Any' : `★ ${rating}+`}
                </button>
                ))}
            </div>
            </div>

            {/* Company Status Filter */}
            <div className="mb-6">
            <h3 className="font-semibold text-sm">Company Status</h3>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="verified" className="mr-2" />
                <label htmlFor="verified" className="text-gray-700">Verified</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="claimed" className="mr-2" />
                <label htmlFor="claimed" className="text-gray-700">Claimed</label>
            </div>
            </div>
        </aside>

        {/* Company List */}
        <div className="w-3/4 space-y-4">
            {filteredCompanies.map((company, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 shadow">
                <div className="flex justify-between">
                <div>
                    <h3 className="text-xl font-semibold">{company.name}</h3>
                    <p className="text-gray-500">{company.location}</p>
                    <div className="flex items-center mt-2">
                    <span className="text-green-600 font-semibold">{company.trustScore}</span>
                    <span className="text-gray-400 ml-1">TrustScore</span>
                    <span className="text-gray-500 ml-2">| {company.reviews} reviews</span>
                    </div>
                </div>
                <button
                    onClick={() => toggleReview(index)}
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    {expandedReview === index ? 'Hide reviews' : 'Latest reviews'}
                </button>
                </div>

                {/* Reviews section */}
                {expandedReview === index && (
                <div className="mt-4">
                    {company.latestReviews.map((review, reviewIndex) => (
                    <div key={reviewIndex} className="border-t pt-3 mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                        <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">{review.initials}</span>
                        <div>
                            <p className="font-semibold text-gray-800">★ {review.rating}</p>
                            <p>{review.date}</p>
                        </div>
                        </div>
                        <p className="mt-2 text-gray-700">{review.text}</p>
                    </div>
                    ))}
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    );
}
