import React from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx';
import UserAvatar from '@/Components/UserAvatar';
import BlogCard from './Partial/BlogCard';
import Article from './Partial/Article';

import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";

const blog = {
    category:'Trends in Trust',
    name:"Smart spring cleaning: Getting rid of unwanted household items, ethically",
    image: '/url',
    date: '2024-01-25',
    author: {
        name: 'Joseph Russell',
        job: "Content Strategist",
        bio:"Joseph spends his days helping eCommerce companies understand the power of reviews and what they can do for their businesses in terms of conversion, SEO, and reputation management. When he's not focused on tech marketing, he enjoys a nice glass of wine, a good book, and making sure he's sending better memes than anyone else in his friend group."
    }
};

const related_blogs = [
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
]

export default function Detail({detail="Detail"}) {
    return (
        <>
            <FrontendLayout>
                <Head title={detail} />

                <Header />

                <div className='container-md p-2'>
                    <div className='md:w-[60%] mx-auto text-center mt-5 p-2'>
                        <a href={'/aboutus/' + blog.category.toLowerCase().replace(/\s+/g, '-')} className='no-underline text-lg'>
                        {blog.category}
                        </a>
                        <h2 className='mt-3 text-5xl'>{blog.name}</h2>
                        <p className='mt-4 text-gray-500'>{blog.date}</p>
                    </div>

                    <div className='mx-auto md:w-[40%]'>

                        <div className='mt-3 border-b'>
                            <Article />
                        </div>

                        <div className='mt-4 p-2 border-b'>
                            <p className='text-sm font-bold text-gray-800'>Author</p>
                            <div className='flex items-cneter mt-2'>
                                <UserAvatar className="flex items-center" user={blog.author}/>
                                <div className='ml-5'>
                                    <p className='text-sm font-bold text-gray-900 mb-0'>{blog.author.name}</p>
                                    <p className='text-sm text-gray-500 mt-1 mb-0'>{blog.author.job}</p>
                                </div>
                            </div>
                            <p className='mt-2 text-sm text-gray-700'>
                            {blog.author.bio}
                            </p>
                        </div>

                        <div className='mt-4 p-2 border-b'>
                            <p className='text-sm font-bold text-gray-800'>Share</p>
                            <div className='flex gap-2 mb-3'>
                                <a href="#" className='text-6xl text-[#1877F2]'><FaFacebookSquare /></a>
                                <a href="#" className='text-6xl text-[#1DA1F2]'><FaTwitterSquare /></a>
                                <a href="#" className='text-6xl text-[#0A66C2]'><FaLinkedin /></a>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 mb-3'>
                        <h2 className="text-center text-3xl font-bold mt-3">Related articles</h2>

                        <div className="relative flex items-center mt-5">
                            {/* flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth */}
                            <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-2 pb-5 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                                {related_blogs.map((item, index) => (
                                    <BlogCard
                                        key={index}
                                        title={'Trends in Trust'}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </>
    );
}
