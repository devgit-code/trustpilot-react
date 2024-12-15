import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import "./Style.css"
import { Link, usePage, } from '@inertiajs/react';

const CategoryGridItems = ({ categories }) => {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth - 50;
            containerRef.current.scrollBy({ left: -containerWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth - 50;
            containerRef.current.scrollBy({ left: containerWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="mt-5 py-6 bg-white container-md">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-xl font-bold mb-6">What are you looking for?</h2>
                {/* See More Button */}
                <div className="flex items-center justify-center">
                    <div className="hidden md:inline-flex items-center justify-center">
                        <button
                            onClick={scrollLeft}
                            className="inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
                            <FiArrowLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                    <Link href={route('categories.index')} className="no-underline inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                    See more
                    </Link>
                </div>
            </div>

            <div className="relative flex items-center pt-3">
                {/* Icon Grid - Horizontal Scroll on Mobile */}
                <div ref={containerRef} className="flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth">
                    {
                        categories.length == 0 && (
                            <p className='text-center text-gray-600 font-bold text-lg'>No category</p>
                        )
                    }
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-shrink-0 flex-col items-center group justify-center pr-4 text-center hover:cursor-pointer">
                            <div className="flex items-center justify-center w-7 h-7">
                                <img src={`/storage/${category.image}`}
                                    alt="category-logo"
                                    className='inline max-w-6 max-h-6'
                                    // style={{ maxWidth: '32px', maxHeight: '32px' }}
                                    />
                            </div>
                            <Link href={route('categories.detail', category.id)} className="block text-center p-2 no-underline text-black capitalize text-sm group-hover:underline" > {category.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryGridItems;
