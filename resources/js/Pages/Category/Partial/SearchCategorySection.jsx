import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

import { IoSearchOutline, IoClose } from "react-icons/io5";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

function SearchSection() {
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

    const handleResultClick = (result) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            query: result,
        }));
        setIsDropdownVisible(false);
    };

    // Fetch reviews from the API
    const fetchReviews = async () => {
        if(!filters.query) return;
        setIsDropdownVisible(true);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/categories?${queryString}`);
            const data = await response.json();
            setResults(data.categories);
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
        <div className="relative flex items-center justify-center h-[45vh] min-h-[331px] bg-[#F1F1E8] p-2">
            {/* Central text and input */}
            <div className="text-center z-10">
                <h2 className="text-4xl font-bold text-gray-900 md:px-16 pb-3">What are you looking for?</h2>

                {/* Modal-like Overlay */}
                {isDropdownVisible && (
                    <div
                    className="fixed inset-0 bg-black opacity-25 z-10"
                    onClick={() => setIsDropdownVisible(false)} // Close dropdown on overlay click
                    ></div>
                )}

                <div className="relative max-w-lg md:max-w-xl mx-auto z-20">
                    <button className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-none text-gray-700 rounded-full p-2">
                        <IoSearchOutline className='text-xl'/>
                    </button>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search"
                        value={filters.query}
                        onChange={handleInputChange}
                        className={`w-full py-3 px-5 rounded-2 text-gray-700 focus:outline-none ${isDropdownVisible && ('outline-b-none')}`}
                    />

                    {/* Dropdown list */}
                    {isDropdownVisible && (
                        <ul className="absolute z-20 bg-white border border-gray-300 w-full px-4 py-2 mt-px rounded-b-md shadow-lg overflow-auto">
                            {!results.length ? (
                                <li
                                    className="p-2"
                                >
                                    No result
                                </li>
                            ):(
                                <>
                                {
                                results.map((result, index) => (
                                    <li
                                        key={index}
                                        // onClick={() => handleResultClick(result.name)}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        <Link href={result.is_category ? route('categories.show', result.id) : route('categories.detail', result.id)} className='text-gray-900 no-underline flex items-center justify-beetween'>
                                            <div className='flex items-center'>
                                                <span><HiOutlineArrowTopRightOnSquare /></span>
                                                <p className='ml-4 mb-0 text-gray-800 capitalize'>
                                                {result.name}
                                                </p>
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
