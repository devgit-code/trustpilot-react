import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';

import SearchCategorySection from './Partial/SearchCategorySection';
import CategoryList from './Partial/CategoryList'

export default function Category({ categories }) {
    return (
        <>
            <FrontendLayout>
                <Head title="Category" />

                <SearchCategorySection />

                <div className="bg-[#FCFBF3] min-h-screen py-5">
                    <div className="container-lg">
                        <h2 className="font-bold text-2xl mb-5">Explore companies by category</h2>
                        <CategoryList categories={categories}/>
                    </div>
                </div>
            </FrontendLayout>
        </>
    );
}
