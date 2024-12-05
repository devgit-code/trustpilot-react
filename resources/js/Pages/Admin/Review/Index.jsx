import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import { BsTrashFill, BsPlusCircleFill, BsArrowDownShort, BsArrowUpShort } from "react-icons/bs"
import { FaReply  } from "react-icons/fa"
import moment from "moment";
import Swal from 'sweetalert2';
import Rating from '@/Components/Ratings';

const Index = () => {
    const [filters, setFilters] = useState({ sort_by_date: "desc", rating: "", search:"", page:1 });
    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [gotoPage, setGotoPage] = useState(""); // Input for "Go to Page"

    // Fetch reviews from the API
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/admin/reviews?${queryString}`,
            // {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type':'application/json',
            //     },
            //     credentials: 'include',
            // }
            );
            const data = await response.json();

            setReviews(data.reviews);
            setPagination(data.pagination);
            setGotoPage(data.pagination.current_page)
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }

    };

    // Handle sorting
    const handleSortDateClick = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sort_by_date: prevFilters.sort_by_date === "desc" ? "asc" : "desc",
        }));
    };

    // Handle rating filter
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Fetch reviews whenever filters change
    useEffect(() => {
        fetchReviews();
    }, [filters]);


    const goToNextPage = () => {
        if (pagination.current_page < pagination.last_page) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                ['page']: pagination.current_page + 1,
            }));
        }
    };

    const goToPreviousPage = () => {
        if (pagination.current_page > 1) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                ['page']: pagination.current_page - 1,
            }));
        }
    };

    // Handle "Go to Page" input
    const handleGotoPage = (e) => {
        if (e.key === "Enter") {
            const page = Number(gotoPage);

            if (page >= 1 && page <= pagination.last_page) {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    ['page']: page,
                }));
                setGotoPage(""); // Clear input after navigating
            } else {
                alert(`Please enter a valid page number (1 - ${pagination.last_page}).`);
            }
        }
    };

    // Handle "Go to Page" input
    const handlePageChange = (e) => {
        const page = Number(e.target.value);

        if (page >= 1 && page <= pagination.last_page) {
            setGotoPage(page); // Clear input after navigating
        }
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
                        <div className="m-3 flex items-center justify-between">
                            <div>
                                <h3 className="inline-block text-left">Reviews</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className=''>
                                    <input
                                        className="search border rounded"
                                        id="myInput"
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                        value={filters.search}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                <div className=''>
                                    <select
                                        name="rating"
                                        value={filters.rating}
                                        onChange={handleFilterChange}
                                        className="form-control px-5 ps-3"
                                    >
                                        <option value="" className='text-left'>All</option>
                                        <option value="1" className='text-left'>1 Star</option>
                                        <option value="2" className='text-left'>2 Star</option>
                                        <option value="3" className='text-left'>3 Star</option>
                                        <option value="4" className='text-left'>4 Star</option>
                                        <option value="5" className='text-left'>5 Star</option>
                                    </select>
                                </div>

                                <button  type="button" className="btn btn-success"
                                    onClick={handleSortDateClick}>
                                    Sort Date<span className='text-gray-100 text-xl'>{filters.sort_by_date == 'desc' ? <BsArrowDownShort className='inline'/>:<BsArrowUpShort className='inline'/>}</span>
                                </button>
                            </div>
                        </div>

                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Business</th>
                                        <th>Rating</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    loading ? (
                                        <tr className="">
                                            <td colSpan="4">
                                                <div className='flex justify-center'>
                                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ):(
                                        <>{
                                        reviews.length == 0 ? (
                                            <tr className='text-center'>
                                                <td colSpan="4">There is no data</td>
                                            </tr>
                                        ):(
                                            <>
                                            {reviews.map((item, index) => (
                                            <tr className="border-bottom-secondary align-middle" key={item.id}>
                                                <td>{index + 1}</td>
                                                {/* <td>{item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title}</td> */}
                                                <td>{item.business.company_name}</td>
                                                <td>
                                                    <div className='inline-flex items-center'>
                                                        <Rating className="inline-flex" width="w-5" height="w-5" rating={item.rating}/>
                                                        {/* <span className='ml-2 text-gray-800'>({item.rating})</span> */}
                                                    </div>
                                                </td>
                                                <td>{item.user.name}</td>
                                                <td>{moment(item.date_experience).fromNow()}</td>
                                                <td>
                                                    <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                        <li className="edit">
                                                            <Link href={route('admin.reviews.show', item.id)}>
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
                                        )
                                        }
                                        </>
                                    )}
                                </tbody>
                            </table>

                            <div className='flex justify-center mb-3'>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={pagination.current_page === 1}
                                        className="px-4 py-2 bg-gray-50 border disabled:pointer-events-none rounded-md disabled:opacity-50 text-blue-600 hover:bg-blue-100"
                                    >
                                        Previous
                                    </button>

                                    {/* Go to Page */}
                                    <div className='mx-1'>
                                        <input
                                            value={gotoPage}
                                            onChange={handlePageChange}
                                            onKeyDown={handleGotoPage} // Trigger on Enter
                                            className="w-14 border-2 border-gray-200 rounded-l-md px-2 py-1 text-center"
                                        />
                                        <span className='px-2 py-2 text-gray-800 border bg-gray-200 rounded-r-md '>/ {pagination.last_page}</span>
                                    </div>

                                    <button
                                        onClick={goToNextPage}
                                        disabled={pagination.current_page === pagination.last_page}
                                        className="px-4 py-2 bg-gray-50 border disabled:pointer-events-none rounded-md disabled:opacity-50 text-blue-600 hover:bg-blue-100"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
