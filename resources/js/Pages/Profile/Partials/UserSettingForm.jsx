import React, { useState, useRef, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImageCropper from "@/Components/ImageCropper";
import "cropperjs/dist/cropper.css";

import profileNotPreviewImg from '@/../images/profile-not-found.png';

export default function UserSettingForm({className = '', userProfile}) {

    const { auth } = usePage().props;

    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);
    const previewImageRef = useRef(null);
    const croppedImageRef = useRef(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        phone: userProfile?.phone || '',
        address: userProfile?.address || '',
        croppedImage: userProfile?.image || '',
    });

    const handleImageChange = (e) => {
        const file = inputRef.current?.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setShow(true);
            };
            reader.readAsDataURL(inputRef.current.files[0]);
        }else{//
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        setData('phone', input);
    };

    const setCroppedImage = (data) => {
        previewImageRef.current.setAttribute("src", data);
        croppedImageRef.current.setAttribute("value", data);
        setShow(false);
        setImage(null);
    };

    const handleCancelCrop = () => {
        inputRef.current.value = '';
        setShow(false);
        setImage(null);
    }

    const submit = (e) => {
        e.preventDefault();

        data.croppedImage = croppedImageRef.current.value;
        patch(route("profile.setting.update"), data, { forceFormData: true });
    };

    // Reset form after successful update
    useEffect(() => {
        if (recentlySuccessful) {
            if (inputRef.current) {
                inputRef.current.value = null;
            }

            // Reset the cropped image reference
            if (croppedImageRef.current) {
                croppedImageRef.current = null;
            }
        }
    }, [recentlySuccessful]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">User Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your personal information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div className="row">
                    <div className="col">
                        <input
                            ref={inputRef}
                            className="form-control"
                            id="image-file"
                            name="image"
                            type="file"
                            aria-label="file example"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <input
                    type="hidden"
                    ref={croppedImageRef}
                    name="croppedImage"
                />
                <div className="flex mb-2 items-center">
                    <img
                        ref={previewImageRef}
                        className=""
                        src={userProfile.image ? `/storage/images/profile/${userProfile.image}` : profileNotPreviewImg}
                        alt="preview image"
                        width="128"
                        height="128"
                    />
                    <div className="profile_text ml-5">
                        <span className="d-block fs-5 mb-0 text-gray-800">{auth.user.name}</span>
                        <span className="d-block fs-6 text-gray-700">{auth.user.email}</span>
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        name="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={handleInputChange}
                        // required
                        // isFocused
                        autoComplete="phone"
                        maxLength={12}
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        name="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e)=>setData('address', e.target.value)}
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address} />
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
            {show && (
                <ImageCropper
                    image={image}
                    setCroppedImage={setCroppedImage}
                    onClose={handleCancelCrop}
                    aspectRatio={1}
                />
            )}
        </section>
    );
}
