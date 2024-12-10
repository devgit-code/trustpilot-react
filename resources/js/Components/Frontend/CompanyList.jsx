import React, { useRef } from 'react';
import { Link, usePage, } from '@inertiajs/react';

import "./Style.css"
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import CompanyCard from '@/Components/Frontend/CompanyCard';


const CompanyList = ({title, link, data}) => {

    return (
        <div className="container-md bg-white mb-5">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-2xl font-extrabold my-2">{title}</h2>
                {/* See More Button */}
                <div className="flex items-center justify-center">
                    <a href={link} className="no-underline inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                    See more
                    </a>
                </div>
            </div>

            <div className="relative flex items-center pt-3 ">
                {/* flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth */}
                <div className="flex lg:grid lg:grid-cols-4 pb-5 px-2 lg:w-full gap-4 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                    {data.map((item, index) => (
                        <CompanyCard
                            key={index}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyList;
