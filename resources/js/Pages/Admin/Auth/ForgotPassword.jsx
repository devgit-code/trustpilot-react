import AdminGuestLayout from '@/Layouts/AdminGuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        company_email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.password.email'));
    };

    return (
        <AdminGuestLayout>
            <Head title="Forgot Password" />

            <div className='p-8 bg-gray-50 rounded-3xl'>

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password
                    reset link that will allow you to choose a new one.
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <TextInput
                        id="company_email"
                        type="email"
                        name="company_email"
                        value={data.company_email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('company_email', e.target.value)}
                        required
                    />

                    <InputError message={errors.company_email} className="mt-2" />

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={route('admin.login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Business Login?
                        </Link>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>

                    </div>
                </form>
            </div>
        </AdminGuestLayout>
    );
}
