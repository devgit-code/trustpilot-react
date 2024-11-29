import { Transition } from '@headlessui/react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import React from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function HomeTab({business, businessProfile}){
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        company_name: business.company_name,
        website: business.website,
        description: businessProfile?.description || '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("business.profile.update.home"), data);
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
                    autoComplete="company_name"
                />

                <InputError className="mt-2" message={errors.company_name} />
            </div>

            <div>
                <InputLabel htmlFor="website" value="Company Domain" />

                <TextInput
                    id="website"
                    name="website"
                    type="url"
                    className="mt-1 block w-full"
                    value={data.website}
                    onChange={(e)=>setData('website', e.target.value)}
                    required
                    isFocused
                    autoComplete="website"
                />

                <InputError className="mt-2" message={errors.website} />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />

                <textarea
                    className="form-control mt-2"
                    name="description"
                    id="description"
                    rows="4"
                    style={{ height: "auto" }}
                    value={data.description}
                    placeholder='Tell your customers what makes you unique. We recommend writing at least 200 words about your company. '
                    onChange={(e) => setData('description', e.target.value)}
                ></textarea>

                <InputError className="mt-2" message={errors.description} />
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
