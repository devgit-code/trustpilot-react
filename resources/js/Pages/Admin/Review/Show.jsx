import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import moment from 'moment';

import AdminLayout from '@/Layouts/adminLayout';
import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Ratings';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { FaReply } from 'react-icons/fa';

import businessProfilelogo from '@/../images/company-logo.png';

const Show = ({ review, userTotalReviews }) => {
    const { auth } = usePage().props;
    const { data, setData, put, errors } = useForm({
        reply: review.reply?.comment || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('admin.reviews.update', review.id), data);
    };

    return (
        <div className="content-wrapper m-3">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className='flex items-center justify-between'>
                            <div >
                                <h5 className="card-title">Review For
                                    <Link
                                        href={route('admin.businesses.show', review.business.id)}
                                        className='ml-3 text-gray-800 italic font-semibold uppercase hover:text-blue-600'>
                                        {review.business.company_name}
                                    </Link>
                                </h5>
                            </div>

                            <Link href={route('admin.reviews.index')} className="btn btn-primary" type="button">
                                Back
                            </Link>
                        </div>
                        <div className='p-4 bg-white border rounded mt-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <Rating className="inline-flex" rating={review.rating}/>
                                </div>
                                <p className='mb-0 text-sm'>{moment(review.date_experience).fromNow()}</p>
                            </div>
                            <div className='mt-3 flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <UserAvatar user={review.user} avatar_url={review.user?.profile.image} width='3rem' height='3rem'/>
                                    <div className='no-underline ml-3'>
                                        <Link
                                            href={route('admin.users.show', review.user.id)}
                                            className='text-gray-800 font-bold mb-0 capitalize no-underline hover:underline hover:text-blue-500'>
                                            {review.user.name}
                                        </Link>
                                        <div className='flex items-center mt-1'>
                                            <p className='mb-0 text-gray-700 text-sm'>{userTotalReviews} review</p>
                                            {/* <p className='mb-0 text-gray-700 ml-4 flex items-center'><FaMapMarkerAlt className='inline mr-2'/>{review.user.location}</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center mx-auto border border-gray-100 bg-white" style={{width:'100px', height:'100px'}}>
                                    {
                                        review.business.profile.logo ? (
                                            <img
                                                src={`/storage/images/logo/${review.business.profile.logo}`}
                                                alt="business-logo"
                                                className="mx-auto"
                                                width="100"
                                            />
                                        ):(
                                            <img
                                                src={businessProfilelogo}
                                                alt="business-logo"
                                                className="mx-auto"
                                                width="100"
                                            />
                                        )
                                    }
                                    </div>
                                </div>
                            </div>

                            <div className='py-2 border-b-2 '>
                                <div className='mt-3 bg-[#edeef0] m-2'>
                                    <h4 className='block text-gray-700 text-xl font-bold p-2 no-underline hover:underline capitalize'>{review.title}</h4>
                                    <pre className="text-black whitespace-pre-wrap font-medium h-20 p-2">{review.description}</pre>
                                </div>
                                <p className='text-sm text-gray-800 mb-0'><span className='text-gray-800 font-bold mr-2'>Date of experience:</span>{moment(review.date_experience).format("MMM D, YYYY")}</p>
                            </div>
                            {
                                data.reply && (
                                    // <div>
                                    //     <p>Reply from: {review.business.company_name}</p>
                                    //     <pre className="text-black whitespace-pre-wrap font-medium h-20 ">{data.reply}</pre>
                                    // </div>

                <div className='mt-3 bg-[#F1F1E8] rounded-lg border-l-4 p-3 border-blue-500 flex'>
                    <div><FaReply className='text-gray-700 mt-1'/></div>
                    <div className='ml-3 flex-grow'>
                        <div className='flex items-center justify-between'>
                            <a className='text-sm text-gray-800 font-bold no-underline'>
                            Reply from {review.business.company_name}
                            </a>
                            <p className='mb-0 text-sm'>
                            Updated {moment(review.reply.updated_at).fromNow()}
                            </p>
                        </div>

                        <pre className="mt-3 text-black text-sm whitespace-pre-wrap font-medium">{review.reply.comment}</pre>
                    </div>
                </div>
                                    // <form onSubmit={handleSubmit}>
                                    //     <div>
                                    //         <InputLabel className='mt-3 text-xl font-bold' htmlFor="reply" value={`Reply from: ${review.business.company_name}`} />

                                    //         <textarea
                                    //             className="form-control mt-2 !bg-[#F1F1E8]"
                                    //             name="reply"
                                    //             id="reply"
                                    //             rows="5"
                                    //             disabled
                                    //             style={{ height: "auto" }}
                                    //             value={data.reply}
                                    //             onChange={(e) => setData('reply', e.target.value)}
                                    //         ></textarea>

                                    //         <InputError className="mt-2" message={errors.reply} />
                                    //     </div>
                                    // </form>

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Show;

