import React from 'react';
import { Head, Link } from '@inertiajs/react';

import moment from 'moment';
import DOMPurify from "dompurify";
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx';
import BlogCard from './Partial/BlogCard.jsx';
import Article from './Partial/Article.jsx';

import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";


export default function Show({ blog, other_blogs }) {
    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <>
            <FrontendLayout>
                <Head title='Detail' />

                <div className='container-md p-2'>
                    <div className='md:w-[60%] mx-auto text-center mt-5'>
                        <h2 className='mt-3 text-5xl'>{blog.title}</h2>
                        <p className='mt-4 text-gray-500'>{moment(blog.created_at).format('dddd, MMMM DD, YYYY')}</p>
                    </div>

                    <div className='mx-auto md:w-[40%]'>
                        <div className=''>
                            <img src={`/storage/${blog.image}`}
                                alt="blog-logo"
                                className='w-full object-cover'
                                // style={{ maxWidth: '128px', maxHeight: '128px' }}
                            />
                        </div>
                    </div>

                    <div className='mt-5 mx-auto md:w-[50%]'>
                        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    </div>

                    <div className='mt-5 mb-3 mx-auto md:w-[80%]'>
                        <div className='flex items-center justify-between'>
                            <h2 className="text-3xl font-bold mt-3">Read more articles</h2>

                            <Link href={route('blogs.index')} className="no-underline inline px-4 py-2 ml-4 bg-blue-500 border border-blue-500 text-sm text-bold text-white rounded-full hover:bg-blue-400">
                            See all
                            </Link>
                            {/* <Link href={route('blogs.index')} className='no-underline text-lg font-bold hover:underline '>
                                See all
                            </Link> */}
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
