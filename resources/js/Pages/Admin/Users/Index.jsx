import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import { BsTrashFill } from "react-icons/bs"
import { CgMenuBoxed } from "react-icons/cg";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import profileNotPreviewImg from '@/../images/profile-not-found.png';

const Index = () => {
    const [filters, setFilters] = useState({ search:"", page:1 });
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [gotoPage, setGotoPage] = useState(""); // Input for "Go to Page"

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/admin/users?${queryString}`);
            const data = await response.json();
            setUsers(data.users);
            setPagination(data.pagination);
            setGotoPage(data.pagination.current_page)
        } catch (error) {
            console.error("Error fetching users:", error);
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
        fetchUsers();
    }, [filters]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        const table = document.querySelector('.admin_table');

        const headers = [...table.querySelectorAll('.table_header_admin th')]
            .filter((header) => header.innerText !== 'Actions')
            .map((header) => header.innerText);

        const rows = users.map((user, index) => [index + 1, user.name, user.email, user.email_verified_at?'Active':'Inactive', user.review_count]);

        doc.autoTable({
            head: [headers],
            body: rows,
            styles: {
                cellPadding: 5,
                fontSize: 10,
                valign: 'middle',
                halign: 'center',
            },
            headStyles: {
                fillColor: [52, 73, 94],
                textColor: 255,
                fontSize: 12,
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
            startY: 20,
        });

        doc.save('user_details.pdf');
    };

    const handleDelete = (id) => {
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
                router.delete(route('admin.users.destroy', id));
            }
        });
    };

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

    return (
        <div className="content-wrapper m-3 card">

            <div className="responsive-table m-3">
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className="m-0 text-center text-lg-start">Users</h3>
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
                        {/* <button className="btn btn-primary" onClick={downloadPDF}>
                            Download PDF
                        </button> */}
                    </div>
                </div>
                <div  className="table text-center mt-3">
                    <table className="admin_table table">
                        <thead className='table_header_admin'>
                            <tr className="border-bottom-primary">
                                <th>No</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total Reviews</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td data-label="No">{index + 1}</td>
                                    <td data-label="">
                                        <div className='inline-flex items-center' style={{height: '64px'}}>
                                            <img
                                                className='inline'
                                                style={{ maxWidth: '64px', maxHeight: '64px' }}
                                                src={user.profile.image ? `/storage/images/profile/${user.profile.image}` : profileNotPreviewImg}
                                                alt="preview image"
                                            />
                                        </div>
                                    </td>
                                    <td data-label="name">{user.name}</td>
                                    <td data-label="status">{user.email}</td>
                                    <td data-label="email">{user.reviews_count}</td>
                                    <td data-label="">
                                        <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                            <li className="edit">
                                                <Link href={route('admin.users.show', user.id)}>
                                                    <CgMenuBoxed className='text-primary fs-4 me-2' />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    as="button"
                                                    // href={route('admin.users.destroy', user.id)}
                                                    onClick={()=>handleDelete(user.id)}
                                                    className="dropdown-item"
                                                    // method="delete"
                                                >
                                                    <BsTrashFill className="text-danger fs-4" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
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
    );
};

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
