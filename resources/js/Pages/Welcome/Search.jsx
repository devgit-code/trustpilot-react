import { Head } from '@inertiajs/react';
import React, { useState, useEffect, } from 'react';

import { GiBinoculars } from "react-icons/gi";
import { FaQuoteLeft } from "react-icons/fa";

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Rating from '../Category/Partial/Rating.jsx'
import Status from '../Category/Partial/CompanyStatus.jsx'
import PaginationList from '../Category/Partial/PaginationList.jsx'

const data = {
    search_categories :[
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
    ],
    search_companies :{
        total:123,
        current: 5,
        array: [
            {
                name: 'clickward',
            }
        ]
    },
    title: 'Events & Entertainment',
    slug: 'events_entertainment',
    icon: '🎤',
    items: [
        'Adult Entertainment',
        'Children’s Entertainment',
        'Clubbing & Nightlife',
        'Events & Venues',
        'Gambling',
        'Gaming',
        'Museums & Exhibits',
        'Music & Movies',
        'Theater & Opera',
        'Wedding & Party'
    ]
};

export default function Search({page=1, count=327, category_name, sub_cat}) {
    const [numberOfReviews, setNumberOfReviews] = useState("0")
    const [searchCompany, setSearchCompany] = useState("")
    const [query, setQuery] = useState('')

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get("query");
    console.log('here=======', query)
        setQuery(query);
    }, []);

    return (
        <>
            <FrontendLayout>
                <Head title='Search' />

                <div className="bg-white p-4 border-gray-200 border-b">
                    <div className='container-md'>
                        <h3 className="text-3xl font-bold tracking-wider text-gray-900 text-center  mt-5">
                        {
                            query ? (
                                <>
                                    Results for
                                    “
                                    {query}
                                    ”
                                </>
                            ):(
                                <>Find your company</>
                            )
                        }
                        </h3>

                        <div className="mt-5 p-2">
                            <p className='text-gray-800 font-bold'>Categories
                                <span className='ml-1 text-sm text-gray-700 font-normal'>({6})</span>
                            </p>
                            <div className='grid grid-cols-6 gap-4'>
                            {
                                data.search_categories.slice(0,6).map((item, index) => (
                                    <a key={index}
                                        href={"/categories/category/" + item. label}
                                        className='no-underline border hover:bg-blue-200 rounded p-2 transition ease-in-out duration-150'>
                                        <p className=''>{item.icon}</p>
                                        <p className='mt-3 mb-0 pt-2 truncate text-sm text-gray-800 overflow-hidden'>{item.label}</p>
                                    </a>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-[#FCFBF3] pt-5'>
                    <div className='container-md mx-auto row'>
                        <div className="col-lg-4 px-3 mb-5">
                            <div className='bg-white border rounded mb-4 p-4'>
                                <Rating />

                                <Status />

                                <div className='my-4'>
                                    <h3 className="font-semibold text-lg">Number of reviews</h3>

                                    <select
                                        value={numberOfReviews}
                                        onChange={(e) => setNumberOfReviews(e.target.value)}
                                        className="form-control ml-2"
                                    >
                                        <option value="0">Any</option>
                                        <option value="25">25+</option>
                                        <option value="50">50+</option>
                                        <option value="100">100+</option>
                                        <option value="250">250+</option>
                                        <option value="500">500+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 px-3 mt-3">
                            <div className='mb-4'>
                                <p className='ml-3 text-gray-800 font-bold'>Companies<span className='text-gray-500 font-normal p-2'>({count})</span></p>
                                <PaginationList page={page}/>
                            </div>

                            <div className='mb-4 flex items-start bg-emerald-400 p-4 border rounded'>
                                <span className='ml-2 text-6xl text-gray-800 bg-white p-2 rounded'><GiBinoculars /></span>

                                <div className="flex-1 ml-4 text-left">
                                    <p className="text-md text-gray-800 font-bold mb-1">Can't find a company?</p>
                                    <p className="text-sm text-gray-800">It might not be listed on Trustpilot yet. Add it and be the first to write a review.</p>
                                </div>

                                <div className='mx-2'>
                                    <input
                                        type="text"
                                        value={searchCompany}
                                        onChange={(e) => setSearchCompany(e.target.value)}
                                        placeholder="www.example.com"
                                        className="w-72 p-3 text-gray-800 rounded"
                                    />
                                    {/* <p className='mb-0 text-gray-800 text-sm mt-1'>Ooops, something went wrong</p> */}
                                </div>

                                <button className='mt-2 bg-gray-800 text-gray-50 hover:bg-emerald-200 hover:text-gray-700 rounded font-bold py-2 px-4'>Start</button>
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
