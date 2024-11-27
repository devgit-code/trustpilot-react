import { Transition } from '@headlessui/react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import React from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function HomeTab({auth, businessProfile}){
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        about_us: businessProfile?.about_us || '',
        description: businessProfile?.description || '',
        company_name: auth.company_name,
    });

    const submit = (e) => {
        e.preventDefault();
        data.croppedImage = croppedImageRef.current.value;
        patch(route("profile.setting.update"), data, { forceFormData: true });
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
                    // required
                    isFocused
                    autoComplete="company_name"
                />

                <InputError className="mt-2" message={errors.company_name} />
            </div>

            <div>
                <InputLabel htmlFor="about_us" value="About us" />

                <TextInput
                    id="about_us"
                    name="about_us"
                    className="mt-1 block w-full"
                    value={data.about_us}
                    onChange={(e)=>setData('about_us', e.target.value)}
                    // required
                    isFocused
                    autoComplete="about_us"
                />

                <InputError className="mt-2" message={errors.about_us} />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />

                <TextInput
                    id="description"
                    name="description"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.description}
                    onChange={(e)=>setData('description', e.target.value)}
                    autoComplete="description"
                />

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
