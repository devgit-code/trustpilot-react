import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';

import CompanyList from '@/Components/Frontend/CompanyList';
import SearchCompanySection from './Partial/SearchCompanySection';
import AddCompanySection from './Partial/AddCompanySection';


const data = [
    {
        image: "https://placekitten.com/64/64",
        title: "EECU Credit Union",
        link: "https://eecu.org",
        rating: 3.8,
        is_verified: true,
        reviews: 1502
    },
    {
        image: "https://placekitten.com/65/65",
        title: "Wainscoting America",
        link: "https://wainscotingamerica.com",
        is_verified: false,
        rating: 5.0,
        reviews: 930
    },
    {
        image: "https://placekitten.com/66/66",
        title: "RISLA",
        link: "https://risla.com",
        is_verified: false,
        rating: 1.8,
        reviews: 3981
    },
    {
        image: "https://placekitten.com/67/67",
        title: "Wade Caves - Astrologer",
        link: "https://wadecaves.com",
        is_verified: true,
        rating: 4.9,
        reviews: 92
    },
];

export default function Index() {
    return (
        <>
            <FrontendLayout>
                <Head title="Write a Review" />

                <SearchCompanySection />

                <div className="py-4"></div>

                <CompanyList title="Ready to write your review?" data={data}/>

                <AddCompanySection />

            </FrontendLayout>
        </>
    );
}
