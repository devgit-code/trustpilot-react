import React, { useState, useEffect } from 'react';

import { CiAt } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";

export default function CompanyInfo() {

    return (
        <div className="p-4 border rounded bg-white">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">About EECU Credit Union</h2>
                <p className="text-sm text-gray-500">
                Information provided by various external sources
                </p>
            </div>

            {/* Description */}
            <div className="mb-4 ">
                <p className='text-gray-800 text-sm font-medium'>
                EECU is a not-for-profit credit union, owned by our members. We offer
                everything you’d expect from a financial institution, but it’s our
                commitment to delivering value, focus on supporting your community,
                and delivering a faster, friendlier personalized experience that truly
                reflects the EECU difference!
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
                            href="#" //mailto:community@eecu.org
                            className="text-blue-600 hover:underline"
                            >
                            community@eecu.org
                        </a>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-500 text-lg mr-2"><HiOutlinePhone /></span>
                        <a
                            href="#" //tel:+18178820800
                            className="text-blue-600 hover:underline"
                            >
                            (817) 882-0800
                        </a>
                    </li>
                    <li className="flex">
                        <span className="text-gray-500 text-lg mr-2"><CiLocationOn /></span>
                        <address className="not-italic">
                        1617 West 7th St
                        <br />
                        76102,<br />Fort Worth, <br />United States
                        </address>
                    </li>
                </ul>
            </div>

            <hr className="my-4" />

            {/* Category Section */}
            <div>
                <h3 className="text-lg font-semibold">Category</h3>
                <p className="mt-2 text-sm text-gray-700">
                <strong>EECU Credit Union</strong> is{" "}
                <span className="font-semibold text-gray-900">2 out of 28</span> best
                companies in the category{" "}
                <span><a href="#" className='text-blue-600 underline'>Bank</a></span> on Eniyi.
                </p>
            </div>
        </div>
    )
}
