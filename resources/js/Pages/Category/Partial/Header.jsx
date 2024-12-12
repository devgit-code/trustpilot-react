import React, { useRef, useEffect, useState } from 'react';

function Header({category}) {
    return (
        <div className="relative bg-white overflow-hidden p-4 border-gray-200 border-b">
            <div className='container-md'>
                <p className='pl-3 text-black capitalize'>
                    {category.category && (
                        <>{category.category.name} &gt; {category.name}</>
                    )}
                </p>
                <div className="flex justify-center w-full">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 mt-5 capitalize">Best in {category.name}</h2>
                        <p className="text-lg font-bold text-gray-700 mt-3 pb-3">Compare the best companies in this category
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
