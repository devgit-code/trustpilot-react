import React, { useRef, useEffect, useState } from 'react';

import { IoSearchOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

import RatingAverage from '@/Components/RatingAverage';
import RatingTotal from '@/Components/RatingTotal';
import AnimateBack from '@/Components/Frontend/AnimateBack';

import logo from '@/../images/company-logo.png'

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

const categories = [
  { icon: "🏦", label: "Bank" },
  { icon: "✈️", label: "Travel Insurance Company" },
  { icon: "🚗", label: "Car Dealer" },
  { icon: "🛋️", label: "Furniture Store" },
  { icon: "💎", label: "Jewelry Store" },
  { icon: "👕", label: "Clothing Store" },
  { icon: "💻", label: "Electronics & Technology" },
  { icon: "🏋️", label: "Fitness and Nutrition Service" },
  { icon: "🛋️", label: "Furniture Store" },
  { icon: "💎", label: "Jewelry Store" },
  { icon: "👕", label: "Clothing Store" },
  { icon: "💻", label: "Electronics & Technology" },
  { icon: "🏋️", label: "Fitness and Nutrition Service" },
  // Add more items as needed
];

function SearchSection() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            // Filter items based on the query
            const filteredResults = companies.filter((company) =>
                company.name.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
            const filteredResults2 = categories.filter((category) =>
                category.label.toLowerCase().includes(value.toLowerCase())
            );
            setResults2(filteredResults2);
            setIsDropdownVisible(true);
        } else {
            setResults([]);
            setResults2([]);
            setIsDropdownVisible(false);
        }
    };

    const handleResultClick = (name) => {
        setQuery(name);
        setIsDropdownVisible(false);
    };

    const handleClickSearch = () => {
        if(query)
            window.location.replace('/search?query=' + query)
    }

    return (
        <div className="relative w-full h-[70vh] min-h-[516px] bg-[#FCFBF3] z-20">
            <div className='absolute inset-0 overflow-hidden'>
                <AnimateBack />
            </div>

            <div className="relative flex justify-center items-center h-full">
                <div className='text-center px-8'>
                    <h2 className="text-4xl font-bold text-gray-900 md:px-24 select-none">Find a company you can trust</h2>
                    <p className="text-lg text-gray-600 mt-2 select-none">Real reviews by real people.</p>

                    {/* Modal-like Overlay */}
                    {isDropdownVisible && (
                        <div
                        className="fixed inset-0 bg-black opacity-25 z-10"
                        onClick={() => setIsDropdownVisible(false)} // Close dropdown on overlay click
                        ></div>
                    )}

                    <div className="relative max-w-lg z-20 md:max-w-xl mx-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search company or category"
                            className={`w-full py-3 px-5 shadow-lg text-gray-700 ${isDropdownVisible ? ('rounded-t-[2rem] focus:border-none') : 'rounded-[2rem]'}`}
                        />
                        <button onClick={handleClickSearch}
                            className="no-underline absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2">
                            <IoSearchOutline className='text-xl'/>
                        </button>

                        {/* Dropdown list */}
                        { isDropdownVisible && (
                            !results.length || !results2.length ? (
                                <ul className="absolute bg-white border w-full pl-0 pt-2 pb-4 rounded-b-[2rem] shadow-lg overflow-auto">
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
                                </ul>
                            ):(
                                <div className='absolute bg-white border w-full rounded-b-[2rem] overflow-auto pb-5'>
                                    <p className='p-2 m-0 mt-3 text-sm font-bold text-left'>companies</p>
                                    <ul className=" pl-0">
                                        {
                                        results.slice(0,5).map((company, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleResultClick(company.name)}
                                                className="p-2 cursor-pointer hover:bg-blue-100"
                                            >
                                                <a href={'/reviews/company/' + company.name} className='pl-2 text-gray-900 no-underline flex justify-between'>
                                                    <div className='flex items-center'>
                                                        <div className="relative inline-flex items-center w-12 h-12 rounded">
                                                            <img src={logo} alt={company.name} className="w-12 object-cover rounded" />
                                                        </div>

                                                        <div className='ml-3 flex flex-col justify-start'>
                                                            <p className='text-left text-lg font-bold mb-0 text-gray-800'>
                                                            {company.name}
                                                            </p>
                                                            <p className='text-sm mb-0'>{company.website}<span className='inline'><BsDot className='inline'/></span><RatingTotal total={company.totalReviews}/> reviews</p>
                                                        </div>
                                                    </div>
                                                    <RatingAverage rating={company.averageReview}/>
                                                </a>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                    <p className='p-2 m-0 mt-3 text-sm font-bold text-left'>categories</p>
                                    <ul className=" pl-0">
                                        {
                                        results2.slice(0,3).map((category, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleResultClick(category.label)}
                                                className="p-2 cursor-pointer hover:bg-blue-100"
                                            >
                                                <a href={'/categories/' + category.label} className='ml-2 text-gray-900 no-underline flex items-center justify-beetween'>
                                                    <div className='flex items-center'>
                                                        <span className="flex items-center text-xl m-0">{category.icon}</span>
                                                        <div className='ml-4 text-left'>
                                                            <p className='font-bold text-gray-800 mb-0'>
                                                            {category.label}
                                                            </p>
                                                            <p className='mb-0 text-gray-800 text-sm'>
                                                            The best companies in the category '{category.label}'
                                                            </p>
                                                        </div>
                                                    </div>

                                                </a>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                    <div className='px-4'>
                                    <button onClick={handleClickSearch}
                                        className='w-full p-2 text-lg no-underline rounded-full group bg-blue-500 text-gray-50 hover:bg-blue-200 hover:text-gray-700'>
                                    Show all results<span className='ml-2 text-gray-50 group-hover:text-gray-700'><BsArrowRight className='inline'/></span>
                                    </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchSection;
