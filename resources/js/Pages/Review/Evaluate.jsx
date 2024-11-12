import React, { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import logo from '@/../images/company-logo.png'
import ReviewCard from './Partial/ReviewCard.jsx'
import RatingClick from '@/Components/RatingClick.jsx';
import { MdOutlineEdit } from "react-icons/md";

const review = {
    review_id: 13,
    title:'Do not use this company product',
    comment:`Quick review - Currently been waiting in the queue for a few days. Have been constantly asking for update on how much longer my order will take to complete, with no answers. Have asked to upgrade from standard delivery to express delivery to fasten the delivery time, however was told not to as my order is almost first in line. Still 24 hours later, I am still waiting with no indication of how long my order will take to complete.

If your someone who is using bot lobbies to grind camos in BO6, be wary as now I can prestige, however I cant because I will need to re-unlock guns to get headshots with them.

I would carefully consider purchasing if you are in a similar situation as me - with`,
    rating:2,
    date:'2024 November, 3',
    company: {
        name: "MitchCactus",
        website: "www.MitchCactus.com",
    },
    user: {
        name: 'Nicholas Orange',
        location: 'NZ',
        reviews: '32'
    },
    reply: [
        {
            comment: `Hey Nicholas,

We're sorry to hear about the delay and lack of communication regarding your order. We understand how frustrating it can be, especially when you're aiming to complete camo challenges before prestiging. We strive to provide updates, but high demand sometimes affects response times.

We're already on your ticket and prioritizing it. Thank you for your patience and understanding. We're committed to making this right and getting you back to your game as soon as possible.

We hope that you can update your review as it seems your bot lobbies are already in progress.

Also, your comment on Prestiging is unrelated to our services and is just apart of the mechanics of Black Ops 6. Regardless of whether you purchase Bot Lobbies or not, this is an underlying game-feature. We'll sort out your lobbies irrespectively of this though :)`,
            date: '2024-11-03'
        },
    ]
}

export default function Evaluate() {
    const [star, setStar] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
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
        setReviewText(text);

        if(editable){
            // Extract the first sentence as the review title
            const firstSentence = extractFirstSentence(text);
            setReviewTitle(firstSentence.trim());
        }
    };

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value)
        SetEditable(false)
    }

    const focusOnTitleInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    return (
        <>
            <FrontendLayout>
                <Head title="Evaluate" />

                <div className='bg-whtie border-b '>
                    <div className='container-sm p-4 flex justify-center'>
                        <div className='max-w-screen-sm w-full flex items-center'>
                            <div className="relative inline-flex items-center w-20 h-20 border-2 bordered rounded">
                                <img src={logo} alt={'Wainscoting America'} className="w-20 object-cover rounded border-2 border-white" />
                            </div>
                            <div className='ml-5'>
                                <p className='text-gray-800 text-xl font-extrabold'>
                                    Wainscoting America
                                </p>
                                <p className='mb-0 text-gray-700'>wainscotingamerica.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm p-4 flex justify-center'>
                        <div className='max-w-screen-sm w-full'>
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
                                                placeholder="What made your experience great? What is this company doing well? Remember to be honest, helpful, and constructive!"
                                                className="w-full border rounded p-3 h-48"
                                                name="postContent"
                                                value={reviewText}
                                                onChange={handleTextareaChange}
                                                />
                                        </div>

                                        <div className="mt-3 relative w-full">
                                            <input
                                                type="text"
                                                ref={inputRef}
                                                value={reviewTitle}
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

                                        <div className='mt-2'>
                                            <p className='text-gray-800 text-lg font-bold'>
                                                Date of experience
                                            </p>
                                            <input
                                                type="date"
                                                className="w-full border rounded p-3 text-lg"
                                                placeholder="mm/dd/yyyy"
                                                max={today}
                                                />
                                        </div>

                                        <div className='mt-5'>
                                            <p className="text-sm text-gray-600 mb-6">
                                                By submitting this review, you confirm it’s{" "}
                                                <a href="#" className="text-blue-600 underline hover:text-blue-800">
                                                based on a genuine experience
                                                </a>{" "}
                                                and you haven’t received an incentive to write it.
                                            </p>

                                            {/* Submit Button */}
                                            <div className='mx-6 '>
                                                <button className="bg-blue-600 text-white text-lg font-bold py-2 rounded-full w-full hover:bg-blue-700 transition">
                                                    Submit review
                                                </button>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
