import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';


export default function Index() {
    return (
        <>
            <FrontendLayout>
                <Head title="Write" />


                <div className="mt-5 h-32 bg-red-600">

                    search
                </div>

                <div className="mt-5 h-32 bg-cyan-600">Recent
                </div>

            </FrontendLayout>
        </>
    );
}
