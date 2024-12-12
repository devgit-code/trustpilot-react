import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import SearchBar from '@/Components/SearchBar';
import RatingAverage from '@/Components/RatingAverage';
import { RiArrowRightSLine } from "react-icons/ri";

const Index = ({ subCategory }) => {
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

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
                <div className="col-lg-8">
                    <div className='flex items-center'>
                        <Link href={route('admin.categories.index')} className='text-gray-500 font-bold no-underline hover:underline capitalize'>Categories</Link>
                        <RiArrowRightSLine className='m-2'/>
                        <Link href={route('admin.sub_categories.index', subCategory.category.id)}className='text-gray-500 font-bold no-underline hover:underline capitalize'>{subCategory.category.name}</Link>
                        <RiArrowRightSLine className='m-2'/>
                        <Link href={route('admin.sub_categories.detail', subCategory.id)}className='text-gray-800 font-bold no-underline hover:underline capitalize'>{subCategory.name}</Link>
                    </div>
                    <div className="card p-3 mt-2">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h5 className="m-0 text-center text-lg-start">
                                    Businesses
                                </h5>
                            </div>
                            <div className="flex items-center">
                                <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
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
                                        <th scope="col">Score</th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody id="myTable">
                                    {subCategory.businesses.length == 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan="6">There is no business</td>
                                        </tr>
                                    ):(
                                        <>
                                            {subCategory.businesses
                                                .filter((business) =>
                                                    business.company_name.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map((business, index) => (
                                                    <tr key={business.id} className="border-bottom-secondary align-middle">
                                                        <td>{index + 1}</td>
                                                        <td>
                                                        {business.logo ? (
                                                            <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                                                                <img src={`/storage/images/logo/${business.logo}`} alt={business.company_name} className="max-w-19 max-h-19 object-cover rounded" />
                                                            </div>
                                                        ):(
                                                            <>No image</>
                                                        )}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                href={route('admin.businesses.show', business.id)}
                                                                className='text-gray-700 font-bold capitalize'>
                                                                {business.company_name}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <div className='inline-flex items-center'>
                                                                <RatingAverage className='inline' rating={business.trustscore}/>
                                                                <span className='ml-2 text-gray-700'>({business.count_reviews} reviews)</span>
                                                            </div>
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
