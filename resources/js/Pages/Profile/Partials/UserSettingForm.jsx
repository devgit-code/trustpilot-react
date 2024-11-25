import React, { useState, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import "cropperjs/dist/cropper.css";
import ImageCropper from "@/Components/ImageCropper";

import profilePreviewImg from '@/../images/profile-not-found.png';
const userProfileImage = '/profile/user.png';

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
        let reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setShow(true);
        };
            reader.readAsDataURL(inputRef.current.files[0]);
    };

    const setCroppedImage = (data) => {
        previewImageRef.current.setAttribute("src", data);
        croppedImageRef.current.setAttribute("value", data);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

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
                        <div className="mb-3">
                            <label className="pb-2 fw-medium">
                                Upload Profile Image
                            </label>
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
                </div>

                <input
                    type="hidden"
                    ref={croppedImageRef}
                    name="croppedImage"
                />
                <div className="col-md-2 mb-2">
                    <img
                        ref={previewImageRef}
                        className=""
                        src={profilePreviewImg}
                        alt="preview image"
                        width="128"
                        height="128"
                    />
                    <div className="profile_text mt-4">
                        <span className="d-block fs-6 mb-0">{auth.user.name}</span>
                        <span className="d-block fs-7">{auth.user.email}</span>
                    </div>
                </div>

                {/* <div className="profile text-center mb-5 position-relative">
                    <div className="logo position-absolute top-0 start-0">
                        <i className="bi bi-fire text-white fs-3"></i>
                    </div>


                    <Link href={route("admin.user_profile.show")}> <img
                        src={`/storage/images/${userProfileImage}`}
                        alt="user"
                        className="rounded-circle mx-auto border border-black"
                        width="100"
                        height="102"
                    /></Link>

                    <div className="edit_icon position-absolute">
                        <i className="bi bi-camera text-blue fs-5"></i>
                    </div>
                    <div className="profile_text mt-4">
                        <span className="d-block fs-6 mb-0">{auth.user.name}</span>
                        <span className="d-block fs-7">{auth.user.email}</span>
                    </div>
                </div> */}

                <div>
                    <InputLabel htmlFor="location" value="Location" />

                    <TextInput
                        id="location"
                        className="mt-1 block w-full"
                        value={auth.user.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
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
                    aspectRatio={1}
                />
            )}
        </section>
    );
}
