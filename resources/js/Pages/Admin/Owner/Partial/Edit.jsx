import React, { useState, useRef, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function({item}) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        company_email: business.company_email,
        first_name: business.first_name || '',
        last_name: business.last_name || '',
        job_title: business.job_title || '',
    });

    return (

        <div className=' space-y-4'>
            <h5 className="card-title">Business Info for {item.website}</h5>

            <div>
                <InputLabel htmlFor="website" value="Company Domain" />

                <TextInput
                    id="website"
                    name="website"
                    type="url"
                    className="mt-1 block w-full bg-gray-100"
                    value={business.website}
                    disabled
                />

                <InputError className="mt-2" message={errors.website} />
            </div>

            <div>
                <InputLabel htmlFor="company_name" value="Company Name" />

                <TextInput
                    id="company_name"
                    name="company_name"
                    className="mt-1 block w-full"
                    value={data.company_name}
                    onChange={(e)=>setData('company_name', e.target.value)}
                    required
                    isFocused
                    disabled
                    autoComplete="company name"
                />

                <InputError className="mt-2" message={errors.company_name} />
            </div>

            <div>
                <InputLabel htmlFor="company_email" value="Company Email" />

                <TextInput
                    type="email"
                    id="company_email"
                    name="company_email"
                    className="mt-1 block w-full"
                    value={business.is_approved === 1 ? data.company_email : ''}
                    onChange={(e)=>setData('company_email', e.target.value)}
                    disabled
                    autoComplete="company_email"
                />
            </div>

            <div>
                <InputLabel htmlFor="first_name" value="First Name" />

                <TextInput
                    id="first_name"
                    name="first_name"
                    className="mt-1 block w-full"
                    value={business.is_approved === 1 ? data.first_name : ''}
                    onChange={(e)=>setData('first_name', e.target.value)}
                    disabled
                    autoComplete="first_name"
                />

                <InputError className="mt-2" message={errors.first_name} />
            </div>

            <div>
                <InputLabel htmlFor="last_name" value="Last Name" />

                <TextInput
                    id="last_name"
                    name="last_name"
                    className="mt-1 block w-full"
                    value={business.is_approved === 1 ? data.last_name : ''}
                    onChange={(e)=>setData('last_name', e.target.value)}
                    disabled
                    autoComplete="last name"
                />

                <InputError className="mt-2" message={errors.last_name} />
            </div>

            <div>
                <InputLabel htmlFor="job_title" value="Job Title" />

                <TextInput
                    id="job_title"
                    name="job_title"
                    className="mt-1 block w-full"
                    value={business.is_approved === 1 ? data.job_title : ''}
                    onChange={(e)=>setData('job_title', e.target.value)}
                    disabled
                    autoComplete="job_title"
                />

                <InputError className="mt-2" message={errors.job_title} />
            </div>
        </div>

    )
}
