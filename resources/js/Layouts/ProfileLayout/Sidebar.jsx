import React from 'react';

export default function DefaultSidebar() {
    return (
        <div className="w-full min-w-[20rem] p-4 mt-5 flex flex-col" id="profile">
            <a href={route('profile')}
                className={`${route().current('profile') ? 'active':''} profile no-underline pl-10 text-gray-900 py-2 m-2 border-l-4 border-gray-100 hover:border-gray-400 hover:text-blue-600 hover:underline transition ease-in-out duration-150`}>
                Account
            </a>
            <a href={route('profile.password')}
                className={`${route().current('profile.password') ? 'active':''} profile no-underline pl-10 text-gray-900 py-2 m-2 border-l-4 border-gray-100 hover:border-gray-400 hover:text-blue-600 hover:underline transition ease-in-out duration-150`}>
                Change Password
            </a>
            <a href={route('profile.setting')}
                className={`${route().current('profile.setting') ? 'active':''} profile no-underline pl-10 text-gray-900 py-2 m-2 border-l-4 border-gray-100 hover:border-gray-400 hover:text-blue-600 hover:underline transition ease-in-out duration-150`}>
                Setting
            </a>
        </div>
    );
}
