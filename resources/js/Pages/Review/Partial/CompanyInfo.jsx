import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react'

import { CiAt } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";

export default function CompanyInfo({id, company_name, website, company_email, email_verified_at, first_name, last_name, job_title, profile, primary_business_category}) {

    return (
        <div className="p-4 border rounded bg-white">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold capitalize">About {company_name}</h2>
                {/* <p className="text-sm text-gray-500">
                Information provided by various external sources
                </p> */}
            </div>

            {/* Description */}
            <div className="mb-4 ">
                <p className='text-gray-800 text-sm font-medium min-h-10'>
                {profile?.description ?? 'No description'}
                </p>
            </div>

            {/* Company Info */}
            <div className="mb-4 ">
                <h3 className="text-lg font-semibold">Company</h3>

                {!email_verified_at ? (
                    <Link href={route('yonetici.claim', website)} className='no-underline bg-blue-100 py-2 px-4 border rounded border-blue-400 group hover:bg-green-600 hover:border-blue-500'>
                        <span className='text-sm font-bold text-gray-600 group-hover:text-gray-100'>Claim This Company</span>
                    </Link>
                ):(
                    <>
                        <p className='text-gray-800 text-sm font-medium mb-1'>
                        {company_email && `Mail: ${company_email}`}
                        </p>
                        <p className='text-gray-800 text-sm font-medium'>
                        {(first_name || last_name) && `${first_name} ${last_name}`}
                        {(job_title) && ` (${job_title})`}
                        </p>
                    </>
                )}
            </div>


            <hr className="my-4" />

            {/* Contact Section */}
            <div className="">
                <h3 className="text-lg font-semibold">Contact</h3>
                <ul className="mt-2 space-y-3 pl-0 text-sm">
                    <li className="flex items-center">
                        <span className="text-gray-500 text-lg mr-2"><CiAt /></span>
                        {
                            profile?.email ? (
                                <a
                                    href={`mailto::${profile.email}`} //mailto:community@eecu.org
                                    className='no-underline text-blue-600  hover:underline'
                                    >
                                    {profile.email}
                                </a>

                            ):(
                                <p className='mb-0 text-gray-600'>No email</p>
                            )
                        }
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-500 text-lg mr-2"><HiOutlinePhone /></span>
                        {
                            profile?.phone ? (
                                <a
                                    href={`tel:+${profile.phone}`} //mailto:community@eecu.org
                                    className='no-underline text-blue-600  hover:underline'
                                    >
                                    {profile.phone}
                                </a>

                            ):(
                                <p className='mb-0 text-gray-600'>No phone</p>
                            )
                        }
                    </li>
                    <li className="flex">
                        <span className="text-gray-500 text-lg mr-2"><CiLocationOn /></span>
                        <address className="not-italic capitalize">
                        {profile?.country ? (
                            <>
                                <p className='mb-0 text-gray-700'>{profile?.location}</p>
                                <p className='mb-0 mt-1 text-gray-700'>{profile?.city}</p>
                                <p className='mb-0 mt-1 text-gray-700'>{profile?.country}</p>
                            </>
                        ) :('No address')}
                        </address>
                    </li>
                </ul>
            </div>

            {/* Category Section */}
            {/* <div>
                <h3 className="text-lg font-semibold">Category</h3>
                <p className="mt-2 text-sm text-gray-700">
                <strong>{company_name}</strong> is{" "}
                <span className="font-semibold text-gray-900">2 out of 12</span> best
                companies in the category{" "}
                <span><a href="#" className='text-blue-600 underline'>{primary_business_category?.sub_category.category.name}</a></span> on Eniyi.
                </p>
            </div> */}
        </div>
    )
}
