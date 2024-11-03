import React from 'react';

import fifthbanner from '../../../images/favicon.png'
import SearchInput from '@/Components/Frontend/SearchInput';
import SearchSection from '@/Components/Frontend/SearchSection';
import CategoryGridItems from './Partial/Category';
import CompanyList from './Partial/CompanyList';
import AdPart1 from './Partial/Ad1';
import AdPart2 from './Partial/Ad2';
import RecentReviews from './Partial/RecentReviewList';
import AdPart3 from './Partial/Ad3';
// import AdPart3 from '@/Components/Frontend/Ad';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';


const LandingArea = () => {
    return (
        // <section className="Landing position-relative">
        //     <img src={fifthbanner} alt="" className='' />
        //     <div className='position-absolute top-50 start-50 translate-middle-x'>
        //         <h1 className="text-uppercase fw-bold text-primary display-1">
        //             Lorem ipsum dolor sit amet
        //         </h1>

        //     </div>
        // </section>
        <>
            <SearchSection />

            <div className="container-md mx-auto mt-20 relative flex w-full items-center justify-center">
                <hr className="absolute h-px my-8 w-full bg-gray-500 border-0" />
                <button className="absolute z-10 flex items-center px-4 py-3 border border-blue-500 group text-sm rounded-full bg-slate-50/90 hover:bg-gray-100 transition duration-300 ease-in-out">
                Bought something recently?
                <span className="ml-1 text-bold text-blue-500"> Write a review</span>
                <span className="ml-2 font-semibold text-blue-500 transition-transform transform group-hover:translate-x-1">
                    <FiArrowRight />
                </span>
                </button>
            </div>

            <CategoryGridItems />

            <AdPart1 />

            <CompanyList title="Best in Banks"/>

            <CompanyList title="Latest Companies"/>

            <AdPart2 />

            <RecentReviews />

            <AdPart3 />

            {/* <AdPart3
                bgColor="#234F3F"
                headTitle="Are you a business?"
                bodyText="Join Trustpilot and inspire customer confidence with real reviews."
                imgSrc={ad3}
                imgClassName="w-1/2 right-0 float-right"
                imgAspect="1/1"
                btnText="Contact us"
                /> */}
        </>
    );
};

export default LandingArea;
