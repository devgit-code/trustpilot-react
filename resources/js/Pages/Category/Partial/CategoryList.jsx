import React from 'react';

import CategoryItem from './CategoryItem'

const colors = [
    'yellow',
    'pink',
    'green',
    'orange'
];

function CategoryList({categories}) {
    const items = categories.map((category, index) => (
        <CategoryItem
            id={category.id}
            title={category.name}
            icon={category.image}
            color={colors[Math.floor(Math.random()*4)]}
            items={category.subcategories}
        />
    ));

    return (
        //grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto
        /**MasonryLayout */
        <div className="md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-2">
            {
                items.length == 0 && (
                    <p className='text-center font-bold text-xl py-5 text-gray-600'>No category</p>
                )
            }
            {items.map((item, index) => (
                <div key={index} className="mb-4 break-inside-avoid ">
                {item}
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
