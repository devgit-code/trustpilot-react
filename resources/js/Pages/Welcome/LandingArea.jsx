import React from 'react';

import fifthbanner from '../../../images/favicon.png'
import SearchInput from '@/Components/Frontend/SearchInput';
import SearchSection from '@/Components/Frontend/SearchSection';

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

            <div className="mt-5 h-32 bg-blue-600">
                Recommend Category
            </div>

            <div className="mt-5 h-32 bg-red-600">
                Ad
            </div>

            <div className="mt-5 h-32 bg-blue-600">
                Best in Bank
            </div>

            <div className="mt-5 h-32 bg-red-600">
                Ad
            </div>

            <div className="mt-5 h-32 bg-blue-600">
                Recent review Component
            </div>
        </>
    );
};

export default LandingArea;
