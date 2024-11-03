import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import CompanyCard from '@/Components/Frontend/CompanyCard';

import "./Style.css"
import {
    Link,
    usePage,
} from '@inertiajs/react';

const data = [
    {
        image: "https://placekitten.com/64/64",
        title: "EECU Credit Union",
        link: "https://eecu.org",
        rating: 3.8,
        is_verified: true,
        reviews: 1502
    },
    {
        image: "https://placekitten.com/65/65",
        title: "Wainscoting America",
        link: "https://wainscotingamerica.com",
        is_verified: false,
        rating: 5.0,
        reviews: 930
    },
    {
        image: "https://placekitten.com/66/66",
        title: "RISLA",
        link: "https://risla.com",
        is_verified: false,
        rating: 1.8,
        reviews: 3981
    },
    {
        image: "https://placekitten.com/67/67",
        title: "Wade Caves - Astrologer",
        link: "https://wadecaves.com",
        is_verified: true,
        rating: 4.9,
        reviews: 92
    },
];

const CompanyList = ({title}) => {

    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-2xl font-bold my-2">{title}</h2>
                {/* See More Button */}
                <div className="flex items-center justify-center">
                    <button className="inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                    See more
                    </button>
                </div>
            </div>

            <div className="relative flex items-center pt-3">
                {/* flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth */}
                <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-4 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                    {data.map((item, index) => (
                        <CompanyCard
                            key={index}
                            is_verified={item.is_verified}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            rating={item.rating}
                            reviews={item.reviews}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyList;
