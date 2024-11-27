import AdminLayout from '@/Layouts/adminLayout';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';

const Edit = ({ product }) => {
    const { data, setData, put } = useForm({
        name: product.name
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.products.update', product.id), data);
    };

    return (
        <div className="content-wrapper">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <Link href={route('admin.products.index')} className="btn btn-danger" type="button">
                                Back
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditPermission.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default EditPermission;

