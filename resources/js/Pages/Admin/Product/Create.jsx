import React from 'react';
import AdminLayout from '@/Layouts/adminLayout';
import { router, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const Create = () => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('business.products.store'), {
            onSuccess: () => {
                router.visit(route('business.products.index'));
            },
        });
    };

    return (
        <div className="m-3 content-wrapper">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Product</h4>
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
                                <button type="submit" className="btn btn-primary m-2" disabled={processing}>
                                    Create
                                </button>
                                <a href={route('business.products.index')} className="btn btn-danger" type="button">
                                    Back
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Create.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default Create;
