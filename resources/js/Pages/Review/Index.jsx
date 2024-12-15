import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';

import WriteCompanyList from '@/Pages/Category/Partial/WriteCompanyList';
import SearchCompanySection from './Partial/SearchCompanySection';
import AddCompanySection from './Partial/AddCompanySection';


export default function Write({ companies }) {
    return (
        <>
            <FrontendLayout>
                <Head title="Write a Review" />

                <SearchCompanySection />

                <div className="py-4"></div>

                <WriteCompanyList data={companies}/>

                <AddCompanySection />

            </FrontendLayout>
        </>
    );
}
