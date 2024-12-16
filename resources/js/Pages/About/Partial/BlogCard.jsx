import React from "react";
import { Head, Link } from '@inertiajs/react';

import moment from 'moment';
import Rating from '@/Components/Ratings';

function BlogCard({ id, title, image, created_at}) {
    return (
        <div className="bg-white rounded-lg mx-3 p-2 mb-3" style={{minWidth: '240px'}}>
            <div className="h-[240px]">
                <Link href={route('blogs.show', id)} className="no-underline">
                    <img src={`/storage/${image}`}
                        alt="blog-logo"
                        className='w-full aspect-[1/1] object-cover'
                        // style={{ maxWidth: '128px', maxHeight: '128px' }}
                    />
                    {/* <img src="/storage/images/blog/donating-unwanted-items.webp" alt={name} className="w-full aspect-[1/1] object-cover" /> */}
                </Link>
            </div>

            <div className="">
                <Link href={route('blogs.show', id)} className="no-underline text-blue-500 text-2xl font-extrabold ">
                    {title}
                </Link>
            </div>
            <p className="mt-3 text-gray-700 text-sm font-bold">{moment(created_at).format('MMM DD, Y')}</p>
        </div>
    );
}

export default BlogCard;
