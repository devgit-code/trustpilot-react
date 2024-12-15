import React, { useState, useEffect } from 'react';

import AddCompanyModal from './AddCompanyModal';

const AddCompanySection = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <div className="bg-[#F1F1E8] rounded-3xl my-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between container-md mx-auto">
                {/* Text Section */}
                <div className="flex-1 ml-4 p-4">
                    <p className="text-lg text-black font-bold mb-1">Can't find a company?</p>
                    <p className="text-md text-black mb-0">It might not be listed on Trustpilot yet. Add it and be the first to write a review.</p>
                </div>

                <div className="flex md:justify-end justify-center">
                    <button className="m-4 bg-none text-gray-200 text-sm text-bold border-1 border-solid bg-blue-500 border-sky-500 px-4 py-2 rounded-full hover:border-gray-500 hover:bg-sky-200 hover:text-black"
                        onClick={handleOpen}>
                        Add Company
                    </button>
                </div>

            </div>

            <AddCompanyModal
                show={open}
                onHide={handleOpen}
            />
      </>
    );
};

export default AddCompanySection;
