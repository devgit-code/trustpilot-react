import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';

import logo from "@/../images/company-logo.png"
import Swal from 'sweetalert2';
import { CgMenuBoxed } from "react-icons/cg";
import { MdOutlineUnpublished } from "react-icons/md"

import Edit from './Partial/Edit'

const Index = () => {
    const [filters, setFilters] = useState({ search:"", page:1 });
    const [businesses, setBusinesses] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [gotoPage, setGotoPage] = useState(""); // Input for "Go to Page"
    const [editData, setEditData] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const fetchBusinesses = async () => {
        setLoading(true);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/admin/owners?${queryString}`);
            const data = await response.json();
            setBusinesses(data.businesses);
            setPagination(data.pagination);
            setGotoPage(data.pagination.current_page)
        } catch (error) {
            console.error("Error fetching businesses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchBusinesses();
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

    const handleDelete = (event, id) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear owner!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = router.delete(route('admin.owners.destroy', id));
                fetchBusinesses();
            }
        });
    };

    const handleOpenDialog = (item = null) => {
        setEditData(item);
        setDialogVisible(true);
    };

    return (
        <div className='content-wrapper m-3'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="m-3 flex items-center justify-between">
                            <div className="">
                                <h3 className="m-0 text-center text-lg-start">Owners</h3>
                            </div>
                            <div className="flex items-center">
                                {/* <Link href={route('admin.businesses.create')}
                                    className="btn btn-success d-flex align-items-center border-0 mr-3"
                                >
                                    <span className="ms-2 text-white">Add Business</span>
                                </Link> */}
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
                        </div>
                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Logo</th>
                                        <th>Company</th>
                                        {/* <th>Products</th> */}
                                        <th>Owner Info</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businesses.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="5">There is no data</td>
                                        </tr>
                                    ):(
                                        <>
                                        {businesses.map((item, index) => (
                                        <tr className="border-bottom-secondary align-middle" key={item.id}>
                                            <td>
                                                <div className="relative inline-flex">
                                                    <p className={`mb-0 text-gray-700 px-3 aspect-[1/1] ${(!item.email_verified_at || item.is_approved === 0) && 'bg-red-100 flex items-center rounded text-gray-100'}`}>{index+1}</p>
                                                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                        className="absolute -top-2 -right-2">
                                                        <path fill={`${item.email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                                                        <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                                                    </svg> */}
                                                    {(!item.email_verified_at || item.is_approved === 0) && (
                                                        <MdOutlineUnpublished className='text-lg text-danger absolute -top-1 -right-1' />
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className='inline-flex justify-center items-center border' style={{height: '66px', width: '66px'}}>
                                                {item.profile?.logo ? (
                                                    <img src={`/storage/images/logo/${item.profile.logo}`}
                                                        alt="category-logo"
                                                        className=''
                                                        style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                                ):(
                                                    <div className='relative'>
                                                        <img src={logo}
                                                            alt="category-logo"
                                                            className=''
                                                            style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                                        {/* {!item.company_email && (
                                                            <BsFillExclamationOctagonFill className='text-danger absolute -top-1 -right-1' />
                                                        )} */}
                                                    </div>
                                                )}
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p className='mb-0 text-gray-700'>{item.company_name}</p>
                                                    <p className='mb-0 text-gray-700'>{item.website}</p>
                                                </div>
                                            </td>
                                            {/* <td>{item.count_products}</td> */}
                                            <td>
                                                <div>
                                                    <p className='mb-0 text-gray-700'>{item.company_email || ''}</p>
                                                    <p className='mb-0 text-gray-700'>{(item.first_name || '') + ' ' + (item.last_name || '')}</p>
                                                    <p className='mb-0 text-gray-700'>{item.job_title || ''}</p>
                                                </div>
                                            </td>
                                            <td>
                                            {
                                                item.is_approved === 1 ?
                                                <p className='mb-0 badge bg-green-500 py-1 rounded text-gray-100'>Complete</p>
                                                :
                                                item.email_verified_at ?
                                                <p className='mb-0 badge bg-warning py-1 rounded text-gray-100'>Not approved</p>
                                                :
                                                item.company_email ?
                                                <p className='mb-0 badge bg-warning py-1 rounded text-gray-100'>Not verified</p>
                                                :
                                                <p className='mb-0 badge bg-danger py-1 rounded text-gray-100'>Not claimed</p>

                                            }
                                            </td>
                                            <td>
                                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                    <li className="edit">
                                                        <button onClick={()=>handleOpenDialog(item)}>
                                                            <CgMenuBoxed className='text-primary fs-4 me-2' />
                                                        </button>
                                                    </li>
                                                    {/* <li className="delete">
                                                        <Link onClick={(e) => handleDelete(e, item.id)}>
                                                            <BsTrashFill className='text-danger fs-5 me-2' />
                                                        </Link>
                                                    </li> */}
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
                                        id="page"
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

                </div>{/* Dialog for Add/Edit Product */}
            {dialogVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Edit</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                value={productData.title}
                                onChange={(e) =>
                                    setProductData({ ...productData, title: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Enter product title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setProductData({ ...productData, image: e.target.files[0] })
                                }
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseDialog}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProduct}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
