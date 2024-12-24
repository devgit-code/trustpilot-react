import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import LoadingSpinner from '@/Components/LoadingSpinner';

const Create = ({ results }) => {
    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        companies: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route('admin.businesses.store'), {
            onSuccess: () => {
                // onClose();
            },
        });
    };


    return (
        <div className='container-wrapper m-4'>

            <div className="row justify-center ">
                <div className="col-lg-8 card p-3 relative">
                    {
                        processing && <LoadingSpinner />
                    }

                    <div className={`${processing ? "opacity-10" : "opacity-100"} transition-opacity`}>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h4>Add Bulk Businesses</h4>
                            </div>

                            <Link href={route('admin.businesses.index')} className="btn btn-primary">
                                Back
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className='mt-2'>
                                <InputLabel htmlFor="companies" value="Input Businesses" />

                                <textarea
                                    className="form-control mt-2"
                                    name="companies"
                                    id="companies"
                                    rows="6"
                                    style={{ height: "auto" }}
                                    value={data.companies}
                                    placeholder={`example.com\nanother.com`}
                                    onChange={(e) => setData('companies', e.target.value)}
                                    required
                                ></textarea>

                                <ul className='mt-3'>
                                    {results && (
                                        results.map((item, index) => (
                                            <li key={index} className='my-1'><span className={`px-3 py-1 text-gray-700 ${item.status == 'success' ? 'bg-green-400' : 'bg-red-300'}`}>{item.domain}: {item.status}</span></li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            <div>
                                <PrimaryButton className="mt-3 ml-2 bg-success" disabled={processing}>
                                    Append
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;

Create.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
