import { Link, router } from '@inertiajs/react';
import { React, useState } from 'react';

import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BsPlusCircleFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment'
import AdminLayout from '@/Layouts/adminLayout';
import SearchBar from '@/Components/SearchBar';

const Index = ({ blogs }) => {
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
                        router.delete(route('admin.blogs.destroy', { id }));
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
                                <h3 className="m-0 text-center text-lg-start">blogs</h3>
                            </div>
                            <div className="flex items-center">
                                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                                <Link href={route('admin.blogs.create')}
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
                                        <th scope="col">Title</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {blogs.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="4">There is no data</td>
                                        </tr>
                                    ):(
                                        <>
                                            {blogs
                                                .filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((blog, index) => (
                                                    <tr key={blog.id} className="border-bottom-secondary align-middle">
                                                        <td>{index + 1}</td>
                                                        <td>{blog.title}</td>
                                                        <td>{moment(blog.created_at).format("MMM D, YYYY")}</td>
                                                        <td>
                                                            <ul className="action d-flex align-items-center list-unstyled justify-content-center m-0 space-x-2">
                                                                <li className="edit">
                                                                    <Link href={route('admin.blogs.edit', blog.id)}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faPenToSquare}
                                                                            className="fs-4 me-2 text-primary"
                                                                        />
                                                                    </Link>
                                                                </li>
                                                                <li className="delete">
                                                                    <Link as="button" method="delete" onClick={(event) => handleDelete(event, blog.id)}>
                                                                        <FontAwesomeIcon icon={faTrashCan} className='fs-4 text-danger' />
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
