import { Head } from '@inertiajs/react';
import React from 'react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';


export default function Contact() {
    return (
        <>
            <FrontendLayout>
                <Head title="Contact us" />
                {/* <!-- landingarea --> */}

                <div className="bg-[#29DB8F]">
                    <div className="container-lg py-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent rounded-lg overflow-hidden">

                        {/* Left Side: Contact Info */}
                        <div className="flex items-center justify-center text-black">
                            <div className="text-left px-8">
                                <h2 className="text-4xl font-extrabold text-gray-900">Get in touch with us</h2>
                                <p className="text-md text-black mt-5">
                                    Complete the form or give us a call: <a href="tel:+16463493411" className="font-bold text-black">+1 646-349-3411</a>.
                                    For support related questions, please <a href="#" className="text-black font-bold">use this form instead</a>.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="p-8 bg-gray-100 rounded-3xl">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder="First name" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                    <input type="text" placeholder="Last name" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                    <input type="email" placeholder="Business Email" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                    <input type="text" placeholder="Job title" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                    <input type="text" placeholder="Company Name" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                    <input type="url" placeholder="Website URL" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                    <select className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300">
                                        <option>Country</option>
                                        {/* Add more country options here */}
                                    </select>
                                    <input type="text" placeholder="Phone Number" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                                </div>
                                <textarea placeholder="Message" className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300 h-32"></textarea>
                                <button type="submit" className="w-full p-3 bg-black text-white rounded-lg">Submit</button>
                                <p className="text-sm text-gray-600 mt-4">
                                    By clicking above you accept our <a href="#" className="text-blue-600">Privacy Policy</a> and agree to receive emails or calls from us.
                                    You can unsubscribe at any time. Trustpilot's calls may be recorded for training and quality purposes.
                                </p>
                                <p className="text-sm text-gray-600">
                                    This site is protected by reCAPTCHA and the Google <a href="#" className="text-blue-600">Privacy Policy</a> and
                                    <a href="#" className="text-blue-600"> Terms of Service</a> apply.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </>
    );
}
