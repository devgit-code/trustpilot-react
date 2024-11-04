import { Head } from '@inertiajs/react';
import React from 'react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';


export default function AboutUs() {
    return (
        <>
            <FrontendLayout>
                <Head title="About Us" />
                {/* <!-- landingarea --> */}
                <div>About Us</div>
            </FrontendLayout>
        </>
    );
}
