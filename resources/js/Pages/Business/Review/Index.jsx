import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import Swal from 'sweetalert2';
import { BsTrashFill, BsArrowDownShort, BsArrowUpShort } from "react-icons/bs"
import { FaReply  } from "react-icons/fa"
import { BsPlusCircleFill } from 'react-icons/bs';
import moment from "moment";

import AdminLayout from '@/Layouts/adminLayout';
import SearchBar from '@/Components/SearchBar';

const Index = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { reviews, filters } = usePage().props; // Retrieve initial props from the backend (if any)

    const [filterState, setFilterState] = useState({
        sort_by_date: filters?.sort_by_date || 'desc',
        rating: filters?.rating || '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        const updatedFilters = { ...filterState, [name]: value };
        setFilterState(updatedFilters);

        router.get('/business/reviews', updatedFilters);
    };

    const handleSortDateClick = () => {
        const updatedFilters = { ...filterState, ['sort_by_date']: filterState.sort_by_date == 'desc' ? 'asc' : 'desc' };
        setFilterState(updatedFilters);

        router.get('/business/reviews', updatedFilters);
    };

    // const handleDelete = (event, reviweId) => {
    //     event.preventDefault();

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             router.delete(route('admin.reviews.destroy', reviweId));
    //         }
    //     });
    // };

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
                                    <div className=''>
                                        <select
                                            name="rating"
                                            value={filterState.rating}
                                            onChange={handleFilterChange}
                                            className="form-control px-5"
                                        >
                                            <option value="">All</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Star</option>
                                            <option value="3">3 Star</option>
                                            <option value="4">4 Star</option>
                                            <option value="5">5 Star</option>
                                        </select>
                                    </div>

                                    <button  type="button" className="btn btn-success"
                                        onClick={handleSortDateClick}>
                                        Sort Date<span className='text-gray-100 text-xl'>{filterState.sort_by_date == 'desc' ? <BsArrowDownShort className='inline'/>:<BsArrowUpShort className='inline'/>}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Rating</th>
                                        <th>Date</th>
                                        <th>User</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.data.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="4">There is no data</td>
                                        </tr>
                                    ):(
                                        <>
                                        {reviews.data.map((item, index) => (
                                        <tr className="border-bottom-secondary" key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.rating}</td>
                                            <td>{moment(item.date_experience).format("MMM D, YYYY")}</td>
                                            <td>{item.user.name}</td>
                                            <td>
                                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                    <li className="edit">
                                                        <Link href={route('business.reviews.edit', item.id)}>
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

                        {/* <div className='mx-auto mb-3'>
                            <div className="pagination mt-4">
                                {reviews.links.map((link, index) => (
                                    <button
                                        key={index}
                                        className={`btn btn-sm mx-1 ${
                                            link.active ? 'btn-primary' : 'btn-secondary'
                                        }`}
                                        disabled={!link.url}
                                        onClick={() => handlePaginationClick(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }} // To render "Previous", "Next", or numbers
                                    />
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
