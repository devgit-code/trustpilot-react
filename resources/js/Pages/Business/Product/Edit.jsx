import AdminLayout from '@/Layouts/adminLayout';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const Edit = ({ product }) => {
    const { data, setData, put, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('business.products.update', product.id), data);
    };

    return (
        <div className="content-wrapper m-4">
            <div className="row justify-center">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit Product</h4>
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

                                <div>
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
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-primary mr-3">
                                        Update
                                    </button>
                                    <Link href={route('business.products.index')} className="btn btn-danger" type="button">
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

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Edit;

