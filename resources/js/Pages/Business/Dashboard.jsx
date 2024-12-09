import React, { useEffect } from 'react';
import { Link } from "@inertiajs/react";

import AdminLayout from '@/Layouts/adminLayout';
import Management from '@/Layouts/adminLayout/management';
import Schedule from '@/Layouts/adminLayout/schedule';
import Rating from '@/Components/Ratings';

export default function Dashboard(props) {
    useEffect(() => {
        // console.log('eee', props)
    }, []);

    return (
        <AdminLayout>
            <section className="py-5 widgets">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 my-1">
                            <div className="card p-4 rounded rounded-4">
                                <div className="card-title d-flex justify-content-between">
                                    <h4>Trustscore</h4>
                                    <div className="dropdown">
                                        <button
                                            className="dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href={route('business.reviews.index')}>View</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className='flex items-center justify-center'>

                                        <Rating className="" width="w-10" height="w-10" rating={Number(props.average_rating)}/>
                                        <span className='ml-3 text-gray-800 font-bold !text-4xl'>{props.average_rating}</span>
                                    </div>
                                    <p className="mb-0 text-gray-700 mt-3">Total reviews: <span className='!text-2xl font-semibold text-gray-600'>{props.total_reviews}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6 my-1">
                            <div className="card p-4 rounded rounded-4">
                                <div className="card-title d-flex justify-content-between">
                                    <h4>Products</h4>
                                    <div className="dropdown">
                                        <button
                                            className="dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href={route('business.products.index')}>View</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className='flex items-center justify-center'>
                                        Total: <span className='ml-3 text-gray-800'>{props.total_products} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Management section */}

            {/* <Management /> */}
            {/* Schedule section */}
            {/* <Schedule /> */}
        </AdminLayout>
    );
}
