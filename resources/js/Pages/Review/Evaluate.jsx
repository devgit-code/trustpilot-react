import React, { useEffect, useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import company_logo from "@/../images/company-logo.png"
import RatingClick from '@/Components/RatingClick.jsx';
import { MdOutlineEdit } from "react-icons/md";

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


export default function Evaluate({ company }) {
    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        title:'',
        description:'',
        business_id: company.id,
        rating: 0,
        date: new Date().toISOString().split("T")[0]
    });

    const [star, setStar] = useState(0);
    const [editable, SetEditable] = useState(true)
    const inputRef = React.useRef(null);
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const starValue = queryParams.get("star");
        setStar(starValue);
    }, []);

    const extractFirstSentence = (text) => {
        // Split by multiple delimiters: '.', '\n', ',', ':'
        const delimiters = /[.\n,:\-!;]/;
        const parts = text.split(delimiters).filter((part) => part.trim() !== ""); // Remove empty parts
        return parts[0]?.trim() || ""; // Return the first trimmed part or an empty string
    };

    const handleTextareaChange = (e) => {
        const text = e.target.value;
        setData('description', text);

        if(editable){
            // Extract the first sentence as the review title
            const firstSentence = extractFirstSentence(text);
            setData((prevData)=>({
                ...prevData,
                title: firstSentence.trim()
            }))
        }
    };

    const handleTitleChange = (e) => {
        setData('title', e.target.value)
        SetEditable(false)
    }

    const focusOnTitleInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route('reviews.store'), {
            onSuccess: () => {
                // onClose();
            },
        });
    };

    useEffect(()=>{
        setData('rating', star)
    }, [star])

    return (
        <>
            <FrontendLayout>
                <Head title="Evaluate" />

                <div className='bg-whtie border-b '>
                    <div className='container-sm p-4 flex justify-center'>
                        <div className='max-w-screen-sm w-full flex items-center'>
                            <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                                <img src={company.profile?.img ? `/storage/images/logo/${company.profile.img}` : company_logo} alt={company.name} className="w-20 object-cover rounded border-2 border-white" />
                            </div>
                            <div className='ml-5'>
                                <p className='text-gray-800 text-xl font-extrabold'>
                                    {company.company_name}
                                </p>
                                <p className='mb-0 text-gray-700'>{company.website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm p-4 flex justify-center'>
                        <div className='max-w-screen-sm w-full'>
                            <form onSubmit={handleSubmit}>
                                <div className='p-4 bg-white border rounded mt-2'>
                                    <div className='mt-2'>
                                        <p className='text-gray-800 text-lg font-bold'>
                                            Rate your recent experience
                                        </p>
                                        <RatingClick star={star} onClick={setStar}/>
                                    </div>
                                    {star && (
                                        <>
                                            <div className='mt-2'>
                                                <p className='text-gray-800 text-lg font-bold'>
                                                    Tell us more about your experience
                                                </p>
                                                <textarea
                                                    name="description"
                                                    placeholder="What made your experience great? What is this company doing well? Remember to be honest, helpful, and constructive!"
                                                    className="w-full border rounded p-3 h-48"
                                                    value={data.description}
                                                    onChange={handleTextareaChange}
                                                    />
                                                <InputError className="mt-2" message={errors.description} />
                                            </div>

                                            <div>
                                                <div className="mt-3 relative w-full">
                                                    <input
                                                        type="text"
                                                        ref={inputRef}
                                                        value={data.title}
                                                        onChange={handleTitleChange}
                                                        placeholder="What's important for people to know?"
                                                        className="w-full border border-gray-300 rounded-md px-3 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
                                                    />
                                                    <button
                                                        onClick={focusOnTitleInput}
                                                        className="absolute top-0 bottom-0 right-0 bg-gray-100 aspect-[1/1] border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center justify-center hover:bg-gray-200 focus:ring focus:ring-blue-300 focus:outline-none"
                                                    >
                                                        <MdOutlineEdit className='text-2xl'/>
                                                    </button>
                                                </div>

                                                <InputError className="mt-2" message={errors.title} />
                                            </div>

                                            <div className='mt-2'>
                                                <p className='text-gray-800 text-lg font-bold'>
                                                    Date of experience
                                                </p>
                                                <input
                                                    value={data.date}
                                                    onChange={(e)=>setData('date', e.target.value)}
                                                    type="date"
                                                    className="w-full border rounded p-3 text-lg"
                                                    placeholder="mm/dd/yyyy"
                                                    max={today}
                                                    />
                                                <InputError className="mt-2" message={errors.date} />
                                            </div>

                                            <div className='mt-5'>
                                                <p className="text-sm text-gray-600 mb-6">
                                                    By submitting this review, you confirm it’s{" "}
                                                    <span href="#" className="text-blue-600 underline hover:text-blue-800">
                                                    based on a genuine experience
                                                    </span>{" "}
                                                    and you haven’t received an incentive to write it.
                                                </p>

                                                {/* Submit Button */}
                                                <div className='mx-6 '>
                                                    <button type="submit" className="bg-blue-600 text-white text-lg font-bold py-2 rounded-full w-full hover:bg-blue-700 transition">
                                                        Submit review
                                                    </button>
                                                </div>
                                            </div>

                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
