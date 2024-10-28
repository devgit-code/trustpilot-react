import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';


export default function Evaluate({company_name}) {
    return (
        <>
            <FrontendLayout>
                <Head title="Rate" />


                <div className="mt-5 h-32 bg-red-600">
                    {company_name}
                </div>


                <div className="mt-5 h-32 bg-red-600">
                    form
                </div>

            </FrontendLayout>
        </>
    );
}
