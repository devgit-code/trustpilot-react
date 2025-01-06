import { Link, useForm } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';

import AdminLayout from '@/Layouts/adminLayout';
import BusinessInfo from './Partial/BusinessInfo';
import ReviewTable from '@/Components/ReviewTable';
import SearchBar from '@/Components/SearchBar';
import ProductList from './Partial/ProductList';
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
                    <div className="card mb-3">
                        <div className="card-body">
                            <BusinessInfo business={business} trustscore={trustscore} has_reviews={has_reviews}/>
                        </div>
                    </div>

                    <ProductList products={products} business_id={business.id} className='mt-5'/>

                    {
                        has_reviews !== 0 && (
                            <div className='mt-3 p-3 card'>
                                <ReviewTable setting={table_setting}/>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
};

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Show;

