import React, { useState } from 'react';
import { Link } from '@inertiajs/react'

import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft , MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({ className, pagination }) {
    const { current_page, last_page, links } = pagination;

    return (
        <div className={`${className} `}>
            {/* Previous Button */}
            <Link
                href={current_page > 1 ? links.first : '#'}
                onClick={(e) => current_page === 1 && e.preventDefault()}
                className={`py-2 px-3 no-underline text-sm rounded-l-md border bg-gray-50 ${current_page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardDoubleArrowLeft className='inline'/>
            </Link>
            <Link
                href={links.prev || "#"}
                onClick={(e) => !links.prev && e.preventDefault()}
                className={`py-2 px-3 no-underline text-sm border bg-gray-50 ${!links.prev ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardArrowLeft className='inline'/>
            </Link>

            <span className="px-4 py-2 text-gray-700 rounded">
                Page {current_page} of {last_page}
            </span>

            <Link
                href={links.next || "#"}
                onClick={(e) => !links.next && e.preventDefault()}
                className={`py-2 px-3 no-underline text-sm border bg-gray-50 ${!links.next ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardArrowRight className='inline'/>
            </Link>
            <Link
                href={current_page < last_page ? links.last : '#'}
                onClick={(e) => current_page === last_page && e.preventDefault()}
                className={`py-2 px-3 no-underline text-sm rounded-r-md border bg-gray-50 ${current_page === last_page ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
                <MdKeyboardDoubleArrowRight className='inline'/>
            </Link>
        </div>
    );
}
