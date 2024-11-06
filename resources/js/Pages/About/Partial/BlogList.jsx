import React, { useRef } from 'react';

import BlogCard from './BlogCard';

const BlogList = ({title, link, blogs}) => {

    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-3xl font-bold my-2">{title}</h2>
                {/* See More Button */}
                <div className="flex items-center justify-center">
                    <a href={link} className="inline px-4 py-2 no-underline min-w-[120px] ml-4 text-sm font-bold text-blue-500">
                    See more articles
                    </a>
                </div>
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
    );
};

export default BlogList;
