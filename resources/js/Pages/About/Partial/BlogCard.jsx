import React from "react";
import Rating from '@/Components/Rating';

function BlogCard({ title, name, date}) {
    return (
        <div className="bg-white rounded-lg mx-3 p-2 mb-3" style={{minWidth: '280px'}}>
            <a href="/aboutus/detail" className="no-underline">
                <img src="/storage/images/blog/donating-unwanted-items.webp" alt={name} className="w-full aspect-[1/1] object-cover" />
            </a>
            <div className="mt-3">
                <a href={'/aboutus/' + title.toLowerCase().replace(/\s+/g, '-')} className="no-underline text-blue-500 font-bold text-sm">
                {title}
                </a>
            </div>
            <div className="py-3">
                <a href="/aboutus/detail" className="no-underline mt-2 text-black text-2xl font-bold">{name}</a>
            </div>
            <p className="text-gray-700 text-xs">{date}</p>
        </div>
    );
}

export default BlogCard;
