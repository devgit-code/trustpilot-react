import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import SearchBar from '@/Components/SearchBar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaFolderOpen } from "react-icons/fa";
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiArrowRightSLine } from "react-icons/ri";

const Index = ({ subCategories, category }) => {
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (event, id) => {
        event.preventDefault();

        confirmAlert({
            title: 'Are you sure?',
            message: "You won't be able to revert this!",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        router.delete(route('admin.sub_categories.destroy', { id }));
                    },
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };

    return (
        <div className="container-wrapper m-4">
            {/* {flash.message && (
                <Alert
                    message={flash.message}
                    type="success"
                    duration={3000} // Alert disappears after 5 seconds
                />
            )} */}
            <div className="row justify-center">
                <div className="col-lg-10">
                    <div className='flex items-center'>
                        <Link href={route('admin.categories.index')} className='text-gray-700 font-bold no-underline hover:underline capitalize'>Categories</Link>
                        <RiArrowRightSLine className='m-2'/>
                        <Link href={route('admin.sub_categories.index', category.id)}className='text-gray-700 font-bold no-underline hover:underline capitalize'>{category.name}</Link>
                    </div>
                    <div className="card p-3 mt-2">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h5 className="m-0 text-center text-lg-start">
                                    Sub Categories
                                </h5>
                            </div>
                            <div className="flex items-center">
                                <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                                <Link href={route('admin.sub_categories.create', category.id)}
                                    className="ml-3 btn btn-success d-flex align-items-center border-0 me-2"
                                >
                                    <BsPlusCircleFill className="fs-5" />
                                    <span className="ms-2 text-gray-100">Add</span>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="table-responsive text-center">
                            <table className="table">
                                {/* Table header */}
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th scope="col">No</th>
                                        <th scope="col">Icon</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Businesses</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody id="myTable">
                                    {subCategories.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="6">There is no Sub Category</td>
                                        </tr>
                                    ):(
                                        <>
                                            {subCategories
                                                .filter((cat) =>
                                                    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map((cat, index) => (
                                                    <tr key={cat.id} className="border-bottom-secondary align-middle">
                                                        <td>{index + 1}</td>
                                                        <td>
                                                        {cat.image ? (
                                                            <img src={`/storage/${cat.image}`}
                                                                alt="sub-category-logo"
                                                                className='inline'
                                                                style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                                        ):(
                                                            <>No image</>
                                                        )}
                                                        </td>
                                                        <td>{cat.name}</td>
                                                        <td>{cat.businesses_count}</td>
                                                        <td>
                                                            <ul className="action d-flex align-items-center list-unstyled justify-content-center m-0 space-x-2">
                                                                <li className="view">
                                                                    <Link href={route('admin.sub_categories.detail', cat.id)}>
                                                                        <FaFolderOpen className='fa-lg text-success' />
                                                                    </Link>
                                                                </li>
                                                                <li className="edit">
                                                                    <Link href={route('admin.sub_categories.edit', cat.id)}>
                                                                        <FontAwesomeIcon
                                                                            icon={faPenToSquare}
                                                                            className="fa-lg text-danger"
                                                                        />
                                                                    </Link>
                                                                </li>
                                                                <li className="delete">
                                                                    <Link
                                                                        as="button"
                                                                        method="delete"
                                                                        onClick={(event) => handleDelete(event, cat.id)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrashCan} />
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
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
