import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import Swal from 'sweetalert2';
import { BsTrashFill } from "react-icons/bs"
import { FaReply  } from "react-icons/fa"
import { BsPlusCircleFill } from 'react-icons/bs';
import moment from "moment";

import AdminLayout from '@/Layouts/adminLayout';
import SearchBar from '@/Components/SearchBar';

const Index = ({reviews}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [numberOfReviews, setNumberOfReviews] = useState("0")

    const handleDelete = (event, reviweId) => {
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
                router.delete(route('admin.reviews.destroy', reviweId));
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
                                <h3 className="m-0 text-center text-lg-start">Reviews</h3>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="text-center text-lg-end flex items-center justify-end gap-3">
                                    {/* <Link href={route('admin.reviews.create')} className="btn btn-success" type="button">
                                        <i className="fa-s
                                        olid fa-plus"></i> Add
                                    </Link> */}

                                    <div className=''>
                                        <select
                                            value={numberOfReviews}
                                            onChange={(e) => setNumberOfReviews(e.target.value)}
                                            className="form-control px-5"
                                        >
                                            <option value="0">All</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Star</option>
                                            <option value="3">3 Star</option>
                                            <option value="4">4 Star</option>
                                            <option value="5">5 Star</option>
                                        </select>
                                    </div>

                                    <Link href={'#'} className="btn btn-success" type="button">
                                        <i className="fa-solid fa-plus"></i> Sord by Date
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Rating</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="3">There is no data</td>
                                        </tr>
                                    ):(
                                        <>
                                        {reviews.map((item, index) => (
                                        <tr className="border-bottom-secondary" key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.rating}</td>
                                            <td>{moment(item.date_experience).format("MMM D, YYYY")}</td>
                                            <td>
                                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                    <li className="edit">
                                                        <Link href={'#'}>
                                                            <FaReply  className='text-primary fs-4 me-2' />
                                                        </Link>
                                                    </li>
                                                    {/* <form
                                                        onSubmit={(e) => handleDelete(e, item.id)}
                                                        method="POST"
                                                    >
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                        <li className="delete d-flex align-items-center">

                                                            <button type="submit" className="border-0 bg-transparent">
                                                                <BsTrashFill className="text-danger fs-4" />

                                                            </button>
                                                        </li>
                                                    </form> */}
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
