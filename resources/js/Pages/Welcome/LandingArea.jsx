import React from 'react';

import fifthbanner from '../../../images/favicon.png'
import SearchSection from './Partial/SearchSection';
import CategoryGridItems from './Partial/CategoryList';
import CompanyList from '@/Components/Frontend/CompanyList';
import AdPart1 from './Partial/Ad1';
import AdPart2 from './Partial/Ad2';
import RecentReviews from './Partial/RecentReviewList';
import AdPart3 from './Partial/Ad3';
// import AdPart3 from '@/Components/Frontend/Ad';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const LandingArea = ({ data }) => {
    return (
        <>
            <SearchSection />

            <div className="container-md mx-auto mt-20 relative flex w-full items-center justify-center">
                <hr className="absolute h-px my-8 w-full bg-gray-500 border-0" />
                <a href={route('reviews')} className="no-underline absolute z-10 flex items-center px-4 py-3 border border-blue-500 group text-sm rounded-full bg-slate-50/90 hover:bg-gray-100 transition duration-300 ease-in-out">
                    <span className='text-gray-700'>Bought something recently?</span>
                    <span className="ml-1 text-bold text-blue-500"> Write a review</span>
                    <span className="ml-2 font-semibold text-blue-500 transition-transform transform group-hover:translate-x-1">
                        <FiArrowRight />
                    </span>
                </a>
            </div>

            <CategoryGridItems categories={data.categories}/>

            <AdPart1 />

            {/* <CompanyList title="Best in Banks" link="/categories/bank" data={data}/> */}

            <CompanyList title="Latest Companies" link="/categories/latest" data={data.businesses}/>

            <AdPart2 />

            <RecentReviews reviews={data.reviews}/>

            <AdPart3 />
        </>
    );
};

export default LandingArea;
