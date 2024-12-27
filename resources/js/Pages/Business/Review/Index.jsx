import React from 'react';

import AdminLayout from '@/Layouts/adminLayout';
import ReviewTable from '@/Components/ReviewTable';

const Index = () => {
    const setting = {
        title: 'Reviews',
        url: '/api/business/reviews',
        show_link: 'yonetici.reviews.edit',
        header_name:'user',
        // has_flag: 'true'
    }

    return (
        <div className='content-wrapper m-3'>
            <div className="row">
                <div className="col-lg-12">
                    <div className=' card p-3'>
                        <ReviewTable setting={setting}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
