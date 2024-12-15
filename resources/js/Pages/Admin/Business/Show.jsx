import { Link, useForm } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';

import AdminLayout from '@/Layouts/adminLayout';
import BusinessInfo from './Partial/BusinessInfo';
import ReviewTable from '@/Components/ReviewTable';
import SearchBar from '@/Components/SearchBar';
import Swal from 'sweetalert2';
import { BsTrashFill } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { CgMenuBoxed } from "react-icons/cg";

const Show = ({ business, has_reviews, trustscore, products }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const table_setting = {
        title: 'Reviews',
        url: '/api/admin/businesses/' + business.id,
        show_link: 'admin.reviews.show',
        header_name:'user'
    }

    return (
        <div className="content-wrapper m-4">
            <div className="row justify-center">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <BusinessInfo business={business} trustscore={trustscore} has_reviews={has_reviews}/>
                        </div>
                    </div>

                    {
                        has_reviews !== 0 && (
                            <div className='mt-3 p-3 card'>
                                <ReviewTable setting={table_setting}/>
                            </div>
                        )
                    }

                    <div className='mt-3 p-3 card'>
                        <div className="m-3 flex items-center justify-between">
                            <div className="col-lg-6 col-md-12">
                                <h3 className="m-0 text-center text-lg-start">Products</h3>
                            </div>
                            <div className="flex items-center">
                                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                            </div>
                        </div>
                        {/* <ProductTable products={products} /> */}
                        <div className="table-responsive text-center">
                            <table className="table">
                                <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        {/* <th>Description</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="4">There is no product</td>
                                        </tr>
                                    ):(
                                        <>
                                        {products
                                        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((item, index) => (
                                        <tr className="border-bottom-secondary align-middle" key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                            {item.image ? (
                                                <img src={`/storage/${item.image}`}
                                                    alt="item-logo"
                                                    className='inline'
                                                    style={{ maxWidth: '64px', maxHeight: '64px' }} />
                                            ):(
                                                <>No image</>
                                            )}
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                                    <li className="edit">
                                                        <Link href={route('admin.businesses.edit', item.id)}>
                                                            <CgMenuBoxed  className='text-primary fs-4 me-2' />
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
        </div>
    );
};

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Show;

