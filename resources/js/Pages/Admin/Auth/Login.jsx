import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import AdminGuestLayout from '@/Layouts/AdminGuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import fav from '@/../images/favicon.png'

export default function Login({ status, canResetPassword  }) {
    const { auth } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login'));
    };

    return (

        <AdminGuestLayout>
            <Head title="Login Business" />

            <div className='p-8 bg-gray-50 rounded-3xl'>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <div className="flex justify-center">
                    <Link href={route('home')} className="mt-2"><img src={fav} alt="logo" style={{height:"8rem"}}/></Link>
                </div>
                <h3 className='text-center my-4'>Login Business</h3>

                <div className="flex items-center justify-end mb-4">
                    <Link
                        href={route('admin.register')}
                        className="mr-3 underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Not Register yet?
                    </Link>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            placeholder="Company Email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Password"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ml-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminGuestLayout>
    );
}
