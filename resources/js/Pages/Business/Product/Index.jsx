import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import Swal from 'sweetalert2';
import { BsTrashFill } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"

import AdminLayout from '@/Layouts/adminLayout';

const Index = ({products}) => {
    const handleDelete = (event, productId) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('business.products.destroy', productId));
            }
        });
    };

    return (
        <div className='content-wrapper m-3'>

            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="m-3 row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <h3 className="m-0 text-center text-lg-start">Products</h3>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="text-center text-lg-end">
                                    <Link href={route('business.products.create')} className="btn btn-success" type="button">
                                        <i className="fa-solid fa-plus"></i> Add
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="3">There is no data</td>
                                        </tr>
                                    ):(
                                        <>
                                        {products.map((item, index) => (
                                        <tr className="border-bottom-secondary" key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                    <li className="edit">
                                                        <Link href={route('business.products.edit', item.id)}>
                                                            <FaEdit className='text-primary fs-4 me-2' />
                                                        </Link>
                                                    </li>
                                                    <form
                                                        // action={route('business.products.destroy', item.id)}
                                                        onSubmit={(e) => handleDelete(e, item.id)}
                                                        method="POST"
                                                    >
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                        <li className="delete d-flex align-items-center">

                                                            <button type="submit" className="border-0 bg-transparent">
                                                                <BsTrashFill className="text-danger fs-4" />

                                                            </button>
                                                        </li>
                                                    </form>
                                                </ul>
                                            </td>
                                        </tr>
                                        ))
                                        }
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
