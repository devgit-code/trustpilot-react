import { Link, useForm } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';

import RatingAverage from '@/Components/RatingAverage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

import profileNotLogo from '@/../images/company-logo.png';
import { BsFillExclamationOctagonFill } from "react-icons/bs"

export default function BusinessInfo({ business, trustscore, has_reviews }){

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        company_name: business.company_name,
        company_email: business.company_email,
        description: business.profile?.description || '',
        first_name: business.first_name || '',
        last_name: business.last_name || '',
        job_title: business.job_title || '',
        image:null,
        email: business.profile?.email || '',
        phone: business.profile?.phone || '',
        location: business.profile?.location || '',
    });

    const [isEdit, setIsEdit] = useState(false);
    const [preview, setPreview] = useState(null); // Preview URL

    const handleBack = (e) => {
        e.preventDefault();

        if (window.history.length > 1) {
            window.history.back();
        } else {
            Inertia.visit(fallbackRoute);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        setData('phone', input);
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setData({
            company_name: business.company_name,
            company_email: business.company_email,
            first_name: business.first_name || '',
            last_name: business.last_name || '',
            job_title: business.job_title || '',
            image:null,
            description: business.profile?.description || '',
            email: business.profile?.email || '',
            phone: business.profile?.phone || '',
            location: business.profile?.location || '',
        })
        // previewImageRef.current.setAttribute("src", userProfile?.image ? `/storage/images/profile/${userProfile.image}` : profileNotPreviewImg);
        setIsEdit(false)
        setPreview(null)
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.businesses.change', business.id), data, {
            forceFormData: true,
        });
    };

    // Reset form after successful update
    useEffect(() => {
        if (recentlySuccessful) {
            setIsEdit(false)
            // if (inputRef.current) {
            //     inputRef.current.value = null;
            // }

            // // Reset the cropped image reference
            // if (croppedImageRef.current) {
            //     croppedImageRef.current = null;
            // }
        }
    }, [recentlySuccessful]);

    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <h4 className="card-title">View Business <a className='font-bold text-gray-800 capitalize italic'>{business.company_name}</a></h4>

                </div>

                <div className='space-x-2'>
                    {
                        !isEdit && (
                            <button onClick={()=>setIsEdit(true)} className={`btn btn-success`} type="button">
                                Edit Business
                            </button>
                        )
                    }
                    <Link href={route('admin.dashboard')} onClick={handleBack} className="btn btn-primary" type="button">
                        Back
                    </Link>
                </div>
            </div>
            <div className='flex items-center mt-3'>
                <div className='flex space-x-3'>
                    {(!isEdit && business.company_email && !business.email_verified_at) && (
                        <Link href={route('admin.businesses.verify', business.id)} as="button" method="post" className='ml-6 btn btn-outline-info'>Verify This Company</Link>
                    )}
                    {
                        !business.company_email && (
                            <p className={`bg-red-200 mb-0 py-1 px-3 rounded-sm  inline-flex text-sm items-center`}>
                                <BsFillExclamationOctagonFill className='text-danger text-lg'/>
                                <span className='ml-3 text-gray-700 uppercase text-xs font-bold'>Unclaimed Company</span>
                            </p>
                        )
                    }
                    <p className={`${business.email_verified_at ? 'bg-green-200' : 'bg-red-300'} mb-0 py-1 px-3 rounded-sm  inline-flex text-sm items-center`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="inline mr-1">
                            <path fill={`${business.email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                            <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                        </svg>
                        <span className='text-gray-700 uppercase text-xs font-bold'>{business.email_verified_at ? 'Verified Company' : 'Unverified Company'}</span>
                    </p>
                </div>
                <div className='ml-4 flex items-center'>
                    <RatingAverage className="inline-flex px-2" width="w-6" height="w-6" rating={trustscore}/>
                    <span className='ml-2 text-gray-800'>({has_reviews} reviews)</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6 mx-3">
                <div className='row mb-3'>
                    <div className='col-lg-6 space-y-5'>
                        <div className=' space-y-4'>
                            <h5 className="card-title">Business Info</h5>

                            <div>
                                <InputLabel htmlFor="website" value="Company Domain" />

                                <TextInput
                                    id="website"
                                    name="website"
                                    type="url"
                                    className="mt-1 block w-full bg-gray-100"
                                    value={business.website}
                                    disabled
                                />

                                <InputError className="mt-2" message={errors.website} />
                            </div>

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
                                    disabled={!isEdit}
                                    autoComplete="company name"
                                />

                                <InputError className="mt-2" message={errors.company_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="company_email" value="Company Email" />

                                <TextInput
                                    type="email"
                                    id="company_email"
                                    name="company_email"
                                    className="mt-1 block w-full"
                                    value={data.company_email}
                                    onChange={(e)=>setData('company_email', e.target.value)}
                                    disabled={!isEdit}
                                    autoComplete="company_email"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="first_name" value="First Name" />

                                <TextInput
                                    id="first_name"
                                    name="first_name"
                                    className="mt-1 block w-full"
                                    value={data.first_name}
                                    onChange={(e)=>setData('first_name', e.target.value)}
                                    disabled={!isEdit}
                                    autoComplete="first_name"
                                />

                                <InputError className="mt-2" message={errors.first_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="last_name" value="Last Name" />

                                <TextInput
                                    id="last_name"
                                    name="last_name"
                                    className="mt-1 block w-full"
                                    value={data.last_name}
                                    onChange={(e)=>setData('last_name', e.target.value)}
                                    disabled={!isEdit}
                                    autoComplete="last name"
                                />

                                <InputError className="mt-2" message={errors.last_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="job_title" value="Job Title" />

                                <TextInput
                                    id="job_title"
                                    name="job_title"
                                    className="mt-1 block w-full"
                                    value={data.job_title}
                                    onChange={(e)=>setData('job_title', e.target.value)}
                                    disabled={!isEdit}
                                    autoComplete="job_title"
                                />

                                <InputError className="mt-2" message={errors.job_title} />
                            </div>
                        </div>
                        {/* <div className='mt-5 space-y-4'>
                            <h5 className="card-title">Business Category</h5>
                            <div className='ml-3'>
                                {
                                    business.business_categories.length === 0 ? (
                                        <span className='text-gray-700 text-base bg-warning px-3 py-2 rounded'>No category</span>
                                    ):(
                                        <ul className='list-circle m-0 p-0 space-y-2' style={{listStyle:'circle'}}>
                                            {
                                                business.business_categories .map((category, index) => (
                                                    <li key={index} className='text-left p-0'>
                                                        <a className='no-underline text-sm capitalize text-gray-500'>
                                                        {category.sub_category.name} {category.is_primary === 1 && (<span className='ml-2 text-gray-300 bg-primary px-2 py-1 rounded'>primary</span>)}
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                        </div> */}
                    </div>
                    <div className='col-lg-6 space-y-4'>
                        <h5 className="card-title">Business Profile</h5>
                        {
                            isEdit && (
                                <>
                                    <input
                                        // ref={inputRef}
                                        className="form-control"
                                        id="image-file"
                                        name="image"
                                        type="file"
                                        aria-label="file example"
                                        onChange={handleFileChange}
                                    />
                                </>

                            )
                        }

                        {preview ? (
                            <div>
                                <p className='text-gray-700'>Preview:</p>
                                <img src={preview} alt="Image Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                            </div>
                        ):(
                            <div>
                                <p className='text-gray-700'>{business.profile?.logo ? '' : 'No Business logo'}</p>
                                <img src={business.profile?.logo ? `/storage/images/logo/${business.profile.logo}` : profileNotLogo}
                                    alt="Business-logo"
                                    className='border'
                                    style={{ maxWidth: '200px', maxHeight: '200px' }} />
                            </div>
                        )}

                        <div>
                            <InputLabel htmlFor="description" value="Description" />

                            <textarea
                                className="form-control mt-2"
                                name="description"
                                id="description"
                                rows="6"
                                disabled={!isEdit}
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
                                disabled={!isEdit}
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
                                disabled={!isEdit}
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
                                className="mt-1 block w-full mb-3"
                                value={data.location}
                                disabled={!isEdit}
                                onChange={(e)=>setData('location', e.target.value)}
                                autoComplete="location"
                            />

                            <InputError className="mt-2" message={errors.location} />
                        </div>
                    </div>
                </div>

                {
                    isEdit && (
                        <div className='mt-3'>
                            <button type="submit" className="btn btn-danger">
                                Save
                            </button>
                            <button onClick={handleCancel} className="ml-3 btn btn-success">
                                Cancel
                            </button>
                        </div>
                    )
                }
            </form>
        </>
    )
}
