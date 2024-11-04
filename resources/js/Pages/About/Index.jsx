import { Head } from '@inertiajs/react';
import React from 'react';

import LandingArea from './LandingArea';
import About from './About';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';


export default function About() {
    return (
        <>
            <FrontendLayout>
                <Head title="About" />
                {/* <!-- landingarea --> */}
                <LandingArea />
                <div>About</div>
            </FrontendLayout>
        </>
    );
}
