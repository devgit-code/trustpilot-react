import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const CategoriesCreate = ({ onClose }) => {
    const { flash } = usePage().props;
    const [preview, setPreview] = useState(null); // Preview URL

    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        image:null,
        name: '',
        status: 1,
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

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => {
                // onClose();
            },
        });
    };


    return (
        <div className='container-wrapper m-4'>
            <div className="row justify-center">
                <div className="col-lg-8 card p-3 ">


                    <h4>Create Category</h4>
                    {flash.message && (
                        <div className="alert">{flash.message}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='mt-2'>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e)=>setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

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

                        {preview && (
                            <div className='mt-2'>
                                <p className='text-gray-700'>Preview:</p>
                                <img src={preview} alt="Image Preview" style={{ maxWidth: '64px', maxHeight: '64px' }} />
                            </div>
                        )}

                        <div className='mt-2'>
                            <button type="submit" className="btn btn-primary m-2">
                                Create
                            </button>
                            <Link href={route('admin.categories.index')} className="btn btn-danger">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoriesCreate;

CategoriesCreate.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
