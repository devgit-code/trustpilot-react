import React from 'react'
import {
    Link,
    usePage,
} from '@inertiajs/react';

import './Style.css'
import { FaAngleLeft } from "react-icons/fa";

export default function Header(){
    return (
        <>
            <div className='bg-[#FCECE3] sticky top-0 z-20'>
                <div className='container-md flex items-center'>
                    <span className='text-2xl text-black font-bold'>About us</span>
                    <div className='ml-5 flex'>
                        {route().current('aboutus.detail') ?

                        <Link className="text-gray-700 font-bold text-sm py-4 border-b-[3px] border-[#FCECE3] no-underline mx-3"
                            href={route('aboutus')}
                            >
                            <div className='flex items-center border-l pl-5 border-gray-300 py-2'>
                            <FaAngleLeft className='text-lg mr-3'/>Go back
                            </div>
                        </Link>
                        :
                        <>
                            <Link className={`${route().current('aboutus') ? 'active' : ''} header text-gray-500 font-bold text-sm py-4 border-b-[3px] border-[#FCECE3] no-underline hover:border-gray-800 hover:text-gray-800 transition duration-150 ease-in-out mx-3`}
                                href={route('aboutus')}
                                >Featured
                            </Link>
                            <Link className={`${route().current('aboutus.trends') ? 'active' : ''} header text-gray-500 font-bold text-sm py-4 border-b-[3px] border-[#FCECE3] no-underline hover:border-gray-800 hover:text-gray-800 transition duration-150 ease-in-out mx-3`}
                                href={route('aboutus.trends')}>
                                Trends in trust
                            </Link>
                            <Link className={`${route().current('aboutus.reviews') ? 'active' : ''} header text-gray-500 font-bold text-sm py-4 border-b-[3px] border-[#FCECE3] no-underline hover:border-gray-800 hover:text-gray-800 transition duration-150 ease-in-out mx-3`}
                                href={route('aboutus.reviews')}>
                                Reviews Matter
                            </Link>
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
