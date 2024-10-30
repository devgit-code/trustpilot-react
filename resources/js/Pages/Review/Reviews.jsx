import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import React from 'react';


export default function Reviews({company_name}) {
    return (
        <>
            <FrontendLayout>
                <Head title="Reviews" />


                <div className="mt-5 h-32 bg-red-600">
{company_name}
                    title
                </div>

                <div className="mt-5 h-32 bg-blue-600">
                    <div className="col-md-9 h-64">
                        <div className="mt-5 h-32 bg-cyan-600">Statistic
                        </div>

                        <div className="mt-5 h-64 bg-red-600">table with pagination
                        </div>
                    </div>

                    <div className="col-md-3 h-32">
                        <div className="mt-5 h-32 bg-cyan-600">info
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
