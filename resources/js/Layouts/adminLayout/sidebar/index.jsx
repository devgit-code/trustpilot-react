import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

import businessProfilelogo from '@/../images/company-logo.png';
import adminProfilelogo from '@/../images/admin-logo.webp';

export default function Sidebar({auth}) {
//   const { userProfileImage } = usePage().props

    return (
        <div className="sidebar h-100 pt-3">
            <div className="px-4" style={{ maxWidth: "100%" }}>
                <div className="profile text-center mb-5 position-relative">
                    {auth.role == 'owner' && !auth.userProfileImage && (
                        <Link href={route("business.profile.logo")} className="no-underline hover:underline hover:text-blue-500">Set your profile logo</Link>
                    )}
                    <div className="mt-2 flex items-center mx-auto border border-gray-100 bg-white" style={{width:'100px', height:'100px'}}>
                    {
                        auth.user.role == 'admin' ? (
                            <>
                                <img
                                    src={adminProfilelogo}
                                    alt="admin-logo"
                                    className="mx-auto"
                                    width="100"
                                />
                            </>
                        ):(
                            <>
                                <img
                                    src={auth.userProfileImage ? `/storage/images/logo/${auth.userProfileImage}` : businessProfilelogo}
                                    alt="business-logo"
                                    className="mx-auto"
                                    width="100"
                                />
                            </>
                        )
                    }
                    </div>

                    <div className="profile_text mt-3">
                        <span className="d-block text-gray-300 fs-5 mb-0">{auth.user.first_name + ' ' + auth.user.last_name}</span>
                        <span className="d-block text-gray-300 fs-6">{auth.user.company_email}</span>
                    </div>
                </div>
                {
                    auth.user.role == 'owner' ? (
                        <div className="ps-3">
                            <NavLink style={{ borderBottom: 'none', }}
                                className="no-underline"
                                href={route('business.dashboard')} active={route().current('business.dashboard')}
                            >
                                <span className="text-info fs-4">
                                BUSINESS</span>
                            </NavLink>
                        </div>
                    ):(
                        <div className="ps-3">
                            <NavLink style={{ borderBottom: 'none', }}
                                className="no-underline"
                                href={route('admin.dashboard')} active={route().current('admin.dashboard')}
                            >
                                <span className="text-info fs-4">
                                Administrator</span>
                            </NavLink>
                        </div>
                    )
                }

                <div className="sidebarnav">
                    <ul className="list-unstyled text-white mt-3">
                    {
                        auth.user.role == 'admin' ? (
                            <>
                                <li>
                                    <NavLink
                                        href={route('admin.categories.index')} active={route().current('admin.categories.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Categories</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('admin.users.index')} active={route().current('admin.users.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('admin.businesses.index')} active={route().current('admin.businesses.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Businesses</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('admin.reviews.index')} active={route().current('admin.reviews.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Reviews</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('admin.blogs.index')} active={route().current('admin.blogs.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Blogs</span>
                                    </NavLink>
                                </li>
                            </>
                        ):(
                            <>
                                <li>
                                    <NavLink
                                        href={route('business.reviews.index')} active={route().current('business.reviews.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Reviews</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('business.products.index')} active={route().current('business.products.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Products</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('business.categories.index')} active={route().current('business.categories.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Categories</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route('business.profile.index')} active={route().current('business.profile.index')}
                                        className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                                    >
                                        <i className="bi bi-kanban fs-5"></i>
                                        <span className="text-white mt-1">Profile</span>
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                    </ul>
                </div>
            </div>
        </div>

    );
}
