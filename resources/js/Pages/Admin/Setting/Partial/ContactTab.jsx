import { Transition } from '@headlessui/react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import React from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ContactTab({businessProfile}){
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        phone: businessProfile?.phone || '',
        location: businessProfile?.location || '',
    });

    const submit = (e) => {
        e.preventDefault();
        data.croppedImage = croppedImageRef.current.value;
        patch(route("profile.setting.update"), data, { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 mx-3">
            <div>
                <InputLabel htmlFor="phone" value="Phone" />

                <TextInput
                    id="phone"
                    name="phone"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.phone}
                    onChange={(e)=>setData('phone', e.target.value)}
                    autoComplete="phone"
                />

                <InputError className="mt-2" message={errors.phone} />
            </div>

            <div>
                <InputLabel htmlFor="location" value="Location" />

                <TextInput
                    id="location"
                    name="location"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.location}
                    onChange={(e)=>setData('location', e.target.value)}
                    autoComplete="location"
                />

                <InputError className="mt-2" message={errors.location} />
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
