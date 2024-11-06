import React from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx';
import BlogCard from './Partial/BlogCard';

const blogs = [
    {
        name:"Parcel delivery",
        image: '/url',
        date: '2024-01-25'
    },
    {
        name:"Honey delivery is perfect",
        image: '/url',
        date: '2022-01-25'
    },
    {
        name:"Work delivery",
        image: '/url',
        date: '2023-05-25'
    },
    {
        name:"Elsa delivery",
        image: '/url',
        date: '2020-01-25'
    },
    {
        name:"Honey delivery is perfect",
        image: '/url',
        date: '2022-01-25'
    },
    {
        name:"Work delivery",
        image: '/url',
        date: '2023-05-25'
    },
    {
        name:"Elsa delivery",
        image: '/url',
        date: '2020-01-25'
    },
]

export default function BlogCategory({title}) {
    return (
        <>
            <FrontendLayout>
                <Head title={title} />

                <Header />

                <div className='container-md mb-3'>
                    <div className="relative flex justify-between gap-2 mt-5">
                        <h2 className="text-center text-3xl font-bold my-2">{title}</h2>
                    </div>

                    <div className="relative flex items-center pt-3">
                        {/* flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth */}
                        <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-4 pb-5 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                            {blogs.map((item, index) => (
                                <BlogCard
                                    key={index}
                                    title={title}
                                    {...item}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </>
    )
}
