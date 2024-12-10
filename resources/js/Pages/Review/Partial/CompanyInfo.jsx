import React, { useState, useEffect } from 'react';

import { CiAt } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";

export default function CompanyInfo({company_name, profile, primary_business_category}) {

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
                {profile?.description ?? 'Not set'}
                </p>
            </div>

            <hr className="my-4" />

            {/* Contact Section */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Contact</h3>
                <ul className="mt-2 space-y-3 pl-0 text-sm">
                    <li className="flex items-center">
                        <span className="text-gray-500 text-lg mr-2"><CiAt /></span>
                        <a
                            href={profile?.email ? `mailto::${profile?.email}`: '#'} //mailto:community@eecu.org
                            className="text-blue-600 hover:underline"
                            >
                            {profile?.email ?? 'Not set'}
                        </a>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-500 text-lg mr-2"><HiOutlinePhone /></span>
                        <a
                            href={profile?.phone ? `tel:+${profile?.phone}`: '#'} //tel:+18178820800
                            className="text-blue-600 hover:underline"
                            >
                            {profile?.phone ?? 'Not set'}
                        </a>
                    </li>
                    <li className="flex">
                        <span className="text-gray-500 text-lg mr-2"><CiLocationOn /></span>
                        <address className="not-italic capitalize">
                        {profile?.location ?? 'Not set'}
                        </address>
                    </li>
                </ul>
            </div>

            <hr className="my-4" />

            {/* Category Section */}
            <div>
                <h3 className="text-lg font-semibold">Category</h3>
                <p className="mt-2 text-sm text-gray-700">
                <strong>{company_name}</strong> is{" "}
                <span className="font-semibold text-gray-900">2 out of 12</span> best
                companies in the category{" "}
                <span><a href="#" className='text-blue-600 underline'>{primary_business_category?.sub_category.category.name}</a></span> on Eniyi.
                </p>
            </div>
        </div>
    )
}
