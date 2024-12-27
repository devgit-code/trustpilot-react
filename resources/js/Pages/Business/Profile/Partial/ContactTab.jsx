import React, { useState } from 'react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import profileNotLogo from '@/../images/company-logo.png';

export default function ContactTab({businessProfile}){
    const [preview, setPreview] = useState(null); // Preview URL
    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        email: businessProfile?.email || '',
        phone: businessProfile?.phone || '',
        location: businessProfile?.location || '',
        description: businessProfile?.description || '',
        image:null
    });

    const handleInputChange = (e) => {
        const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        setData('phone', input);
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        clearErrors();

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

        clearErrors();
        post(route("yonetici.profile.update.contact"), data, { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 mx-3">

            <div>
                <InputLabel htmlFor="image-file" value="Business Logo" />

                <input
                    // ref={inputRef}
                    className="mt-2 form-control"
                    id="image-file"
                    name="image"
                    type="file"
                    aria-label="file example"
                    onChange={handleFileChange}
                />

                <InputError className="mt-2" message={errors.image} />
            </div>

            {preview ? (
                <div>
                    <p className='text-gray-700'>Preview:</p>
                    <img src={preview} alt="Image Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            ):(
                <div>
                    <p className='text-gray-700'>{businessProfile?.logo ? '' : 'No Business logo. Please upload'}</p>
                    <img src={businessProfile?.logo ? `/storage/images/logo/${businessProfile.logo}` : profileNotLogo}
                        alt="Business-logo"
                        style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            )}

            <div>
                <InputLabel htmlFor="description" value="Description" />

                <textarea
                    className="form-control mt-2"
                    name="description"
                    id="description"
                    rows="7"
                    style={{ height: "auto" }}
                    value={data.description}
                    placeholder='Tell your customers what makes you unique. We recommend writing at least 200 words about your company. '
                    onChange={(e) => setData('description', e.target.value)}
                ></textarea>

                <InputError className="mt-2" message={errors.description} />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1 block w-full"
                    isFocused
                    value={data.email}
                    onChange={(e)=>setData('email', e.target.value)}
                    autoComplete="email"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            <div>
                <InputLabel htmlFor="phone" value="Phone" />

                <TextInput
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full"
                    value={data.phone}
                    onChange={handleInputChange}
                    autoComplete="phone"
                    maxLength={12}
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
