import React from "react";
import logo from "../../../images/company-logo.png"
import Rating from '@/Components/Rating';

function CompanyCard({ title, link, rating, reviews, is_verified}) {
    return (
        <a href={'#'} className="no-underline">
            <div className="bg-white rounded-lg p-4 mx-3 flex flex-col group border border-gray-200 hover:shadow-xl" style={{minWidth: '280px'}}>
                <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                    <img src={logo} alt={title} className="w-20 object-cover rounded border-2 border-white" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="absolute -top-2 -right-2">
                        <path fill={`${is_verified ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                        <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                    </svg>
                </div>

                <h3 className="mt-2 text-black text-lg font-semibold mb-0">{title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                    {link.replace("https://", "").replace("www.", "")}
                </p>
                <div className="flex items-center">
                    <Rating className="inline-flex" rating={rating}/>
                    <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
                    <span className="text-xs ml-2 text-gray-500">({reviews})</span>
                </div>
            </div>
        </a>
    );
}

export default CompanyCard;
