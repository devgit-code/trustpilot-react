import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import moment from 'moment';

import AdminLayout from '@/Layouts/adminLayout';
import UserAvatar from '@/Components/UserAvatar';
import Rating from '@/Components/Ratings';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

const Edit = ({ review, userTotalReviews }) => {
    const { auth } = usePage().props;
    const { data, setData, put, errors } = useForm({
        reply: review.reply?.comment || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('business.reviews.update', review.id), data);
    };

    return (
        <div className="content-wrapper m-3">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Detail</h4>
                        <div className='p-4 bg-white border rounded'>
                            <div className=' pb-3 border-b border-b-2 flex items-center'>
                                <UserAvatar user={review.user} avatar_url={review.user?.profile.image} width='3rem' height='3rem'/>
                                <div className='no-underline ml-3'>
                                    <p className='text-gray-800 text-sm font-bold mb-0'>
                                        {review.user.name}
                                    </p>
                                    <div className='flex items-center mt-1'>
                                        <p className='mb-0 text-gray-700 text-sm'>{userTotalReviews} review</p>
                                        {/* <p className='mb-0 text-gray-700 ml-4 flex items-center'><FaMapMarkerAlt className='inline mr-2'/>{review.user.location}</p> */}
                                    </div>
                                </div>
                            </div>

                            <div className='py-2'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <Rating className="inline-flex" rating={review.rating}/>
                                    </div>
                                    <p className='mb-0 text-sm'>{moment(review.date_experience).fromNow()}</p>
                                </div>
                                <div className='mt-3'>
                                    <h4 className='block text-gray-700 text-xl font-bold p-2 no-underline hover:underline capitalize'>{review.title}</h4>
                                    <pre className="text-black whitespace-pre-wrap font-medium h-20">{review.description}</pre>
                                </div>
                                <p className='text-sm text-gray-800 mb-0'><span className='text-gray-800 font-bold mr-2'>Date of experience:</span>{moment(review.date_experience).format("MMM D, YYYY")}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel className='mt-3 text-xl font-bold' htmlFor="reply" value="Write reply:" />

                                <textarea
                                    className="form-control mt-2 !bg-[#F1F1E8]"
                                    name="reply"
                                    id="reply"
                                    rows="5"
                                    style={{ height: "auto" }}
                                    value={data.reply}
                                    onChange={(e) => setData('reply', e.target.value)}
                                ></textarea>

                                <InputError className="mt-2" message={errors.reply} />
                            </div>

                            <div className='mt-3 space-x-3'>
                                <button type="submit" className="btn btn-primary">
                                    Reply
                                </button>
                                <Link href={route('business.reviews.index')} className="btn btn-danger" type="button">
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>
export default Edit;

