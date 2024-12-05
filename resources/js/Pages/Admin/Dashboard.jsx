import { Link } from "@inertiajs/react";

import AdminLayout from '@/Layouts/adminLayout';
import Management from '@/Layouts/adminLayout/management';
import Schedule from '@/Layouts/adminLayout/schedule';

export default function Dashboard({ auth, data }) {
    return (
        <AdminLayout>
            <section className="py-5 widgets">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 my-1">
                            <div className="card p-4 rounded rounded-4">
                                <div className="card-title d-flex justify-content-between">
                                    <h4>Users</h4>
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
                                            <li><Link className="dropdown-item" href={route('admin.users.index')}>View</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className='flex items-center justify-center'>
                                        Total: <span className='ml-3 text-green-800'>{data.count_users} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6 my-1">
                            <div className="card p-4 rounded rounded-4">
                                <div className="card-title d-flex justify-content-between">
                                    <h4>Businesses</h4>
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
                                            <li><Link className="dropdown-item" href={route('admin.businesses.index')}>View</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className='flex items-center justify-center'>
                                        Total: <span className='ml-3 text-blue-800'>{data.count_businesses} </span>
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
