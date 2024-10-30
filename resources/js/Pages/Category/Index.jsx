import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';


export default function Category() {
    return (
        <>
            <FrontendLayout>
                <Head title="Category" />


                <div className="mt-5 h-32 bg-red-600">
                    Search Company with limit search count
                </div>

                <div className="mt-5 h-32 bg-blue-600">
                    All tag
                </div>

            </FrontendLayout>
        </>
    );
}
