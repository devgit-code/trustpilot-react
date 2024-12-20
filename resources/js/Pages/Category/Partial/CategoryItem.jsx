import React, {useState,} from 'react';
import { Head, Link } from '@inertiajs/react';

const colorClasses = {
    yellow: 'bg-yellow-100 hover:bg-yellow-200',
    pink: 'bg-pink-100 hover:bg-pink-200',
    green: 'bg-green-100 hover:bg-green-200',
    orange: 'bg-orange-100 hover:bg-orange-200',
};

function CategoryItem({ id, title, icon, color, items }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
            {/* mobile view accordion */}
            <div className='md:hidden'>
                <div
                    className={`w-full flex items-center justify-between rounded-t-lg text-center p-2 border border-gray-600 `}
                    >
                    <div className="flex items-center justify-center w-7 h-7">
                        <img src={`/storage/${icon}`}
                            alt="category-logo"
                            className='inline max-w-6 max-h-6 object-cover'
                            // style={{ maxWidth: '32px', maxHeight: '32px' }}
                            />
                    </div>
                    <Link href={route('categories.show', id)} className="text-gray-800 text-lg font-semibold capitalize">{title}</Link>
                    <span onClick={toggleOpen} className='flex items-center text-xl'>{isOpen ? '-' : '+'}</span>
                </div>
                {isOpen && (
                    <ul className="text-gray-700 text-sm px-4 mt-2">
                    {
                        items.length === 0 && (
                            <li className="text-red-700 py-3">
                                There is no category.
                            </li>
                        )
                    }
                        {items.map((item, index) => (
                            <li key={index} className="border-b border-gray-200 py-3 last:border-0">
                                <Link href={route('categories.detail', item.id)} className="pl-2 text-gray-700 capitalize">
                                {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/*focus  */}
            <div className="rounded-lg border-1 bg-white hidden md:block">
                <Link href={route('categories.show', id)} className='no-underline text-gray-800'>
                    <div className={`rounded-t-lg text-center p-4 ${colorClasses[color]}`}>
                        <div className="inline-flex items-center justify-center w-7 h-7">
                            <img src={`/storage/${icon}`}
                                alt="category-logo"
                                className='inline max-w-6 max-h-6 object-cover'
                                />
                        </div>
                        <h2 className="text-lg font-semibold capitalize">{title}</h2>
                    </div>
                </Link>
                <ul className="text-gray-700 text-sm px-4 mt-2">
                {
                    items.length === 0 && (
                        <li className="text-red-700 py-3">
                            There is no category.
                        </li>
                    )
                }
                    {items.map((item, index) => (
                    <li key={index} className="border-b border-gray-200 py-3 last:border-0">
                        <Link href={route('categories.detail', item.id)} className="pl-2 no-underline text-gray-700 hover:underline capitalize pr-2">{item.name}</Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryItem;
