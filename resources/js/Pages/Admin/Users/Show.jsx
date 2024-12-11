import React, { useState, useRef } from 'react';
import { useForm, Link, usePage  } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ReviewTable from '@/Components/ReviewTable';

import "cropperjs/dist/cropper.css";
import ImageCropper from "@/Components/ImageCropper";
import profileNotPreviewImg from '@/../images/profile-not-found.png';

const Show = ({ user, userProfile, has_reviews }) => {
    const { props } = usePage();
    const page = props.page || 1;
    const table_setting = {
        title: 'Reviews',
        url: '/api/admin/users/' + user.id,
        show_link: 'admin.reviews.show',
        header_name:'business'
    }

    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const previewImageRef = useRef(null);
    const croppedImageRef = useRef(null);
    const inputRef = useRef(null);
    const { data, setData, patch, errors } = useForm({
        name: user.name,
        phone: userProfile?.phone || '',
        email: user.email,
        croppedImage: userProfile?.image || '',
        address: userProfile?.address || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        data.croppedImage = croppedImageRef.current.value;
        patch(route("user_profile.update"), data, { forceFormData: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone" && value.length > 10) {
            return;
          }
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handleBack = (e) => {
        e.preventDefault();
        // Navigate back if possible, otherwise go to the fallback route
        if (window.history.length > 1) {
            window.history.back();
        } else {
            Inertia.visit(fallbackRoute);
        }
    };

    return (
        <>
            <div className="content-wrapper m-4">
                <div className="row justify-center">
                    <div className="col-lg-10">
                        <div className="card p-3">
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className="pro_heading">View User</h3>
                                </div>

                                <Link href={route('admin.dashboard')} onClick={handleBack} className="btn btn-primary" type="button">
                                    Back
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit} className="modal_form">
                                <div className='row gx-6'>
                                    <div className="col-lg-6 space-y-5">
                                        <p className={`${user.email_verified_at ? 'bg-green-200' : 'bg-red-300'} mb-0 py-1 px-3 rounded-sm  inline-flex text-sm items-center`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="inline mr-1">
                                                <path fill={`${user.email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                                                <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                                            </svg>
                                            <span className='text-gray-700 uppercase text-xs font-bold'>{user.email_verified_at ? 'Active' : 'Inactive'}</span>
                                        </p>
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />

                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                disabled
                                                isFocused
                                                autoComplete="name"
                                            />

                                            <InputError className="mt-2" message={errors.name} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email" />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full bg-gray-100"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                disabled
                                                autoComplete="username"
                                            />

                                            <InputError className="mt-2" message={errors.email} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 space-y-5 my-3">
                                        <img
                                            ref={previewImageRef}
                                            className=""
                                            src={userProfile?.image ? `/storage/images/profile/${userProfile.image}` : profileNotPreviewImg}
                                            alt="preview image"
                                            width="128"
                                            height="128"
                                        />

                                        <input
                                            type="hidden"
                                            ref={croppedImageRef}
                                            name="croppedImage"
                                        />

                                        <div>
                                            <InputLabel htmlFor="phone" value="Phone" />

                                            <TextInput
                                                id="phone"
                                                name="phone"
                                                className="mt-1 block w-full"
                                                value={data.phone}
                                                onChange={handleInputChange}
                                                // required
                                                disabled
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
                                                disabled
                                                name="address"
                                                className="mt-1 block w-full"
                                                value={data.address}
                                                onChange={(e)=>setData('address', e.target.value)}
                                                autoComplete="address"
                                            />

                                            <InputError className="mt-2" message={errors.address} />
                                        </div>
                                        {/* <div className="row">
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
                                        </div> */}
                                    </div>
                                </div>

                                {/* <button type="submit" className="update_btn">
                                    Update
                                </button> */}
                            </form>
                            {show && (
                                <ImageCropper
                                    image={image}
                                    setCroppedImage={setCroppedImage}
                                    aspectRatio={1}
                                />
                            )}
                        </div>

                        {
                            has_reviews !== 0 && (
                                <div className='mt-3 p-3 card'>
                                    <ReviewTable setting={table_setting}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Show;
