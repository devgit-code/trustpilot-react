import React, { useRef } from 'react';
import EvaluateCard from './EvaluateCard';

const WriteCompanyList = ({data}) => {
    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-2xl font-extrabold my-2">Ready to write your review?</h2>
            </div>

            <div className="relative flex items-center pt-3">
            {
                data.length == 0 && (
                    <p className='text-center font-bold text-lg text-gray-600'>No company</p>
                )
            }
                {/* flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth */}
                <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-4 pb-5 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                    {data.map((item, index) => (
                        <EvaluateCard
                            key={index}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WriteCompanyList;
