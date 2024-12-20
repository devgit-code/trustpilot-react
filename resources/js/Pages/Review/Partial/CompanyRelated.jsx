import React, { useState } from "react";
import { Link, usePage } from '@inertiajs/react'

import Rating from '@/Components/Ratings'
import company_logo from "@/../images/company-logo.png"
import { FaCheckCircle } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs"

export default function CompanyRelated({companies}) {
    return (
        <div className="p-3 bg-white border rounded">
            <h2 className="text-xl font-semibold">Recent companies</h2>

            <ul className='pl-0 flex flex-col mt-4 gap-3'>
            {
                companies.length === 0 && (
                    <li className="text-center text-lg text-gray-600 font-bold">No company</li>
                )
            }
                {
                    companies.map((company, index) => (
                        <li className="flex" key={index}>
                            <div className="relative inline-flex items-center justify-center w-20 h-20 border-2 bordered rounded">
                                <img
                                    src={company.profile?.logo ? `/storage/images/logo/${company.profile.logo}` : company_logo}
                                    alt={company.company_name}
                                    className="max-w-19 max-h-19 object-cover"
                                    style={{ maxWidth: '76px', maxHeight: '76px' }}/>
                            </div>
                            <div className="ml-3">
                                <Link href={route('reviews.company', company.website)} className="no-underline pt-1 font-semibold">{company.company_name}</Link>
                                <div className="mt-1 flex flex-col sm:flex-row gap-2">
                                    <Rating rating={Number(company.trustscore)} />
                                    <span className="text-sm">{company.trustscore} /{company.count_reviews}</span>
                                </div>
                                <div className="mt-2 flex flex-col sm:flex-row gap-2">
                                    {
                                        !company.company_email && (
                                            <p className={`inline-flex text-sm items-center mb-0 mr-3`}>
                                                <BsFillExclamationOctagonFill className='text-danger text-base'/>
                                                <span className='ml-1 text-gray-700 text-xs font-bold'>Unclaimed</span>
                                            </p>
                                        )
                                    }
                                    <p className={`inline-flex text-sm items-center mb-0`}>
                                        <FaCheckCircle className={`inline ${company.email_verified_at && 'text-success'} mr-1`}/>
                                        <span className='text-gray-700 text-xs font-bold'>{company.email_verified_at ? 'Verified' : 'Unverified'}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
