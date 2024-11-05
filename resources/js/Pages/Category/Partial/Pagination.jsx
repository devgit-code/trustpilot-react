import React, { useState } from 'react';

export default function Pagination({ totalPages = 10, currentPage = 1, onPageChange }) {
    const [page, setPage] = useState(currentPage);

    const handlePageClick = (pageNum) => {
        setPage(pageNum);
        if (onPageChange) onPageChange(pageNum);
    };

    const handlePreviousClick = () => {
        if (page > 1) {
        handlePageClick(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < totalPages) {
        handlePageClick(page + 1);
        }
    };

    return (
        <div className="flex items-center">
            {/* Previous Button */}
            <button
                onClick={handlePreviousClick}
                disabled={page === 1}
                className={`py-2 px-4 text-sm rounded-l-md border ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`p-2 px-3 text-sm border ${page === pageNum ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                {pageNum}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={handleNextClick}
                disabled={page === totalPages}
                className={`py-2 px-4 text-sm rounded-r-md border ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                Next page
            </button>
        </div>
    );
}
