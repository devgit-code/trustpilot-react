import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import FrontendLayout from '@/Layouts/FrontendLayoout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import fav from '@/../images/favicon.png'

export default function Login({ status }) {
    const { auth } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        if(auth && auth.role)
        {

            console.log('heee-------', auth.role)
        }

        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login'));
    };

    return (
        <FrontendLayout>
            <Head title="Admin" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="flex flex-col sm:justify-center items-center py-5 sm:pt-0 bg-[#29DB8F]">
                <div className="w-full sm:max-w-md mt-3 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <h3 className='text-center'>Log in to Business</h3>

                    <div className="flex justify-center ">
                        <Link href={route('home')} className="mt-2"><img src={fav} alt="logo" style={{height:"8rem"}}/></Link>

                    </div>
                    <form onSubmit={submit} className='mt-4'>
                        <div>
                            <InputLabel htmlFor="email" value="Work Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between mt-4">

                            <PrimaryButton className="ml-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </FrontendLayout>
    );
}
