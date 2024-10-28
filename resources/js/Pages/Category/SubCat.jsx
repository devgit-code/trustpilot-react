import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';


export default function SubCat({sel_cat, sub_cat}) {
    return (
        <>
            <FrontendLayout>
                <Head title="SubCat" />


                <div className="mt-5 h-32 bg-red-600">

                    title
                </div>

                <div className="mt-5 h-32 bg-blue-600">
                    <div className="col-md-3 h-32">
                        <div className="mt-5 h-32 bg-cyan-600">Info
                        </div>
                    </div>

                    <div className="col-md-9 h-64">
                        <div className="mt-5 h-64 bg-red-600">table with pagination
                        </div>

                        <div className="mt-5 h-32 bg-cyan-600">Recetnly viewed
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
