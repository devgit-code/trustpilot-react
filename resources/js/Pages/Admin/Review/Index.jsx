import AdminLayout from '@/Layouts/adminLayout';
import { React, useState } from 'react';

const Index = () => {
    return (
        <div className="container-fluid basic_table">
        Review
        </div >
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
