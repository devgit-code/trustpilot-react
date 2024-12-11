import React, {useState} from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { RiArrowRightSLine } from "react-icons/ri";

const SubCategoryEdit = ({ subCategory, category, onClose }) => {
    const { flash } = usePage().props;
    const [preview, setPreview] = useState(null); // Preview URL

    const { data, setData, post, errors, clearErrors, } = useForm({
        image:null,
        name: subCategory.name || '',
        category_id: subCategory.category_id,
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
        post(route('admin.sub_categories.update', subCategory.id), {
            onSuccess: () => {
                // onClose();
            },
        });
    };

    return (
        <div className='container-wrapper mt-4'>
            <div className="row justify-center">
                <div className="col-lg-8">
                    <div className='flex items-center'>
                        <Link href={route('admin.categories.index')} className='text-gray-500 font-bold no-underline hover:underline capitalize'>Categories</Link>
                        <RiArrowRightSLine className='m-2'/>
                        <Link href={route('admin.sub_categories.index', category.id)}className='text-gray-800 font-bold no-underline hover:underline capitalize'>{category.name}</Link>
                    </div>

                    <div className='card p-3 mt-2'>
                        <h4>Edit Sub Category</h4>
                        {flash.message && (
                            <div className="alert">{flash.message}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="category_id">Parent Category</label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    className="form-control shadow-none"
                                    disabled
                                >
                                    <option value={subCategory.category.id}>{subCategory.category.name}</option>
                                </select>
                            </div>

                            <div className='mt-4'>
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

                            <div className='my-4'>
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

                            {preview ? (
                                <div className='mt-2'>
                                    <p className='text-gray-700'>Preview:</p>
                                    <img src={preview} alt="Image Preview" style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                </div>
                            ):(
                                <>
                                {subCategory.image ? (
                                    <img src={`/storage/${subCategory.image}`}
                                        alt="category-logo"
                                        className='inline'
                                        style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                ):(
                                    <>No image</>
                                )}
                                </>
                            )}

                            <div className='mt-3'>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <Link href={route('admin.sub_categories.index', subCategory.category_id)} className="ml-3 btn btn-danger">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

SubCategoryEdit.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default SubCategoryEdit;
