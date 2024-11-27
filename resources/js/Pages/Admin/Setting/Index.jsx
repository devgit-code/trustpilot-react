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
import CategoryTab from './Partial/CategoryTab'

const SettingIndex = ({businessProfile, activeTab}) => {
    const { auth } = usePage().props;

    const handleDelete = (event, id) => {
        event.preventDefault();

        confirmAlert({
            title: 'Are you sure?',
            message: "You won't be able to revert this!",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        router.delete(route('admin.roles.destroy', id));
                    },
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };

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
                                    <HomeTab business={auth.user} businessProfile={businessProfile}/>
                                </div>
                            </Tab>
                            <Tab eventKey="logo" title="Logo">
                                <div className='bg-white'>
                                    <LogoTab businessProfile={businessProfile}/>
                                </div>
                            </Tab>
                            <Tab eventKey="account" title="Account">
                                <div className='bg-white'>
                                    <AccountTab auth={auth}/>
                                </div>
                            </Tab>
                            <Tab eventKey="contact" title="Contact Info">
                                <div className='bg-white'>
                                    <ContactTab businessProfile={businessProfile}/>
                                </div>
                            </Tab>
                            <Tab eventKey="category" title="Category">
                                <div className='bg-white'>
                                    <CategoryTab/>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

SettingIndex.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;

export default SettingIndex;
