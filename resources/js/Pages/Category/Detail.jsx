import React, { useState, useEffect, useRef  } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx'
import Rating from './Partial/Rating.jsx'
import Status from './Partial/CompanyStatus.jsx'
import RelatedCategory from './Partial/RelatedCategory.jsx'
import RecentlyReviewedCompany from './Partial/RecentCompanyReviews.jsx'
import PaginationList from './Partial/PaginationList.jsx'
import Pagination from './Partial/Pagination.jsx';

export default function Detail({ data }) {
    const { get } = useForm();

    const basePath = data.sub_category ?
        route('categories.detail', {category:data.sub_category.category.slug, sub_category:data.sub_category.slug})
        :
        route('categories.show', data.category.slug) ;

    const queryParams = new URLSearchParams(window.location.search);
    const pageValue = queryParams.get("page") || '1';
    const sortValue = queryParams.get("sort") || 'trustscore';
    const scoreValue = queryParams.get("score") || 'any';
    const verifiedValue = queryParams.get("verified");
    const claimedValue = queryParams.get("claimed");

    const [page, setPage] = useState(pageValue);
    const [sort, setSort] = useState(sortValue);
    const [score, setScore] = useState(scoreValue);
    const [verified, setVerified] = useState(verifiedValue, false);
    const [claimed, setClaimed] = useState(claimedValue, false);

    const isFirstRender = useRef(true);

    // Update the full URL whenever role or primary changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set to false after the first render
            return;
        }

        const queryParams = new URLSearchParams();
        if (sort) queryParams.append("sort", sort);
        if (score) queryParams.append("score", score);
        if (verified) queryParams.append("verified", verified);
        if (claimed) queryParams.append("claimed", claimed);
        if (page) queryParams.append("page", page);

        get(`${basePath}?${queryParams.toString()}`, {
            onSuccess: () => {
                // onClose();
            },
        });
    }, [sort, score, verified, claimed, page]);

    return (
        <>
            <FrontendLayout>
                <Head title='Detail' />

                <Header category={data.sub_category ? data.sub_category : data.category}/>

                <div className='bg-[#FCFBF3] pt-5'>
                    <div className='container-lg mx-auto row'>
                        <div className="col-lg-4 px-3 mb-5">
                            <div className='bg-white border rounded mb-4 p-4'>
                                <Rating score={score} onChange={setScore}/>

                                <Status verified={verified} onVerifyChange={setVerified} claimed={claimed} onClaimChange={setClaimed}/>
                            </div>
                            <div className='bg-white border rounded p-4 mb-4'>
                                <RelatedCategory category={data.sub_category ? data.sub_category : data.category} categories={data.related_categoreies}/>
                            </div>
                        </div>
                        <div className="col-lg-8 px-3 mt-3">
                            <div className='mb-4'>

                                <div className='mb-4 ml-2 flex flex-col sm:flex-row items-center justify-between'>
                                    <div className='flex items-center'>
                                        <p className='text-black text-sm'>Total {data.pagination.total} results</p>
                                    </div>
                                    <div className='flex items-center p-2'>
                                        <label className='mr-2' htmlFor="sort">Sort</label>
                                        <select
                                            id="sort"
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            className="form-control px-5 ps-2"
                                            style={{display:'inline-block'}}
                                        >
                                            <option value="trustscore">Most relevant</option>
                                            <option value="highest">Highest number of reviews</option>
                                            <option value="latest">Most recent reviews</option>
                                        </select>
                                    </div>
                                </div>

                                <PaginationList companies={data.companies}/>

                                <Pagination
                                    pagination={data.pagination}
                                    onPageChange={setPage}
                                    className='mb-2 flex justify-center itmes-center'
                                    />
                            </div>
                            <div className='mb-4'>
                                {/* Popular searches */}
                                <RecentlyReviewedCompany reviews={data.recent_reviews}/>
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
