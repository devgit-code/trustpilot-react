import { Head } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout';
import Sidebar from './Sidebar';

export default function ProfileLayout({ children }) {
    return (
        <FrontendLayout>
            <Head title="Profile" />

            <div className='bg-gray-100 p-2'>
                <div className="container-md mx-auto row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>

                    <div className="col-md-9 my-5">
                    { children }
                    </div>
                </div>
            </div>

        </FrontendLayout>
    );
}
