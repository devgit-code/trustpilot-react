import FrontendLayout from '@/Layouts/FrontendLayoout';
import Sidebar from './Partials/Sidebar';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <FrontendLayout>
            <Head title="Profile" />

            <div className='bg-gray-100 p-2'>
                <div className="container-md mx-auto row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>

                    <div className="col-md-9 my-5">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="mt-5 p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </FrontendLayout>
    );
}
