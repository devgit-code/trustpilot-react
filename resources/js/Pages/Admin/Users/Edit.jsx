import React, { useState, useRef } from 'react';
import { useForm, Link } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import "cropperjs/dist/cropper.css";
import ImageCropper from "@/Components/ImageCropper";
import profileNotPreviewImg from '@/../images/profile-not-found.png';

const Edit = ({ user, userProfile }) => {

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

    return (
        <>
            <div className="content-wrapper m-3">
                <div className="card p-3">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h3 className="pro_heading">View User</h3>
                        </div>
                        <Link
                            as="button"
                            href={route('admin.users.index')}
                            className="btn btn-primary mb-3" >
                            Back
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="modal_form">
                        <div className='row gx-6'>
                            <div className="col-lg-6 space-y-5">
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
                            <div className="col-lg-6 space-y-5">
                                <img
                                    ref={previewImageRef}
                                    className=""
                                    src={userProfile.image ? `/storage/images/profile/${userProfile.image}` : profileNotPreviewImg}
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
            </div>
        </>
    );
};

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Edit;
