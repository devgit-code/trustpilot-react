import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx'
import SpinBar from './Partial/SpinBar.jsx'
import ClickableWrite from './Partial/ClickableWrite.jsx'
import Filter from './Partial/Filter.jsx'
import PaginationList from './Partial/PaginationList.jsx'
import CompanyInfo from './Partial/CompanyInfo.jsx'
import CompanyActivity from './Partial/CompanyActivity.jsx'
import CompanyRelated from './Partial/CompanyRelated.jsx'

const company = {
    logo: 'https://via.placeholder.com/40', // Replace with actual logo URL
    name: 'Liquid Expat Mortgages',
    website: 'liquidexpatmortgages.com',
    is_verified: true,
    rating_statistic:{
        avg: 4.2,
        total: 340,
        stars: {
            '5' : 221,
            '4' : 114,
            '3' : 1,
            '2' : 32,
            '1' : 2,
        }
    }
}

export default function CompanyReviews({company_name}) {

    return (
        <>
            <FrontendLayout>
                <Head title="Reviews" />

                <SpinBar {...company}/>

                <Header {...company}/>

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm my-2'>
                        <div className="p-2 grid sm:grid-cols-3 gap-4 grid-cols-1 mb-3">
                            <div className="col-span-2">
                                <div className='flex flex-col gap-4'>
                                    <ClickableWrite company_name={company.name}/>

                                    <Filter />

                                    <PaginationList />
                                </div>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <CompanyActivity />

                                <CompanyInfo />

                                <CompanyRelated />
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
