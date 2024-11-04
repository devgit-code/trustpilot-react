import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import CompanyCard from '@/Components/Frontend/CompanyCard';

import "./Style.css"
import {
    Link,
    usePage,
} from '@inertiajs/react';


const CompanyList = ({title, data}) => {

    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-2xl font-extrabold my-2">{title}</h2>
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
