import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx'
import SpinBar from './Partial/SpinBar.jsx'
import ClickableWrite from './Partial/ClickableWrite.jsx'
import Filter from './Partial/Filter.jsx'
import PaginationList from './Partial/PaginationList.jsx'
import CompanyInfo from './Partial/CompanyInfo.jsx'
import CompanyActivity from './Partial/CompanyActivity.jsx'
import CompanyRelated from './Partial/CompanyRelated.jsx'
import ProductList from './Partial/ProductList.jsx'

export default function Company({ data }) {
    return (
        <>
            <FrontendLayout>
                <Head title={data.company.company_name} />

                <SpinBar {...data.company}/>

                <Header {...data.company}/>

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm my-2'>
                        <div className="p-2 grid lg:grid-cols-3 gap-4 grid-cols-1 mb-3">
                            <div className="col-span-2">
                                <div className='flex flex-col gap-4'>
                                    {data.company.products.length !== 0 && (
                                        <ProductList products={data.company.products} website={data.company.website}/>
                                    )}

                                    <ClickableWrite value={data.company.website}/>

                                    <Filter ratings={data.company.rating_statistic}/>

                                    <PaginationList reviews={data.reviews}/>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <CompanyInfo {...data.company}/>

                                <CompanyRelated companies={data.related_companies}/>
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
