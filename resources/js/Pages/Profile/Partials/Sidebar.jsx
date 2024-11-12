import React from 'react';
import './style.css'

export default function DefaultSidebar() {
    return (
        <div className="w-full min-w-[20rem] p-4 mt-5 flex flex-col" id="profile">
            <a href={route('profile')}
                className={`${route().current('profile') ? 'active':''} no-underline pl-10 text-gray-900 py-2 m-2 border-l-4 border-gray-100 hover:border-gray-400 hover:text-blue-600 hover:underline transition ease-in-out duration-150`}>
                Profile
            </a>
            <a href={route('profile.password')}
                className={`${route().current('profile.password') ? 'active':''} no-underline pl-10 text-gray-900 py-2 m-2 border-l-4 border-gray-100 hover:border-gray-400 hover:text-blue-600 hover:underline transition ease-in-out duration-150`}>
                Password
            </a>
            {/* <a href={route('profile')}
                className=''>Setting
            </a> */}
        </div>
    );
}
