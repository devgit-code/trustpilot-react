import React from 'react';

import CategoryItem from './CategoryItem'

const categories = [
    {
        title: 'Animals & Pets',
        icon: '🐾',
        items: [
            'Animal Health',
            'Animal Parks & Zoo',
            'Cats & Dogs',
            'Horses & Riding',
            'Pet Services',
            'Pet Stores'
        ]
    },
    {
        title: 'Events & Entertainment',
        icon: '🎤',
        items: [
            'Adult Entertainment',
            'Children’s Entertainment',
            'Clubbing & Nightlife',
            'Events & Venues',
            'Gambling',
            'Gaming',
            'Museums & Exhibits',
            'Music & Movies',
            'Theater & Opera',
            'Wedding & Party'
        ]
    },
    {
        title: 'Home & Garden',
        icon: '🏠',
        items: [
            'Bathroom & Kitchen',
            'Cultural Goods',
            'Decoration & Interior',
            'Energy & Heating',
            'Fabric & Stationery',
            'Furniture Stores',
            'Garden & Pond',
            'Home & Garden Services',
            'Home Goods Stores',
            'Home Improvements'
        ]
    },
    {
        title: 'Restaurants & Bars',
        icon: '🍽️',
        items: [
            'African & Pacific Cuisine',
            'Bars & Cafes',
            'Chinese & Korean Cuisine',
            'European Cuisine',
            'General Restaurants',
            'Japanese Cuisine',
            'Mediterranean Cuisine',
            'Middle Eastern Cuisine',
            'North & South American Cuisine',
            'Southeast Asian Cuisine',
            'Takeaway',
            'Vegetarian & Diet'
        ]
    },
    {
        title: 'Beauty & Well-being',
        icon: '💄',
        items: [
            'Cosmetics & Makeup',
            'Hair Care & Styling',
            'Skin Care',
            'Spa & Wellness',
            'Fragrance & Perfumes'
        ]
    },
    {
        title: 'Tvents & Entertainment',
        icon: '🎤',
        items: [
            'Adult Entertainment',
            'Children’s Entertainment',
            'Clubbing & Nightlife',
            'Events & Venues',
            'Gambling',
            'Gaming',
            'Museums & Exhibits',
            'Music & Movies',
            'Theater & Opera',
            'Wedding & Party'
        ]
    },
    {
        title: 'Come & Garden',
        icon: '🏠',
        items: [
            'Bathroom & Kitchen',
            'Cultural Goods',
            'Decoration & Interior',
            'Energy & Heating',
            'Fabric & Stationery',
            'Furniture Stores',
            'Garden & Pond',
            'Home & Garden Services',
            'Home Goods Stores',
            'Home Improvements'
        ]
    },
    {
        title: 'Westaurants & Bars',
        icon: '🍽️',
        items: [
            'African & Pacific Cuisine',
            'Bars & Cafes',
            'Chinese & Korean Cuisine',
            'European Cuisine',
            'General Restaurants',
            'Japanese Cuisine',
            'Mediterranean Cuisine',
            'Middle Eastern Cuisine',
            'North & South American Cuisine',
            'Southeast Asian Cuisine',
            'Takeaway',
            'Vegetarian & Diet'
        ]
    },
    {
        title: 'Deauty & Well-being',
        icon: '💄',
        items: [
            'Cosmetics & Makeup',
            'Hair Care & Styling',
            'Skin Care',
            'Spa & Wellness',
            'Fragrance & Perfumes'
        ]
    },
];

const colors = [
    'yellow',
    'pink',
    'green',
    'orange'
];

function CategoryList({categories}) {
    console.log('ee----', categories)
    const items = categories.map((category, index) => (
        <CategoryItem
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
            {items.map((item, index) => (
                <div key={index} className="mb-4 break-inside-avoid ">
                {item}
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
