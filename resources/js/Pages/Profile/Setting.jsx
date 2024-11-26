import ProfileLayout from '@/Layouts/ProfileLayout';
import Alert from '@/Components/Alert';
import UserSettingForm from './Partials/UserSettingForm';

export default function Setting({ userProfile, mustVerifyEmail, status }) {
    return (
        <ProfileLayout>
            <div className="space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    {/* {status && (
                        <Alert
                            message={status}
                            type="success"
                            duration={5000} // Alert disappears after 5 seconds
                        />
                    )} */}
                    <UserSettingForm
                        userProfile={userProfile}
                        status={status}
                        className="max-w-xl"
                    />
                </div>
            </div>
        </ProfileLayout>
    );
}
