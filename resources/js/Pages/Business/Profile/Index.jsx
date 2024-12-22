import React from 'react';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    Tab,
    Tabs,
} from 'react-bootstrap';

import AdminLayout from '@/Layouts/adminLayout';
import HomeTab from './Partial/HomeTab.jsx'
import LogoTab from './Partial/LogoTab'
import AccountTab from './Partial/AccountTab'
import ContactTab from './Partial/ContactTab'

const Index = ({businessProfile, activeTab, business}) => {
    return (
        <div className="content-wrapper m-3">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <Tabs
                            defaultActiveKey={activeTab}
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                            >
                            <Tab eventKey="home" title="General">
                                <div className='bg-white'>
                                    <HomeTab business={business} businessProfile={businessProfile}/>
                                </div>
                            </Tab>
                            {/* <Tab eventKey="logo" title="Logo">
                                <div className='bg-white'>
                                    <LogoTab businessProfile={businessProfile}/>
                                </div>
                            </Tab> */}
                            {/* <Tab eventKey="account" title="Account">
                                <div className='bg-white'>
                                    <AccountTab business={business}/>
                                </div>
                            </Tab> */}
                            <Tab eventKey="contact" title="Profile">
                                <div className='bg-white'>
                                    <ContactTab businessProfile={businessProfile}/>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default Index;
