import { Link, useForm } from '@inertiajs/react';
import React, {useState} from 'react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ReviewTable from '@/Components/ReviewTable';

import profileNotLogo from '@/../images/company-logo.png';

const Show = ({ business, has_reviews }) => {
    const table_setting = {
        title: 'Reviews',
        url: '/api/admin/businesses/' + business.id,
        show_link: 'admin.reviews.show',
        header_name:'user'
    }

    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        company_name: business.company_name,
        website: business.website,
        description: business.profile?.description || '',
        first_name: business.first_name,
        last_name: business.last_name,
        job_title: business.job_title,
        image:null,
        email: business.profile?.email || '',
        phone: business.profile?.phone || '',
        location: business.profile?.location || '',
    });
    const [preview, setPreview] = useState(null); // Preview URL

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.businesses.update', business.id), data);
    };

    return (
        <div className="content-wrapper m-3 mx-5">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className='flex items-center justify-between'>
                            <div className=''>
                                <h4 className="card-title">View Business</h4>
                            </div>
                            <Link href={route('admin.businesses.index')} className="btn btn-primary" type="button">
                                Back
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6 mx-3">
                            <div className='row'>
                                <div className='col-lg-6 space-y-5'>
                                    <p className={`${business.email_verified_at ? 'bg-green-200' : 'bg-red-300'} mb-0 py-1 px-3 rounded-sm  inline-flex text-sm items-center`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="inline mr-1">
                                            <path fill={`${business.email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                                            <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                                        </svg>
                                        <span className='text-gray-700 uppercase text-xs font-bold'>{business.email_verified_at ? 'Verified Company' : 'Unverified Company'}</span>
                                    </p>

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
                                            disabled
                                            autoComplete="company name"
                                        />

                                        <InputError className="mt-2" message={errors.company_name} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="website" value="Company Domain" />

                                        <TextInput
                                            id="website"
                                            name="website"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={data.website}
                                            onChange={(e)=>setData('website', e.target.value)}
                                            disabled
                                            required
                                            autoComplete="website"
                                        />

                                        <InputError className="mt-2" message={errors.website} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="first_name" value="First Name" />

                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            className="mt-1 block w-full"
                                            value={data.first_name}
                                            onChange={(e)=>setData('first_name', e.target.value)}
                                            disabled
                                            required
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
                                            disabled
                                            required
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
                                            disabled
                                            required
                                            autoComplete="job_title"
                                        />

                                        <InputError className="mt-2" message={errors.job_title} />
                                    </div>
                                </div>
                                <div className='col-lg-6 space-y-5 my-3'>
                                    {/* <div>
                                        <input
                                            // ref={inputRef}
                                            className="form-control"
                                            id="image-file"
                                            name="image"
                                            type="file"
                                            aria-label="file example"
                                            onChange={handleFileChange}
                                        />

                                        <InputError className="mt-2" message={errors.image} />
                                    </div> */}

                                    {preview ? (
                                        <div>
                                            <p className='text-gray-700'>Preview:</p>
                                            <img src={preview} alt="Image Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                        </div>
                                    ):(
                                        <div>
                                            <p className='text-gray-700'>{business.profile?.logo ? 'Company Logo' : 'No Business logo'}</p>
                                            <img src={business.profile?.logo ? `/storage/images/logo/${business.profile.logo}` : profileNotLogo}
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
                                            rows="6"
                                            disabled
                                            style={{ height: "auto" }}
                                            value={data.description}
                                            placeholder='Tell your customers what makes you unique. We recommend writing at least 200 words about your company. '
                                            onChange={(e) => setData('description', e.target.value)}
                                        ></textarea>

                                        <InputError className="mt-2" message={errors.description} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="email" />

                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            disabled
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
                                            disabled
                                            // onChange={handleInputChange}
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
                                            disabled
                                            onChange={(e)=>setData('location', e.target.value)}
                                            autoComplete="location"
                                        />

                                        <InputError className="mt-2" message={errors.location} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
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
    );
};

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Show;

