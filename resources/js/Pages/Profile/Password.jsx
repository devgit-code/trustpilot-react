import ProfileLayout from '@/Layouts/ProfileLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <ProfileLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>
            </div>
        </ProfileLayout>
    );
}
