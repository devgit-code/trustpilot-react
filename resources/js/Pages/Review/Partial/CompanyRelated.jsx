import React, { useState } from "react";

import Rating from '@/Components/Ratings'
import logo from '@/../images/company-logo.png'
import { FaCheckCircle } from "react-icons/fa";

const companies = [
    {
        name: 'DuGood',
        rating: {
            avg: 4.7,
            total: 230
        },
        website: 'www.com',
        img: 'www.com',
    },
    {
        name: 'DuGood',
        rating: {
            avg: 4.7,
            total: 230
        },
        website: 'www.com',
        img: 'www.com',
    },
    {
        name: 'DuGood',
        rating: {
            avg: 4.7,
            total: 230
        },
        website: 'www.com',
        img: 'www.com',
    },
]

export default function CompanyRelated() {
    return (
        <div className="p-3 bg-white border rounded">
            <h2 className="text-xl font-semibold">People who looked at this company also looked at</h2>

            <ul className='pl-0 flex flex-col mt-2 gap-3'>
                {
                    companies.map((_, index) => (
                        <li className="flex" key={index}>
                            <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                                <img src={logo} alt={'People who loo'} className="w-20 object-cover rounded border-2 border-white" />
                            </div>
                            <div className="ml-3 ">
                                <a href="/reviews/company/name" className="no-underline pt-1 font-semibold">{'People who look ' + index}</a>
                                <div className="mt-2 flex">
                                    <Rating rating={4.8} />
                                    <span className="ml-2 text-sm">1245</span>
                                </div>
                                <div className="mt-2 flex items-center">
                                    <span><FaCheckCircle /></span>
                                    <span className="text-sm ml-2">Verified</span>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
