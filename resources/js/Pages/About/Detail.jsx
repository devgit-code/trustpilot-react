import React from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx';
import UserAvatar from '@/Components/UserAvatar';

const blog = {
    category:'Trends in Trust',
    name:"Smart spring cleaning: Getting rid of unwanted household items, ethically",
    image: '/url',
    date: '2024-01-25',
    author: {
        name: 'Daniel',
    }
};

export default function Detail({detail="Detail"}) {
    return (
        <>
            <FrontendLayout>
                <Head title={detail} />

                <Header />

                <div className='container-md p-5'>
                    <div className='mx-auto w-1/2 text-center mt-5 p-3'>
                        <a href={'/aboutus/' + blog.category.toLowerCase().replace(/\s+/g, '-')} className='no-underline text-lg'>
                        {blog.category}
                        </a>
                        <h2 className='mt-2 text-4xl font-bold'>{blog.name}</h2>
                        <p className='mt-4 text-gray-500'>{blog.date}</p>
                    </div>

                    <div className=''>
                    </div>
                </div>
            </FrontendLayout>
        </>
    );
}
