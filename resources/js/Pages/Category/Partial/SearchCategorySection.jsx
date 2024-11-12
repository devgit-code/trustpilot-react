import React, { useState } from 'react';
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

// Sample data for the dropdown list (replace this with your actual data source)
const items = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Pineapple",
    "Mango",
    "Strawberry",
    "Blueberry",
];

function SearchSection() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            // Filter items based on the query
            const filteredResults = items.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
            setIsDropdownVisible(true);
        } else {
            setResults([]);
            setIsDropdownVisible(false);
        }
    };

    const handleResultClick = (result) => {
        setQuery(result);
        setIsDropdownVisible(false);
    };

    return (
        <div className="relative flex items-center justify-center h-[45vh] min-h-[331px] bg-[#F1F1E8] p-2">
            {/* Central text and input */}
            <div className="text-center z-10">
                <h2 className="text-4xl font-bold text-gray-900 px-16 pb-3">What are you looking for?</h2>

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
                        type="text"
                        placeholder="Search"
                        value={query}
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
                                results.slice(0,5).map((result, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleResultClick(result)}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        <a href={'/categories/' + result} className='text-gray-900 no-underline flex items-center justify-beetween'>
                                            <div className='flex items-center'>
                                                <span><HiOutlineArrowTopRightOnSquare /></span>
                                                <p className='ml-4 mb-0 text-gray-800'>
                                                {result}
                                                </p>
                                            </div>

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
