import React, { useState, } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const Create = () => {
    const [preview, setPreview] = useState(null); // Preview URL

    const { data, setData, errors, clearErrors, post, processing } = useForm({
        image:null,
        name: '',
        description: '',
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('yonetici.products.store'), {
            onSuccess: () => {
            },
        });
    };

    return (
        <div className="content-wrapper m-4">
            <div className="row justify-center">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">

                            <h4 className="card-title">New Product</h4>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6 mx-3">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e)=>setData('name', e.target.value)}
                                        // required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                {/* <div>
                                    <InputLabel htmlFor="description" value="Description" />

                                    <TextInput
                                        id="description"
                                        name="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e)=>setData('description', e.target.value)}
                                        // required
                                    />

                                    <InputError className="mt-2" message={errors.description} />
                                </div> */}

                                <div className='mt-4'>
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
                                </div>

                                <div className='mt-2 min-h-16'>
                                    {preview && (
                                        <>
                                            <p className='text-gray-700'>Preview:</p>
                                            <img src={preview} alt="Image Preview" style={{ maxWidth: '128px', maxHeight: '128px' }} />
                                        </>
                                    )}
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-primary m-2" disabled={processing}>
                                        Add
                                    </button>
                                    <Link href={route('yonetici.products.index')} className="btn btn-danger" type="button">
                                        Back
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Create.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default Create;
