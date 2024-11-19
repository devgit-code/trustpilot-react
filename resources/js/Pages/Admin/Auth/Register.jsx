import { Head, Link, useForm } from '@inertiajs/react';
import React, {useState, useEffect} from 'react';

import AdminGuestLayout from '@/Layouts/AdminGuestLayout';
import fav from '@/../images/favicon.png'
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route('login'));
    // };

    return (
        <>
            <AdminGuestLayout>
                <Head title="Business Register" />

                <div className="p-8 bg-gray-50 rounded-3xl">
                    <h3 className='text-center'>Register Business</h3>

                    <div className="flex justify-center ">
                        <Link href={route('home')} className="mt-2"><img src={fav} alt="logo" style={{height:"8rem"}}/></Link>
                    </div>
                    <form className="mt-5 space-y-4">
                        <div className="flex flex-col gap-4">

                            <input
                                type="url" placeholder="Website URL" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                            <input type="text" placeholder="Company Name" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                            <input type="text" placeholder="First name" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                            <input type="text" placeholder="Last name" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                            <input type="text" placeholder="Job title" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                            <input type="email" placeholder="Business Email" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                            <input type="text" placeholder="Phone Number" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300" />
                        </div>
                        <textarea placeholder="Message" className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300 h-32"></textarea>
                        <button type="submit" className="w-full p-2 bg-black text-white rounded-lg">Submit</button>
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
            </AdminGuestLayout>
        </>
    );
}
