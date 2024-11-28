import { Transition } from '@headlessui/react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import React, { useState, useRef } from 'react';

import profileNotLogo from '@/../images/company-logo.png';
import PrimaryButton from '@/Components/PrimaryButton';

export default function LogoTab({businessProfile}){

    const [preview, setPreview] = useState(null); // Preview URL
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        image: null,
    });

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        console.log('image---', file)

        // Generate preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            // setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (!data.image) {
            return;
        }

        put(route("admin.settings.update.logo"), data, { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 mx-3">
            <div>
                <input
                    // ref={inputRef}
                    className="form-control"
                    id="image-file"
                    name="image"
                    type="file"
                    aria-label="file example"
                    onChange={handleFileChange}
                />
            </div>

            {preview ? (
                <div>
                    <p className='text-gray-700'>Preview:</p>
                    <img src={preview} alt="Image Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            ):(
                <div>
                    <p className='text-gray-700'>{businessProfile.logo ? 'Company Logo' : 'No Business logo. Please upload'}</p>
                    <img src={businessProfile.logo ? `/storage/images/profile/${businessProfile.logo}` : profileNotLogo}
                        alt="Business-logo"
                        style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            )}

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
