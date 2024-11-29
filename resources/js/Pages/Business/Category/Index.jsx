import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import Swal from 'sweetalert2';
import { BsTrashFill } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"

import AdminLayout from '@/Layouts/adminLayout';

const Index = ({categories}) => {
    console.log("eee===", categories[0].pivot.is_primary)

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
                router.delete(route('business.categories.destroy', productId));
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
                                <h3 className="m-0 text-center text-lg-start">Categories</h3>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="text-center text-lg-end">
                                    <Link href={route('business.categories.create')} className="btn btn-success" type="button">
                                        <i className="fa-solid fa-plus"></i> Add
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive text-center">
                            <table className="table">
                                {/* <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {categories.length == 0 ? (
                                        <tr className='text-center'>
                                            <td>Please select categories. You can select up to 6 categories.</td>
                                        </tr>
                                    ):(
                                        <>
                                        {categories.map((item, index) => (
                                        <tr className="border-bottom-secondary" key={item.id}>
                                            <td>
                                                <div className='flex justify-between mx-3'>
                                                    <div className='flex items-center px-3'>
                                                        <h5 className='mb-0'>{item.name}</h5>
                                                        {
                                                            item.pivot.is_primary !== 0 && (
                                                                <p className='ml-3 mb-0 py-1 px-3 rounded-full text-gray-200 bg-primary'>
                                                                    Primary
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='flex items-center'>
                                                        {
                                                            item.pivot.is_primary == 0 && (
                                                                <a className="no-underline mr-3 inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                                                                Set Primary
                                                                </a>
                                                            )
                                                        }

                                                        <a className="no-underline mr-3 inline px-4 py-2 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-gray-800 rounded-full bg-yellow-500 hover:bg-yellow-400">
                                                        Remove
                                                        </a>
                                                    </div>
                                                </div>
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
