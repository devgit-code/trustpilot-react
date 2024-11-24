import ProfileLayout from '@/Layouts/ProfileLayout';
import UserSettingForm from './Partials/UserSettingForm';

export default function Setting({ auth, mustVerifyEmail, status }) {
    return (
        <ProfileLayout>
            <div className="space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UserSettingForm
                        className="max-w-xl"
                    />
                </div>
            </div>
        </ProfileLayout>
    );
}
