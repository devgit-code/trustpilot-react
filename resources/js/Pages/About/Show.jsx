import React from 'react';
import { Head, Link } from '@inertiajs/react';

import moment from 'moment';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx';
import BlogCard from './Partial/BlogCard.jsx';
import Article from './Partial/Article.jsx';

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

export default function Show({ blog, other_blogs }) {
    return (
        <>
            <FrontendLayout>
                <Head title='Detail' />

                <div className='container-md p-2'>
                    <div className='md:w-[80%] mx-auto text-center mt-5'>
                        <h2 className='mt-3 text-5xl'>{blog.title}</h2>
                        <p className='mt-4 text-gray-500'>{moment(blog.created_at).format('M/DD, Y')}</p>
                    </div>

                    <div className='mx-auto md:w-[60%]'>

                        <div className='mt-3'>
                            <Article />
                        </div>
                    </div>

                    <div className='mt-5 mb-3 mx-auto md:w-[80%]'>
                        <div className='flex items-center justify-between'>
                            <h2 className="text-3xl font-bold mt-3">Read more articles</h2>
                            <Link href={route('blogs.index')} className='no-underline text-lg font-bold hover:underline '>
                                See all
                            </Link>
                        </div>

                        <div className="relative flex items-center mt-3">
                            <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-2 pb-5 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                                {
                                    other_blogs.length === 0 && (
                                        <p className='text-center text-lg font-bold text-gray-700'>No blog</p>
                                    )
                                }
                                {other_blogs.map((item, index) => (
                                    <BlogCard
                                        key={index}
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
