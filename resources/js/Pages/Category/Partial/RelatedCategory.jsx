import React, { useState } from 'react';


const categories =[
    {
        title: 'Animals & Pets',
        slug: 'animals_pets',
        count: 45,
    },
    {
        title: 'Cats & Dogs',
        slug: 'cats_dogs',
        count: 2145,
    },
]


export default function RelatedCategory() {
    return (
        <div className="">
            <h3 className="font-semibold text-lg">Related categories</h3>
            <div className="flex justify-between mt-2">
                <ul className="text-gray-700 text-sm mt-2 p-0 w-full">
                    {categories.map((item, index) => (
                    <li key={index} className="border-b border-gray-200 py-1 last:border-0">
                        <a href="#" className="pl-2 no-underline flex py-2 justify-between text-gray-700 rounded hover:bg-gray-100">
                            <span>{item.title}</span>
                            <span className='mr-2'>{item.count}</span>
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
