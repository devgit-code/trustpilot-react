import React from "react";
import Rating from '@/Components/Rating';

function BlogCard({ title, name, date}) {
    return (
        <div className="bg-white rounded-lg mx-3 p-2 mb-3" style={{minWidth: '280px'}}>
            <a href="/aboutus/detail" className="no-underline">
                <div>
                    <img src="/storage/images/blog/donating-unwanted-items.webp" alt={name} className="w-full aspect-[1/1] object-cover" />
                </div>
                <p className="mt-3 text-blue-500 font-bold text-sm">
                {title}
                </p>
                <h3 className="mt-2 text-black text-2xl font-bold">{name}</h3>
                <p className="text-gray-700 text-xs">{date}</p>
            </a>
        </div>
    );
}

export default BlogCard;
