import React from 'react';
import AdminLayout from '@/Layouts/adminLayout';
import { router, useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, errors, post, processing } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.reviews.store'), {
            onSuccess: () => {
                router.visit(route('admin.reviews.index'));
            },
        });
    };

    return (
        <div className="m-3 content-wrapper">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Review</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title" className='fw-bold py-2'>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={data.title || ''}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary m-2" disabled={processing}>
                                Create
                            </button>
                            <a href={route('admin.reviews.index')} className="btn btn-danger" type="button">
                                Back
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Create.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default Create;
