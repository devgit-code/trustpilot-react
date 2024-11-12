import React, { useRef, useEffect, useState } from 'react';
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { BsDot } from "react-icons/bs";

import RatingAverage from '@/Components/RatingAverage';
import RatingTotal from '@/Components/RatingTotal';

const companies = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    logo: "https://via.placeholder.com/100", // Placeholder for a logo image
    website: "https://techsolutions.com",
    totalReviews: 221334,
    averageReview: 4.5,
  },
  {
    id: 2,
    name: "Green Energy Co.",
    logo: "https://via.placeholder.com/100",
    website: "https://greenenergyco.com",
    totalReviews: 15217,
    averageReview: 4.2,
  },
  {
    id: 3,
    name: "FinServ Corporation",
    logo: "https://via.placeholder.com/100",
    website: "https://finservcorp.com",
    totalReviews: 312,
    averageReview: 3.8,
  },
  {
    id: 4,
    name: "EduNext Academy",
    logo: "https://via.placeholder.com/100",
    website: "https://edunextacademy.com",
    totalReviews: 89,
    averageReview: 4.7,
  },
  {
    id: 5,
    name: "Healthify Plus",
    logo: "https://via.placeholder.com/100",
    website: "https://healthifyplus.com",
    totalReviews: 410,
    averageReview: 4.9,
  },
  {
    id: 6,
    name: "6 Academy",
    logo: "https://via.placeholder.com/100",
    website: "https://edunextacademy.com",
    totalReviews: 69,
    averageReview: 2.7,
  },
  {
    id: 7,
    name: "7 Plus",
    logo: "https://via.placeholder.com/100",
    website: "https://healthifyplus.com",
    totalReviews: 10,
    averageReview: 3.9,
  },
  {
    id: 8,
    name: "8 Academy",
    logo: "https://via.placeholder.com/100",
    website: "https://edunextacademy.com",
    totalReviews: 9,
    averageReview: 4.6,
  },
  {
    id: 9,
    name: "0 Plus",
    logo: "https://via.placeholder.com/100",
    website: "https://healthifyplus.com",
    totalReviews: 40,
    averageReview: 4.5,
  },
];

function SearchSection() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

console.log('herer+++++', results);
        if (value) {
            // Filter items based on the query
            const filteredResults = companies.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
            setIsDropdownVisible(true);
        } else {
            setResults([]);
            setIsDropdownVisible(false);
        }
    };

    const handleResultClick = (name) => {
        setQuery(name);
        setIsDropdownVisible(false);
    };

    return (
        <div className="relative flex items-center justify-center h-[45vh] min-h-[331px] bg-[#9FF6D3] p-2">
            {/* Central text and input */}
            <div className="text-center z-10 ">
                <h2 className="text-4xl font-extrabold text-gray-900 md:px-16 select-none">Share your experience</h2>
                <p className="text-lg mt-3 text-black font-bold mt-2 select-none">Help others make the right choice.</p>

                {/* Modal-like Overlay */}
                {isDropdownVisible && (
                    <div
                    className="fixed inset-0 bg-black opacity-25 z-10"
                    onClick={() => setIsDropdownVisible(false)} // Close dropdown on overlay click
                    ></div>
                )}

                <div className="relative my-3 max-w-lg md:max-w-xl mx-auto z-20">
                    <button className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-none text-gray-700 rounded-full p-2">
                        <IoSearchOutline className='text-xl'/>
                    </button>
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Find a company to review"
                        className={`w-full py-3 px-5  shadow-lg text-gray-700 ${isDropdownVisible ? ('rounded-t-[2rem] focus:border-none') : 'rounded-[2rem]'} `}
                    />
                    {/* Dropdown list */}
                    {isDropdownVisible && (
                        <ul className="absolute z-20 bg-white border w-full pl-0 pt-2 pb-4 rounded-b-[2rem] shadow-lg overflow-auto">
                            {!results.length ? (
                                <li
                                    className="p-2"
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className="flex-1 ml-4 text-left">
                                            <p className="text-lg text-gray-800 font-bold mb-1">Can't find a company?</p>
                                            <p className="text-md text-gray-800 mb-0">It might not be listed on Trustpilot yet. Add it and be the first to write a review.</p>
                                        </div>

                                        <a href="#"
                                            className="no-underline text-blue-500 text-sm font-bold border-1 border-blue-500 px-4 py-2 rounded-full hover:border-gray-500 hover:bg-blue-200 hover:text-gray-800">
                                            Add Company
                                        </a>
                                    </div>
                                </li>
                            ):(
                                <>
                                {
                                results.slice(0,5).map((company, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleResultClick(company.name)}
                                        className="p-3 cursor-pointer hover:bg-blue-100"
                                    >
                                        <a href={'/reviews/company/' + company.name} className='text-gray-900 no-underline flex justify-between'>
                                            <div className='flex flex-col justify-start'>
                                                <p className='text-left text-lg font-bold mb-0 text-gray-800'>
                                                {company.name}
                                                </p>
                                                <p className='text-sm mb-0'>{company.website}<span className='inline'><BsDot className='inline'/></span><RatingTotal total={company.totalReviews}/> reviews</p>
                                            </div>
                                            <RatingAverage rating={company.averageReview}/>
                                        </a>
                                    </li>
                                ))
                                }
                                </>
                            )}
                        </ul>
                    )}

                    {query && (
                        <button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-none text-gray-700 rounded-full p-2"
                            onClick={()=>handleResultClick("")}>
                            <IoClose className='text-xl'/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchSection;
