import ProfileLayout from '@/Layouts/ProfileLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Edit() {
    return (
        <ProfileLayout>
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <UpdatePasswordForm className="max-w-xl" />
            </div>
        </ProfileLayout>
    );
}
