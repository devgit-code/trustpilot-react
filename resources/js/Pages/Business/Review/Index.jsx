import React from 'react';

import AdminLayout from '@/Layouts/adminLayout';
import ReviewTable from '@/Components/ReviewTable';

const Index = () => {
    // const handleDelete = (event, reviweId) => {
    //     event.preventDefault();

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             router.delete(route('admin.reviews.destroy', reviweId));
    //         }
    //     });
    // };
    const setting = {
        title: 'Reviews',
        url: '/api/business/reviews',
        show_link: 'business.reviews.edit',
        mode:'user'
    }

    return (
        <div className='content-wrapper m-3'>
            <div className="row m-1">
                <div className="col-sm-12 card p-3">
                    <ReviewTable setting={setting}/>
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
