import React, { useState } from "react";

import { MdOutlineDomainVerification } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { CiDollar } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";
import { CiClock1 } from "react-icons/ci";

const CompanyActivity = () => {
    const [tooltip, setTooltip] = useState(null);

    const activities = [
        {
            text: "Claimed profile",
            tooltip: "This company has claimed their profile on Trustpilot.",
            icon: <MdOutlineDomainVerification />
        },
        {
            text: "Asks for reviews — positive or negative",
            tooltip:
                "This company actively asks customers to write reviews, which may result in more representative star ratings.",
            icon: <BsSend />
        },
        {
            text: "Pays for extra features",
            tooltip: "This company pays Trustpilot for additional features.",
            icon: <CiDollar />
        },
        {
            text: "Replied to 2 out of 10 negative reviews",
            tooltip: "The company has replied to a portion of their negative reviews.",
            icon: <LuMessagesSquare />

        },
        {
            text: "Replies to negative reviews in < 1 week",
            tooltip: "On average, the company replies to negative reviews in under a week.",
            icon: <CiClock1 />
        },
    ];

    return (
        <div className="p-3 border rounded bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Company Activity</h2>
                {/* <a href="#" className="text-blue-600 hover:underline text-sm">
                See all
                </a> */}
            </div>

            {/* Activity List */}
            <ul className="pl-0">
                {activities.map((activity, index) => (
                <li
                    key={index}
                    className="relative flex items-center group border-b p-3 last:border-none"
                    onMouseEnter={() => setTooltip(index)}
                    onMouseLeave={() => setTooltip(null)}
                >
                    {/* Icon (can be replaced with SVG or other icons) */}
                    <span className="mr-3 text-gray-500">{activity.icon}</span>
                    <span className="text-gray-800 text-sm">{activity.text}</span>

                    {/* Tooltip */}
                    {/* {
                    tooltip === index && (
                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-64 p-2 bg-white text-sm text-gray-600 border rounded-lg shadow-lg z-10">
                        <div className="relative">
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-t border-gray-300 rotate-45"></div>
                        {activity.tooltip}
                        </div>
                    </div>
                    )
                    } */}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyActivity;
