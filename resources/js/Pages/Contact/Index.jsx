import { Head } from '@inertiajs/react';
import React from 'react';

import LandingArea from './LandingArea';
import About from './About';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';


export default function Contact() {
    return (
        <>
            <FrontendLayout>
                <Head title="Contact" />
                {/* <!-- landingarea --> */}
                <LandingArea />
                <div>Contact</div>
            </FrontendLayout>
        </>
    );
}
