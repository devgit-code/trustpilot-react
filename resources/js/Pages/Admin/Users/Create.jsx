import React, { useState, useRef, useEffect } from 'react';
import { useForm, Link, usePage  } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import "cropperjs/dist/cropper.css";
import ImageCropper from "@/Components/ImageCropper";
import profileNotPreviewImg from '@/../images/profile-not-found.png';

const Create = ({ userProfile }) => {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);
    const previewImageRef = useRef(null);
    const croppedImageRef = useRef(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        verified: true,
        phone: '',
        address: '',
        croppedImage:'',
    });

    const handleInputChange = (e) => {
        const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        setData('phone', input);
    };

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

    const handleBack = (e) => {
        e.preventDefault();

        if (window.history.length > 1) {
            window.history.back();
        } else {
            Inertia.visit(fallbackRoute);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            verified: true,
            croppedImage: '',
            phone: '',
            address: ''
        })
        previewImageRef.current.setAttribute("src", userProfile?.image ? `/storage/images/profile/${userProfile.image}` : profileNotPreviewImg);
        setIsEdit(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        data.croppedImage = croppedImageRef.current.value;
        post(route("admin.users.store"), data, {
            forceFormData: true,
        });
    };

    // Reset form after successful update
    useEffect(() => {
        if (recentlySuccessful) {
            setIsEdit(false)
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
        <>
            <div className="content-wrapper m-4">
                <div className="row justify-center">
                    <div className="col-lg-10">
                        <div className="card p-3">
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h4 className="card_title">Add User</h4>
                                </div>

                                {/* <div className='space-x-2'>
                                    <Link href={route('admin.dashboard')} onClick={handleBack} className="btn btn-primary" type="button">
                                        Back
                                    </Link>
                                </div> */}
                            </div>
                            <form onSubmit={handleSubmit} className="modal_form mt-4">
                                <div className='row gx-6 mb-3'>
                                    <div className="col-lg-6 space-y-5">
                                        <h5 className="card-title">User Info</h5>
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />

                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                autoComplete="name"
                                            />

                                            <InputError className="mt-2" message={errors.name} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email" />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                value={data.email}
                                                onChange={(e)=>setData('email', e.target.value)}
                                                required
                                                autoComplete="email"
                                            />

                                            <InputError className="mt-2" message={errors.email} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="password" value="Password" />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="verified" value="Email Verified" className='inline'/>

                                            <TextInput
                                                id="verified"
                                                type="checkbox"
                                                className="mt-1 ml-2"
                                                checked={data.verified}
                                                onChange={(e)=>setData('verified', !data.verified)}
                                            />

                                            <InputError className="mt-2" message={errors.verified} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 space-y-5">
                                        <h5 className="card-title">User Profile</h5>

                                        <div>
                                            <label className="pb-2 fw-medium">
                                                Upload Image
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
                                            <input
                                                type="hidden"
                                                ref={croppedImageRef}
                                                name="croppedImage"
                                            />
                                        </div>

                                        <img
                                            ref={previewImageRef}
                                            className=""
                                            src={userProfile?.image ? `/storage/images/profile/${userProfile.image}` : profileNotPreviewImg}
                                            alt="preview image"
                                            width="128"
                                            height="128"
                                        />

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
                                    </div>
                                </div>

                                <div className='mt-3'>
                                    <button type="submit" className="btn btn-danger">
                                        Save
                                    </button>
                                    {/* <button onClick={handleCancel} className="ml-3 btn btn-success">
                                        Back
                                    </button> */}
                                    <Link href={route('admin.dashboard')} onClick={handleBack} className="btn btn-primary ml-2" type="button">
                                        Back
                                    </Link>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Create;
