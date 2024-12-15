import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import BlogEditor from './BlogEditor';

const Create = ({ }) => {
    const [preview, setPreview] = useState(null); // Preview URL

    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        image:null,
        title: '',
        content: '',
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

        post(route('admin.blogs.store'), {
            onSuccess: () => {
                // onClose();
            },
        });
    };


    return (
        <div className='container-wrapper m-4'>
            <div className="row justify-center">
                <div className="col-lg-8 card p-3 ">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h4>Write Blog</h4>
                        </div>

                        <Link href={route('admin.blogs.index')} className="btn btn-primary">
                            Back
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='mt-2'>
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e)=>setData('title', e.target.value)}
                                required
                                isFocused
                                autoComplete="title"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className='mt-4'>
                            <InputLabel htmlFor="image-file" value="Set symbolic Image for Blog" />

                            <input
                                // ref={inputRef}
                                className="mt-2 form-control"
                                id="image-file"
                                name="image"
                                type="file"
                                aria-label="file example"
                                onChange={handleFileChange}
                            />

                            <InputError className="mt-2" message={errors.image} />
                        </div>

                        <div className='mt-2 min-h-[128px]'>
                            {preview && (
                                <>
                                   <p className='text-gray-700'>Preview:</p>
                                   <img src={preview} alt="Image Preview" style={{ maxWidth: '128px', maxHeight: '128px' }} />
                                </>
                            )}
                        </div>

                        <div className='mt-2'>
                            <InputLabel htmlFor="content" value="Content" />

                            <TextInput
                                id="content"
                                name="content"
                                className="mt-1 block w-full"
                                value={data.content}
                                onChange={(e)=>setData('content', e.target.value)}
                                required
                                autoComplete="content"
                            />

                            <InputError className="mt-2" message={errors.content} />
                        </div>


                        {/* <BlogEditor /> */}

                        <PrimaryButton className="mt-3 ml-2 bg-success" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Create;

Create.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
