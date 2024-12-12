import React, { useRef } from 'react';

import BlogCard from './BlogCard';

const BlogList = ({ blogs}) => {

    return (
        <div className="container-md bg-white">
            {/* Title */}
            <div className="relative flex justify-between gap-2">
                <h2 className="text-center text-3xl font-bold my-2">Take only 3 minutes to read!</h2>
            </div>

            <div className="relative flex items-center pt-3">
                {/* flex gap-4 overflow-x-scroll-important md:overflow-hidden-important scroll-smooth */}
                <div className="flex lg:grid lg:grid-cols-4 lg:w-full gap-4 pb-5 overflow-x-scroll-important lg:overflow-hidden-important scroll-smooth">
                    {blogs.map((item, index) => (
                        <BlogCard
                            key={index}
                            title={'Trends in Trust'}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;
