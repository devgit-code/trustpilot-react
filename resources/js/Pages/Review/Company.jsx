import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx'
import SpinBar from './Partial/SpinBar.jsx'

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
                    <div className='container-sm pb-5'>
                        <div className='min-h-screen bg-black'>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
