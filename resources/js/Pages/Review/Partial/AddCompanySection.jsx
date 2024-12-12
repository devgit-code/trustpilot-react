import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
    const [val, setVal] = useState("");

    const handleAdd = () => {
        console.log("add company api+++", val)
    };

  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" as='h3'>
            Add company
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="px-4">
                <h5 className="text-bold text-black">Can't find a company?</h5>
                <p className="text-black">
                    It might not be listed on Trustpilot yet. Add it and be the first to write a review.
                </p>
                <div className="relative my-3">
                    <input
                        value={val}
                        type="text"
                        onChange={(e)=>setVal(e.target.value)}
                        placeholder="Find a company to review"
                        className="w-full py-3 px-4 rounded-full text-gray-700 focus:outline-none"
                    />
                    <button className={`${val ? 'block' : 'hidden'} absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center bg-none rounded-full p-2`}
                        onClick={()=>setVal('')}
                        >
                        <svg className='w-6 h-6' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#777">
                            <path d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"/>
                            <path d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button className="m-4 bg-blue-500 text-sm text-zinc-50 text-bold px-4 py-2 rounded-full hover:bg-blue-200 hover:text-black"
                onClick={handleAdd}>
                Add Company
            </button>
        </Modal.Footer>
    </Modal>
  );
}

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

            {/* <MyVerticallyCenteredModal
                show={open}
                onHide={handleOpen}
            /> */}
      </>
    );
};

export default AddCompanySection;
