import ProfileLayout from '@/Layouts/ProfileLayout';
import UpdateUserInformationForm from './Partials/UpdateUserInformationForm';

export default function Setting({ auth, mustVerifyEmail, status }) {
    return (
        <ProfileLayout>
            <div className="space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateUserInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>
            </div>
        </ProfileLayout>
    );
}
