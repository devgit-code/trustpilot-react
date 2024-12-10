import React, { useState } from 'react';
import { Link, usePage, } from '@inertiajs/react';

export default function RelatedCategory({categories}) {
    return (
        <div className="">
            <h3 className="font-semibold text-lg">Related categories</h3>
            <div className="flex justify-between mt-2">
                <ul className="text-gray-700 text-sm mt-2 p-0 w-full">
                    {categories.map((item, index) => (
                    <li key={index} className="border-b border-gray-200 py-1 last:border-0">
                        <Link href={route('categories.detail', item.id)} className="pl-2 no-underline flex py-2 justify-between text-gray-700 rounded hover:bg-gray-100">
                            <span className='capitalize text-gray-700'>{item.name}</span>
                            <span className='mr-2'>{item.businesses_count}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
