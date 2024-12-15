import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link, usePage, } from '@inertiajs/react';

const ProductList = ({ products }) => {
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
        <div className="card py-6 bg-white container-md">
            {/* Title */}
            <div className="relative flex justify-between px-3">
                <h2 className="text-center text-xl font-bold mb-6">Products</h2>
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
                </div>
            </div>

            <div className="relative flex items-center pt-3">
                {/* Icon Grid - Horizontal Scroll on Mobile */}
                <div ref={containerRef} className="row lg:w-full overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                {/* <div ref={containerRef} className="flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth"> */}
                    {
                        products.length == 0 && (
                            <p className='text-center text-gray-600 font-bold text-lg'>No Products</p>
                        )
                    }
                    {products.map((product, index) => (
                        <div key={index} className="col-lg-2 flex flex-shrink-0 flex-col items-center group justify-center text-center hover:cursor-pointer">
                            <div className="inline-flex items-center justify-center w-12 h-12 ">
                                <img src={`/storage/${product.image}`}
                                    alt="product-logo"
                                    className='max-h-12 max-w-12 object-cover broder-1 rounded'
                                    style={{ maxWidth: '48px', maxHeight: '48px' }} />
                            </div>
                            <Link href={route('reviews.product', product.id)} className="block text-center mt-3 no-underline text-black capitalize text-sm group-hover:underline" > {product.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
