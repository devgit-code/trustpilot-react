import React, { useState } from 'react';
import { Link } from '@inertiajs/react'

import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft , MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({ className, pagination, onPageChange }) {
    const { current_page, last_page, links } = pagination;

    return (
        <div className={`${className} flex items-center`}>
            {/* Previous Button */}
            <button
                disabled={current_page === 1}
                onClick={() => onPageChange(1)}
                className={`py-2 px-3 no-underline text-sm rounded-l-md border bg-gray-50 ${current_page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardDoubleArrowLeft className='inline'/>
            </button>
            <button
                disabled={!links.prev}
                onClick={() => onPageChange(current_page - 1)}
                className={`py-2 px-3 no-underline text-sm border bg-gray-50 ${!links.prev ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardArrowLeft className='inline'/>
            </button>

            <span className="px-2 py-2 text-gray-700 rounded">
                Page {current_page} of {last_page}
            </span>

            <button
                disabled={!links.next}
                onClick={() => onPageChange(current_page + 1)}
                className={`py-2 px-3 no-underline text-sm border bg-gray-50 ${!links.next ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardArrowRight className='inline'/>
            </button>
            <button
                disabled={current_page === last_page}
                onClick={() => onPageChange(last_page)}
                className={`py-2 px-3 no-underline text-sm rounded-r-md border bg-gray-50 ${current_page === last_page ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardDoubleArrowRight className='inline'/>
            </button>
        </div>
    );
}
