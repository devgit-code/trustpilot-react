import { Link, router } from '@inertiajs/react';
import { React, useState } from 'react';

import AdminLayout from '@/Layouts/adminLayout';
import SearchBar from '@/Components/SearchBar';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BsPlusCircleFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFolderOpen } from "react-icons/fa"

const Index = ({ categories }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (event, id) => {
        event.preventDefault();

        confirmAlert({
            title: 'Are you sure?',
            message: "You won't be able to revert this!",
            buttons: [
                {
                    label: 'Yes',
                    className:'bg-blue-800',
                    onClick: () => {
                        router.delete(route('admin.categories.destroy', { id }));
                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        });
    };

    return (
        <div className="container-wrapper m-3">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card p-3">
                        <div className=" g-3 d-flex align-items-center justify-between">
                            <div className="">
                                <h3 className="m-0 text-center text-lg-start">Categories</h3>
                            </div>
                            <div className="flex items-center">
                                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                                <Link href={route('admin.categories.create')}
                                    className="btn btn-success d-flex align-items-center border-0 ml-2 me-3"
                                >
                                    <BsPlusCircleFill className="fs-5" />
                                    <span className="ms-2 text-white">Add</span>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th scope="col">No</th>
                                        <th scope="col">Icon</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Sub Categories</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {categories.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="5">There is no data</td>
                                        </tr>
                                    ):(
                                        <>
                                            {categories
                                                .filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((category, index) => (
                                                    <tr key={category.id} className="border-bottom-secondary align-middle">
                                                        <td>{index + 1}</td>
                                                        <td>
                                                        {category.image ? (
                                                            <img src={`/storage/${category.image}`}
                                                                alt="category-logo"
                                                                className='inline'
                                                                style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                                        ):(
                                                            <>No image</>
                                                        )}
                                                        </td>
                                                        <td>{category.name}</td>
                                                        {/* <img className="img-60 me-2" src={`/storage/${category.image}`} alt="profile" /> */}

                                                        <td>
                                                            {category.subcategories_count}
                                                        </td>
                                                        <td>
                                                            <ul className="action d-flex align-items-center list-unstyled justify-content-center m-0 space-x-2">
                                                                <li className="view">
                                                                    <Link href={route('admin.sub_categories.index', category.id)}>
                                                                        <FaFolderOpen className='fs-5 me-2 text-success' />
                                                                    </Link>
                                                                </li>
                                                                <li className="edit">
                                                                    <Link href={route('admin.categories.edit', category.id)}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faPenToSquare}
                                                                            className="fs-5 me-2 text-primary"
                                                                        />
                                                                    </Link>
                                                                </li>
                                                                <li className="delete">
                                                                    <Link as="button" method="delete" onClick={(event) => handleDelete(event, category.id)}>
                                                                        <FontAwesomeIcon icon={faTrashCan} className='fs-5 text-danger' />
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
