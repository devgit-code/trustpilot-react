import { Head } from '@inertiajs/react';
import React from 'react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';

import Header from './Partial/Header.jsx';
import BlogList from './Partial/BlogList.jsx';

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
    }
]

export default function AboutUs() {
    return (
        <>
            <FrontendLayout>
                <Head title="About Us" />

                <Header />

                <div className='container-md mb-3'>
                    <h3 className='text-2xl font-bold mt-5'>Featured</h3>
                    <div className="flex flex-col md:flex-row-reverse items-start gap-5 my-4 pb-5 border-b">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2">
                            <img
                            src="/storage/images/blog/donating-unwanted-items.webp" // Replace with your image path
                            alt="Spring cleaning"
                            className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="flex flex-col w-full md:w-1/2 gap-2">

                            <span className="text-gray-500 text-sm mt-3">January 30, 2024</span>
                            <a href="#" className="text-4xl font-bold text-gray-900 no-underline">
                            Smart spring cleaning: Getting rid of unwanted household items, ethically
                            </a>

                            <div className='mt-5'>
                                <a href="/aboutus/detail" className="no-underline bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-150">
                                Read now
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4 border-b'>
                        <BlogList title="Trends in Trust" blogs={blogs} link={route('aboutus.trends')}/>
                    </div>
                    <div className='mb-4'>
                        <BlogList title="Reviews matter" blogs={blogs} link={route('aboutus.reviews')}/>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
