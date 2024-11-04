import React, {useState,} from 'react';

const colorClasses = {
    yellow: 'bg-yellow-100 hover:bg-yellow-200',
    pink: 'bg-pink-100 hover:bg-pink-200',
    green: 'bg-green-100 hover:bg-green-200',
    orange: 'bg-orange-100 hover:bg-orange-200',
};

function CategoryItem({ title, icon, color, items }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
            {/* mobile view accordion */}
            <div className='md:hidden'>
                <button
                    onClick={toggleOpen}
                    className={`w-full flex items-center justify-between rounded-t-lg text-center p-2 border border-gray-600 text-gray-800`}
                    >
                    <span className="flex items-center text-2xl m-0">{icon}</span>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <span className='flex items-center text-xl'>{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen && (
                    <ul className="text-gray-700 text-sm px-4 mt-2">
                        {items.map((item, index) => (
                            <li key={index} className="border-b border-gray-200 py-3 last:border-0">
                                <a href="#" className="pl-2 no-underline text-gray-700 hover:underline">
                                {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/*focus  */}
            <div className="rounded-lg border-1 bg-white hidden md:block">
                <a href="#" className='no-underline text-gray-800'>
                    <div className={`rounded-t-lg text-center p-4 ${colorClasses[color]}`}>
                        <span className="text-2xl">{icon}</span>
                        <h2 className="text-lg font-semibold">{title}</h2>
                    </div>
                </a>
                <ul className="text-gray-700 text-sm px-4 mt-2">
                    {items.map((item, index) => (
                    <li key={index} className="border-b border-gray-200 py-3 last:border-0">
                        <a href="#" className="pl-2 no-underline text-gray-700 hover:underline">{item}</a>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryItem;
