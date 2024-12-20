import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import Rating from '@/Components/RatingAverage';

import logo from "@/../images/company-logo.png"
import Swal from 'sweetalert2';
import { BsTrashFill, BsFillExclamationOctagonFill } from "react-icons/bs"
import { FaExternalLinkAlt } from "react-icons/fa"
import { CgMenuBoxed } from "react-icons/cg";
import { MdOutlineUnpublished } from "react-icons/md"
import { VscWorkspaceUntrusted } from "react-icons/vsc"


const Index = () => {
    const [filters, setFilters] = useState({ search:"", page:1 });
    const [businesses, setBusinesses] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [gotoPage, setGotoPage] = useState(""); // Input for "Go to Page"

    const fetchBusinesses = async () => {
        setLoading(true);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/admin/businesses?${queryString}`);
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
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = router.delete(route('admin.businesses.destroy', id));
                fetchBusinesses();
            }
        });
    };

    return (
        <div className='content-wrapper m-3'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="m-3 flex items-center justify-between">
                            <div className="">
                                <h3 className="m-0 text-center text-lg-start">Businesses</h3>
                            </div>
                            <div className="">
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
                                        <th>Name</th>
                                        {/* <th>Products</th> */}
                                        <th>Categories</th>
                                        <th>Score</th>
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
                                                    <p className={`mb-0 text-gray-700 px-3 aspect-[1/1] ${!item.email_verified_at && 'bg-red-100 flex items-center rounded text-gray-100'}`}>{index+1}</p>
                                                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                        className="absolute -top-2 -right-2">
                                                        <path fill={`${item.email_verified_at ? "#4CAF50" : "#6e6b6a"}`} d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
                                                        <path fill="#fff" d="M10 15.5l6-6-1.5-1.5L10 12.5 8.5 11l-1.5 1.5 3 3z"/>
                                                    </svg> */}
                                                    {!item.email_verified_at && (
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
                                                        {!item.company_email && (
                                                            <BsFillExclamationOctagonFill className='text-danger absolute -top-1 -right-1' />
                                                        )}
                                                    </div>
                                                )}
                                                </div>
                                            </td>
                                            <td>{
                                                item.company_name //length > 20 ? `${item.company_name.slice(0, 20)}...` : item.company_name
                                            }</td>
                                            {/* <td>{item.count_products}</td> */}
                                            <td>
                                                <div>
                                                    {
                                                        item.categories.length === 0 ? (
                                                            <span className='text-gray-700 text-sm'>No category</span>
                                                        ):(
                                                            <ul className='list-styled m-0 p-0' style={{listStyle:'disc'}}>
                                                                {
                                                                    item.categories.map((category, index) => (
                                                                        <li key={index} className='text-left p-0'>
                                                                            <span className={`text-xs capitalize ${category.is_primary === 1 ? 'bg-primary p-1 rounded text-gray-100':'text-gray-500'} `}>
                                                                            {category.sub_category.name}
                                                                            </span>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className='inline-flex items-center'>
                                                        <Rating className="inline-flex px-2" width="w-6" height="w-6" rating={item.trustscore}/>
                                                        <span className='ml-2 text-gray-800'>({item.reviews_count})</span>
                                                    </div>
                                                    {/* <p className='mb-0 mt-1 text-gray-700'>Products: {item.count_products}</p> */}
                                                </div>
                                            </td>
                                            <td>
                                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                    <li className="edit">
                                                        <a href={item.website} target="_blank">
                                                            <FaExternalLinkAlt className='text-success fs-6 me-2' />
                                                        </a>
                                                    </li>
                                                    <li className="edit">
                                                        <Link href={route('admin.businesses.show', item.website)}>
                                                            <CgMenuBoxed className='text-primary fs-4 me-2' />
                                                        </Link>
                                                    </li>
                                                    <li className="delete">
                                                        <Link onClick={(e) => handleDelete(e, item.id)}>
                                                            <BsTrashFill className='text-danger fs-5 me-2' />
                                                        </Link>
                                                    </li>
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
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
