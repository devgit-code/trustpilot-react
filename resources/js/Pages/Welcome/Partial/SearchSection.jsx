import React, { useRef, useEffect, useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';

import { IoSearchOutline } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { toast, Slide  } from 'react-toastify';

import RatingAverage from '@/Components/RatingAverage';
import RatingTotal from '@/Components/RatingTotal';
import AnimateBack from '@/Components/Frontend/AnimateBack';
import company_logo from "@/../images/company-logo.png"
import backImg from "@/../images/secondbanner.jpg"


function SearchSection() {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({query:""});
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const { get } = useForm();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value)

        if(!value){
            setIsDropdownVisible(false);
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            query: value,
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if(!search) return;

        const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,}$/;
        if(!domainRegex.test(search)){
            toast.warning(
                "Wrong Domain Input!", {
                    transition: Slide,
                    hideProgressBar: true,
                }
            )
            return;
        }

        // setIsLoading(true);
        try {
            const queryString = new URLSearchParams({url:search}).toString();
            const response = await fetch(`/api/addcompany?${queryString}`);
            const data = await response.json();
            if(data.success == false){
                toast.warning(
                    "Can't reach to this domain"
                )
            }else{
                //success to redirect to company review
                get(route('reviews.company', data.message))
            }

        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            // setIsLoading(false);
        }
    }

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
            const response = await fetch(`/api/home?${queryString}`);
            const data = await response.json();

            setResults(data.companies);
            setResults2(data.categories);
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

    const handleClickSearch = () => {
        // if(filters.query)
        //     window.location.replace('/search?query=' + filters.query)
    }

    return (
        <div className="relative w-full h-[70vh] min-h-[516px] bg-[#FCFBF3]">
            {/* <div className='absolute inset-0 overflow-hidden h-full'>
                <AnimateBack />
            </div> */}

            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div className="absolute w-full h-[200%] bg-cover bg-center animate-background" style={{ backgroundImage: `url(${backImg})` }}>
                    <div className="h-full bg-green-300 opacity-15"></div>
                </div>
            </div>

            <div className="relative flex justify-center z-10 items-center h-full">
                <div className='text-center px-8'>
                    <h2 className="text-4xl font-bold text-gray-900 md:px-24 select-none">Find a company you can trust</h2>
                    <p className="text-lg text-gray-700 mt-2 select-none">Real reviews by real people.</p>

                    {/* Modal-like Ovrlay */}
                    {isDropdownVisible && (
                        <div
                            className="fixed inset-0 bg-black opacity-25 z-10"
                            onClick={() => setIsDropdownVisible(false)} // Close dropdown on overlay click
                        ></div>
                    )}

                    <div className="relative max-w-lg z-20 md:max-w-xl mx-auto">
                        <input
                            id="search"
                            type="text"
                            value={filters.query}
                            onChange={handleInputChange}
                            placeholder="Search company or category"
                            className={`w-full py-3 px-5 shadow-lg text-gray-700 ${isDropdownVisible ? ('rounded-t-[2rem] focus:border-none') : 'rounded-[2rem]'}`}
                        />
                        <button
                            onClick={handleSearch}
                            className="no-underline absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2">
                            <IoSearchOutline className='text-xl'/>
                        </button>

                        {/* Dropdown list */}
                        { isDropdownVisible && (
                            !results.length && !results2.length ? (
                                <ul className="absolute bg-white border w-full pl-0 pt-2 pb-4 rounded-b-[2rem] shadow-lg overflow-auto">
                                    <li
                                        className="p-2"
                                    >
                                        <div className='flex items-center gap-4'>
                                            <p className="text-lg w-full text-gray-800 font-bold mb-1 text-center">Press Search Icon to add domain</p>

                                            {/* <div className="flex-1 ml-4 text-left">
                                                <p className="text-lg text-gray-800 font-bold mb-1">Can't find a company?</p>
                                                <p className="text-md text-gray-800 mb-0">It might not be listed on Trustpilot yet. Add it and be the first to write a review.</p>
                                            </div>

                                            <Link href="#"
                                                className="no-underline text-blue-500 text-sm font-bold border-1 border-blue-500 px-4 py-2 rounded-full hover:border-gray-500 hover:bg-blue-200 hover:text-gray-800">
                                                Add Company
                                            </Link> */}
                                        </div>
                                    </li>
                                </ul>
                            ):(
                                <div className='absolute bg-white border w-full rounded-b-[2rem] overflow-auto pb-5'>
                                    <p className='p-2 m-0 mt-3 text-sm font-bold text-left'>companies</p>
                                    <ul className=" pl-0">
                                        {
                                            !results.length ? (
                                                <li className="p-2 cursor-pointer hover:bg-blue-100">
                                                No company
                                                </li>
                                            ):(
                                                <>
                                                {
                                                    results.map((company, index) => (
                                                        <li
                                                            key={index}
                                                            // onClick={() => handleResultClick(company.company_name)}
                                                            className="p-2 cursor-pointer hover:bg-blue-100"
                                                        >
                                                            <Link href={route('reviews.company', company.website)} className='pl-2 text-gray-900 no-underline flex justify-between'>
                                                                <div className='flex items-center'>
                                                                    <div className="relative inline-flex items-center w-12 h-12 rounded">
                                                                        <img
                                                                            src={company.profile?.img ? `/storage/images/logo/${company.profile.img}` : company_logo}
                                                                            alt={company.name}
                                                                            className="max-w-11 max-h-11 object-cover rounded" />
                                                                    </div>

                                                                    <div className='ml-3 flex flex-col justify-start'>
                                                                        <p className='text-left text-lg font-bold mb-0 text-gray-800'>
                                                                        {company.company_name}
                                                                        </p>
                                                                        <p className='text-sm mb-0'>{company.website}<span className='inline'><BsDot className='inline'/></span><RatingTotal total={company.count_reviews}/> reviews</p>
                                                                    </div>
                                                                </div>
                                                                <RatingAverage rating={company.trustscore}/>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                </>
                                            )
                                        }
                                    </ul>
                                    <p className='p-2 m-0 mt-3 text-sm font-bold text-left'>categories</p>
                                    <ul className=" pl-0">
                                        {
                                            !results2.length ? (
                                                <li className="p-2 cursor-pointer hover:bg-blue-100">
                                                No category
                                                </li>
                                            ):(
                                                <>
                                                {
                                                    results2.map((category, index) => (
                                                        <li
                                                            key={index}
                                                            // onClick={() => handleResultClick(category.name)}
                                                            className="p-2 cursor-pointer hover:bg-blue-100"
                                                        >
                                                            <Link href={category.is_category ? route('categories.show', category.slug) : route('categories.detail', {category:category.parent_category.slug, sub_category:category.slug})} className='ml-2 text-gray-900 no-underline flex items-center justify-beetween'>
                                                                <div className='flex items-center'>
                                                                    <div className="relative inline-flex items-center w-10 h-10 rounded">
                                                                        <img src={`/storage/${category.image}`}
                                                                            alt="category-logo"
                                                                            className='w-10 object-cover'
                                                                            // style={{ maxWidth: '32px', maxHeight: '32px' }}
                                                                            />
                                                                    </div>
                                                                    {/* <span className="flex items-center text-xl m-0">{category.image}</span> */}
                                                                    <div className='ml-4 text-left'>
                                                                        <p className='font-bold text-gray-800 mb-0 capitalize   '>
                                                                        {category.name}
                                                                        </p>
                                                                        <p className='mb-0 text-gray-800 text-sm'>
                                                                        The best companies in the category '{category.name}'
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                </>
                                            )
                                        }
                                    </ul>
                                    {/* <div className='px-4'>
                                    <button onClick={handleClickSearch}
                                        className='w-full p-2 text-lg no-underline rounded-full group bg-blue-500 text-gray-50 hover:bg-blue-200 hover:text-gray-700'>
                                    Show all results<span className='ml-2 text-gray-50 group-hover:text-gray-700'><BsArrowRight className='inline'/></span>
                                    </button>
                                    </div> */}
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
