import React, { useState,} from 'react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function HomeTab({business, businessProfile}){
    const { data, setData, post, errors, processing, recentlySuccessful, clearErrors } = useForm({
        company_name: business.company_name,
        first_name: business.first_name,
        last_name: business.last_name,
        job_title: business.job_title,
        // website: business.website,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("yonetici.profile.update.home"), data);
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 mx-3">
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
                    autoComplete="company name"
                />

                <InputError className="mt-2" message={errors.company_name} />
            </div>

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
                <InputLabel htmlFor="cmail" value="Company Domain" />

                <TextInput
                    id="cmail"
                    name="cmail"
                    type="url"
                    className="mt-1 block w-full bg-gray-100"
                    value={business.company_email}
                    disabled
                />

                <InputError className="mt-2" message={errors.website} />
            </div>

            <div>
                <InputLabel htmlFor="first_name" value="First Name" />

                <TextInput
                    id="first_name"
                    name="first_name"
                    className="mt-1 block w-full"
                    value={data.first_name}
                    onChange={(e)=>setData('first_name', e.target.value)}
                    required
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
                    value={data.last_name}
                    onChange={(e)=>setData('last_name', e.target.value)}
                    required
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
                    value={data.job_title}
                    onChange={(e)=>setData('job_title', e.target.value)}
                    required
                    autoComplete="job_title"
                />

                <InputError className="mt-2" message={errors.job_title} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>

    )
}
