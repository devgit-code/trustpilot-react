import { Head, Link, useForm } from '@inertiajs/react';
import React, {useState, useEffect} from 'react';

import AdminGuestLayout from '@/Layouts/AdminGuestLayout';
import InputError from '@/Components/InputError';
import fav from '@/../images/favicon.png'
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        website: '',
        company_name: '',
        first_name: '',
        last_name: '',
        job_title: '',
        domain: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.register'));
    };

    return (
        <>
            <AdminGuestLayout>
                <Head title="Business Register" />

                <div className="p-8 bg-gray-50 rounded-3xl">
                    <div className="flex justify-center mt-3">
                        <Link href={route('home')} className="mt-2"><img src={fav} alt="logo" style={{height:"8rem"}}/></Link>
                    </div>
                    <h3 className='text-center my-4'>Register Business</h3>

                    <form onSubmit={submit} className="space-y-4 mt-4">
                        <div  className="mt-4">
                            <TextInput
                                id="website"
                                type="text"
                                name="website"
                                value={data.website}
                                className="mt-1 block w-full"
                                autoComplete="website"
                                placeholder="Website"
                                isFocused={true}
                                onChange={(e) => setData('website', e.target.value)}
                                required
                            />

                            <InputError message={errors.website} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <TextInput
                                id="company_name"
                                type="text"
                                name="company_name"
                                value={data.company_name}
                                placeholder="Company Name"
                                className="mt-1 block w-full"
                                autoComplete="company name"
                                onChange={(e) => setData('company_name', e.target.value)}
                                required
                            />

                            <InputError message={errors.company_name} className="mt-2" />
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <TextInput
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    placeholder="First Name"
                                    className="mt-1 block w-full"
                                    autoComplete="first name"
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.first_name} className="mt-2" />
                            </div>

                            <div className="">
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    placeholder="Last Name"
                                    className="mt-1 block w-full"
                                    autoComplete="last name"
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>

                        <div className="">
                            <TextInput
                                id="job_title"
                                type="text"
                                name="job_title"
                                value={data.job_title}
                                placeholder="Job Title"
                                className="mt-1 block w-full"
                                autoComplete="job title"
                                onChange={(e) => setData('job_title', e.target.value)}
                                required
                            />

                            <InputError message={errors.job_title} className="mt-2" />
                        </div>

                        <div className="">
                            <div className='flex items-center'>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="Work Email"
                                    className="mt-1 block w-full"
                                    autoComplete="work email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                {/* <span className="text-gray-500 px-2">
                                    {data.domain}
                                </span> */}
                            </div>

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="">
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <button disabled={processing} type="submit" className="w-full mt-4 p-2 bg-black text-white rounded-lg">Submit</button>

                        <div>
                            <p className="text-sm text-gray-600 mt-4">
                                By clicking above you accept our <a href="#" className="text-blue-600">Privacy Policy</a> and agree to receive emails or calls from us.
                                You can unsubscribe at any time. Trustpilot's calls may be recorded for training and quality purposes.
                            </p>
                            <p className="text-sm text-gray-600">
                                This site is protected by reCAPTCHA and the Google <a href="#" className="text-blue-600">Privacy Policy</a> and
                                <a href="#" className="text-blue-600"> Terms of Service</a> apply.
                            </p>
                        </div>
                    </form>
                </div>
            </AdminGuestLayout>
        </>
    );
}
