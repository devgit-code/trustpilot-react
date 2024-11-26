import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

import userProfileNotlogo from '@/../images/company-logo.jpg';

export default function Sidebar({auth}) {
//   const { userProfileImage } = usePage().props

    return (
        <div className="sidebar h-100 pt-3">
            <div className="px-4" style={{ maxWidth: "100%" }}>
                <div className="profile text-center mb-5 position-relative">
                    <div className="flex items-center mx-auto border border-gray-100 bg-white" style={{width:'100px', height:'100px'}}>
                        {/* <Link href={route("admin.user_profile.show")}>  */}
                        <img
                            src={auth.userProfileImage?`/storage/images/${auth.userProfileImage}`:userProfileNotlogo}
                            alt="user"
                            className="mx-auto"
                            width="100"
                        />
                        {/* </Link> */}
                    </div>

                    <div className="profile_text mt-3">
                        <span className="d-block text-gray-300 fs-5 mb-0">{auth.user.first_name}</span>
                        <span className="d-block text-gray-300 fs-6">{auth.user.company_email}</span>
                    </div>
                </div>
                <div className="ps-3">
                    <NavLink style={{ borderBottom: 'none', }}
                        className="no-underline"
                        href={route('admin.dashboard')} active={route().current('admin.dashboard')}
                    >
                        <span className="text-info fs-4">
                        DASHBOARD</span>
                    </NavLink>
                </div>
                <div className="sidebarnav">
                    <ul className="list-unstyled text-white mt-3">
                        <li>
                            <NavLink
                                href={route('admin.users.index')} active={route().current('admin.users.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Users</span>
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                href={route('admin.settings.index')} active={route().current('admin.settings.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Settings</span>
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                href={route('admin.sponsors.index')} active={route().current('admin.sponsors.index') || route().current('admin.sponsors.edit') || route().current('admin.sponsors.create')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Sponsors</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route('admin.roles.index')} active={route().current('admin.roles.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Roles</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route('admin.permissions.index')} active={route().current('admin.permissions.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Permissions</span>
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                href={route('admin.cities.index')} active={route().current('admin.cities.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Cities</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route('admin.states.index')} active={route().current('admin.states.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">States</span>
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink
                                href={route('admin.categories.index')} active={route().current('admin.categories.index')}
                                className="rounded-3 py-2 px-3 mb-1 d-flex text-decoration-none text-white"
                            >
                                <i className="bi bi-kanban fs-5"></i>
                                <span className="text-white mt-1">Categories Management</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>

    );
}
