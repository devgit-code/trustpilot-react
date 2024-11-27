import React from 'react';
import AdminLayout from '@/Layouts/adminLayout';
import { router, useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, errors, post, processing } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.products.store'), {
            onSuccess: () => {
                router.visit(route('admin.products.index'));
            },
        });
    };

    return (
        <div className="m-3 content-wrapper">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Product</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className='fw-bold py-2'>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={data.name || ''}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary m-2" disabled={processing}>
                                Create
                            </button>
                            <a href={route('admin.products.index')} className="btn btn-danger" type="button">
                                Back
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

PermissionCreate.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default PermissionCreate;
