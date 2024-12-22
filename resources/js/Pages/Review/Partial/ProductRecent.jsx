import React, { useState } from "react";
import { Link, usePage } from '@inertiajs/react'

import Rating from '@/Components/Ratings'
import { FaCheckCircle } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs"

export default function ProductRecent({products, website}) {
    return (
        <div className="p-3 bg-white border rounded">
            <h2 className="text-xl font-semibold">Recent Products</h2>

            <ul className='pl-0 flex flex-col mt-4 gap-3'>
            {
                products.length === 0 && (
                    <li className="text-center text-lg text-gray-600 font-bold">No product</li>
                )
            }
                {
                    products.map((product, index) => (
                        <li className="flex" key={index}>
                            <div>
                                <div className="relative inline-flex items-center justify-center min-w-20 min-h-20 border-2 bordered rounded">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="max-w-19 max-h-19 object-cover"
                                        style={{ maxWidth: '76px', maxHeight: '76px' }}/>
                                </div>
                            </div>
                            <div className="ml-3">
                                <Link href={route('reviews.product', {website, name:product.name})} className="no-underline pt-1 font-semibold">{product.name}</Link>
                                <div className="mt-1 flex flex-col sm:flex-row gap-2">
                                    <Rating rating={Number(product.trustscore)} />
                                    <span className="ml-2 text-sm">{product.trustscore} /{product.count_reviews}</span>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
