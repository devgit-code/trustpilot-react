import React from 'react';

export default function Profile() {
    return (
        <div className="p-3 size-fit">
            <div className="flex items-center justify-between mb-2">
                <a href="#">
                    <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos" />
                </a>
                <div>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                </div>
            </div>
            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a href="#">Jese Leos</a>
            </p>
            <p className="mb-3 text-sm font-normal">
                <a href="#" className="hover:underline">@jeseleos</a>
            </p>
            <p className="mb-4 text-sm">Open-source contributor. Building <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p>
            <ul className="flex text-sm">
                <li className="me-2">
                    <a href="#" className="hover:underline">
                        <span className="font-semibold text-gray-900 dark:text-white">799</span>
                        <span>Following</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:underline">
                        <span className="font-semibold text-gray-900 dark:text-white">3,758</span>
                        <span>Followers</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
