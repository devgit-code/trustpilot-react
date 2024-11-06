import React from 'react';
import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import Header from './Partial/Header.jsx';


export default function Detail({detail="Detail"}) {
    return (
        <>
            <FrontendLayout>
                <Head title={detail} />

                <Header />


                {detail}
            </FrontendLayout>
        </>
    );
}
