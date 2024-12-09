import React from "react";
import { Link, usePage, } from '@inertiajs/react';

import company_logo from "@/../images/company-logo.png"
import Rating from '@/Components/Ratings';

function EvaluateCard({ id, website, name, trustscore, count_reviews, email_verified_at, logo}) {
    return (
        <Link href={route('reviews.evaluate', id)} className="no-underline">
            <div className="bg-white rounded-lg p-4 mx-3 flex flex-col group border border-gray-200 hover:shadow-xl" style={{minWidth: '240px'}}>
                <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                    <img src={logo ? `/storage/images/logo/${logo}` : company_logo} alt={name} className="w-20 object-cover rounded border-2 border-white" />
                    {/* <img src={logo} alt={name} className="w-20 object-cover rounded border-2 border-white" /> */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="absolute -top-2 -right-2">
                        <path fill={`${email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                        <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                    </svg>
                </div>

                <h3 className="mt-2 text-black text-lg font-semibold mb-0">{name}</h3>
                <p className="text-sm text-gray-500 mb-1">
                    {website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
                </p>
                <div className="flex items-center">
                    <Rating className="inline-flex" rating={trustscore}/>
                    <span className="text-sm font-semibold text-gray-700 ml-1">{trustscore}</span>
                    <span className="text-xs ml-2 text-gray-500">({count_reviews})</span>
                </div>
            </div>
        </Link>
    );
}

export default EvaluateCard;
