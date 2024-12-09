import React, {useState} from 'react';
import { Head, Link } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx'
import Rating from './Partial/Rating.jsx'
import Status from './Partial/CompanyStatus.jsx'
import RelatedCategory from './Partial/RelatedCategory.jsx'
import RecentlyReviewedCompany from './Partial/RecentCompanyReviews.jsx'
import PaginationList from './Partial/PaginationList.jsx'

export default function Detail({page=1, count=327, data}) {
    const [sortBy, setSortBy] = useState("relevant");
    return (
        <>
            <FrontendLayout>
                <Head title='Detail' />

                <Header category={data.sub_category ? data.sub_category : data.category}/>

                <div className='bg-[#FCFBF3] pt-5'>
                    <div className='container-lg mx-auto row'>
                        <div className="col-lg-4 px-3 mb-5">
                            <div className='bg-white border rounded mb-4 p-4'>
                                <Rating />

                                <Status />

                                {/* subcategories */}
                            </div>
                            <div className='bg-white border rounded p-4 mb-4'>
                                <RelatedCategory categories={data.related_categoreies}/>
                            </div>
                        </div>
                        <div className="col-lg-8 px-3 mt-3">
                            <div className='mb-4'>

                                <div className='mb-4 ml-2 flex items center justify-between'>
                                    <div className='flex items-center'>
                                        <p className='text-black text-sm'>{((page-1)*20+1)} - {page*20} of {count} results</p>
                                    </div>
                                    <div className='flex items-center p-2 w-96'>
                                        <label className='w-16'>Sort by</label>
                                        <select
                                            // value={sortBy}
                                            // onChange={(e) => setData('category_id', e.target.value)}
                                            className="form-control ml-2"
                                            style={{display:'inline-block'}}
                                        >
                                            <option value="relevant">Most relevant</option>
                                            <option value="highest">Highest number of reviews</option>
                                            <option value="recent">Most recent reviews</option>
                                        </select>
                                    </div>
                                </div>
                                <PaginationList page={page}/>
                            </div>
                            <div className='mb-4'>
                                {/* Popular searches */}
                                <RecentlyReviewedCompany />
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
