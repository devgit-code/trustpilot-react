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


const data = [
    {
        image: "https://placekitten.com/64/64",
        name: "EECU Credit Union",
        link: "https://eecu.org",
        rating: 3.8,
        is_verified: true,
        reviews: 1502
    },
    {
        image: "https://placekitten.com/65/65",
        name: "Wainscoting America",
        link: "https://wainscotingamerica.com",
        is_verified: false,
        rating: 5.0,
        reviews: 930
    },
    {
        image: "https://placekitten.com/66/66",
        name: "RISLA",
        link: "https://risla.com",
        is_verified: false,
        rating: 1.8,
        reviews: 3981
    },
    {
        image: "https://placekitten.com/67/67",
        name: "Wade Caves - Astrologer",
        link: "https://wadecaves.com",
        is_verified: true,
        rating: 4.9,
        reviews: 92
    },
];

const data2 = [
    {
        image: "https://placekitten.com/64/64",
        name: "EECU Credit Union",
        link: "https://eecu.org",
        rating: 4.2,
        is_verified: true,
        reviews: 1502
    },
    {
        image: "https://placekitten.com/65/65",
        name: "Wainscoting America",
        link: "https://wainscotingamerica.com",
        is_verified: false,
        rating: 2.7,
        reviews: 930
    },
    {
        image: "https://placekitten.com/66/66",
        name: "RISLA",
        link: "https://risla.com",
        is_verified: false,
        rating: 1.0,
        reviews: 3981
    },
    {
        image: "https://placekitten.com/67/67",
        name: "Wade Caves - Astrologer",
        link: "https://wadecaves.com",
        is_verified: true,
        rating: 0.6,
        reviews: 92
    },
];

const LandingArea = ({ data }) => {
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

            <CompanyList title="Latest Companies" link="/categories/latest" data={data2}/>

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
