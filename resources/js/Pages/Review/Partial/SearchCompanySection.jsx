import React, { useRef, useEffect, useState } from 'react';
import { Link, usePage,} from '@inertiajs/react';

import { IoSearchOutline, IoClose } from "react-icons/io5";
import { BsDot } from "react-icons/bs";

import company_logo from "@/../images/company-logo.png"
import AddCompanyModal from './AddCompanyModal';
import RatingAverage from '@/Components/RatingAverage';
import RatingTotal from '@/Components/RatingTotal';

function SearchSection() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const [filters, setFilters] = useState({query:""});
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;

        if(!value){
            setIsDropdownVisible(false);
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            query: value,
        }));
    };

    const handleResultClick = (name) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            query: name,
        }));

        setIsDropdownVisible(false);
    };

    // Fetch reviews from the API
    const fetchReviews = async () => {
        if(!filters.query) return;
        setIsDropdownVisible(true);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/companies?${queryString}`);
            const data = await response.json();
            setResults(data.companies);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            // setIsDropdownVisible(false);
        }

    };

    // Fetch reviews whenever filters change
    useEffect(() => {
        fetchReviews();
    }, [filters]);

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
                        id="search"
                        type="text"
                        value={filters.query}
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

                                        <button onClick={handleOpen}
                                            className="no-underline text-gray-200 text-sm font-bold bg-blue-500 border-1 border-blue-500 px-4 py-2 rounded-full hover:border-gray-500 hover:bg-blue-300 hover:text-gray-800">
                                            Add Company
                                        </button>
                                    </div>
                                </li>
                            ):(
                                <>
                                {
                                results.slice(0,5).map((company, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleResultClick('')}
                                        className="p-3 cursor-pointer hover:bg-blue-100"
                                    >
                                        <Link href={route('reviews.evaluate', company.website)} className='text-gray-900 no-underline flex justify-between'>
                                            <div className='flex items-center gap-4 w-full'>
                                                <div className="relative inline-flex items-center w-12 h-12 rounded">
                                                    <img
                                                        src={company.logo ? `/storage/images/logo/${company.logo}` : company_logo}
                                                        alt={company.name}
                                                        className="max-w-11 max-h-11 object-cover rounded" />
                                                </div>

                                                <div className='flex flex-grow justify-between'>
                                                    <div className='flex flex-col'>
                                                        <p className='text-left text-lg font-bold mb-0 text-gray-800'>
                                                        {company.company_name}
                                                        </p>
                                                        <p className='text-sm mb-0'>
                                                            {company.website}
                                                            <span className='inline'><BsDot className='inline'/></span>
                                                            <RatingTotal total={company.count_reviews}/> reviews
                                                        </p>
                                                    </div>
                                                    <RatingAverage rating={company.trustscore}/>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                                }
                                </>
                            )}
                        </ul>
                    )}

                    {filters.query && (
                        <button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-none text-gray-700 rounded-full p-2"
                            onClick={()=>handleResultClick('')}>
                            <IoClose className='text-xl'/>
                        </button>
                    )}
                </div>
            </div>


            <AddCompanyModal
                show={open}
                onHide={handleOpen}
            />
        </div>
    );
}

export default SearchSection;
