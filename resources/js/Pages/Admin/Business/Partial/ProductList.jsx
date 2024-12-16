import React, { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link, usePage, } from '@inertiajs/react';

const ProductList = ({ products }) => {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth / 2;
            containerRef.current.scrollBy({ left: -containerWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth / 2;
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
                    <div className="flex items-center justify-center">
                        <button
                            onClick={scrollLeft}
                            className="inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
                            <FiArrowLeft size={20}
                            disabled={products.length < 6}/>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative mt-3">
                {
                    products.length === 0 && (
                        <div className="flex items-center justify-center h-24 text-gray-800">
                        No products
                        </div>
                    )
                }
                <div ref={containerRef}
                    className={`flex items-center gap-3 ${products.length < 6 ? "justify-center" : "justify-start"} overflow-hidden`}>
                    {products.map((product, index) => (
                        <div key={index} className="w-1/6 min-w-[120px] h-30 group bg-white rounded-lg flex flex-col items-center justify-between">
                            <div className="inline-flex items-center justify-center w-12 h-12 ">
                                <img src={`/storage/${product.image}`}
                                    alt="product-logo"
                                    className='max-h-12 max-w-12 object-cover broder-1 rounded'
                                    style={{ maxWidth: '48px', maxHeight: '48px' }} />
                            </div>
                            <p  className="block text-center mt-3 no-underline text-black capitalize text-sm group-hover:underline" > {product.name}</p>
                            <p className='text-gray-700 text-sm'>50 reviews</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
