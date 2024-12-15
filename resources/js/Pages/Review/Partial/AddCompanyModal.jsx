import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

// import puppeteer from 'puppeteer';
import { Modal, Button } from 'react-bootstrap';


export default function AddCompanyModal(props) {
    const [val, setVal] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, get, errors, clearErrors, processing, recentlySuccessful } = useForm({
        website: '',
        company_name: '',
    });

    const handleChangeInput = (e) => {
        setVal(e.target.value)
        setError('')
    }

    const handleAdd = async () => {
        if(!val) return;

        setIsLoading(true);
        try {
            const queryString = new URLSearchParams({url:val}).toString();
            const response = await fetch(`/api/addcompany?${queryString}`);
            const data = await response.json();
            if(data.success == false){
                setError(data.message)
            }else{
                //success to redirect to company review
                get(route('reviews.company', data.message))
            }

        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setIsLoading(false);
        }
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
                        Input company domain. For example, 'google.com'
                    </p>
                    <div className="relative my-3">
                        <input
                            id="search_company"
                            value={val}
                            type="text"
                            onChange={handleChangeInput}
                            placeholder="Company domain"
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
            <Modal.Footer className='!justify-between w-full'>
                <p className='pl-5 text-red-600'>
                {error}
                </p>
                <button className="m-4 bg-blue-500 text-sm text-zinc-50 text-bold px-4 py-2 rounded-full hover:bg-blue-300 hover:text-black disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                    onClick={handleAdd} disabled={isLoading}>
                    {isLoading ? (
                        <div className='flex justify-center min-w-[88px] min-h-[20px]'>
                            <div className="animate-spin text-white rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-50"></div>
                        </div>
                    ) : (
                        'Add Company'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    );
}
