import React, {useState, useEffect} from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import Select from "react-select";
import AdminGuestLayout from '@/Layouts/AdminGuestLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

const customStyles = {
  input: (provided) => ({
    ...provided,
    boxShadow: "none", // Remove any focus shadow
    border: "none", // Remove the input border
    outline: "none", // Remove the browser outline
  }),
};

export default function Claim({ businesses, selected_option}) {
    // const {website } = usePage().props
    // const [selectedOption, setSelectedOption] = useState(null);

    // const formattedData = businesses.map((business) => ({
    //     value: business.id, // Map the ID to the "value" field
    //     label: business.website, // Map the name to the "label" field
    // }));

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        website: selected_option || '',
        // company_name: '',
        first_name: '',
        last_name: '',
        job_title: '',
        domain: '',
        company_email: '',
        password: '',
        password_confirmation: '',
        message: '',
        remember: false,
    });

    const handleSelectChange = (option) => {
        setSelectedOption(option);
        setData('id', option.value)
    };

    useEffect(() => {
        // if(selected_option){
        //     setSelectedOption({
        //         value: selected_option.id,
        //         label: selected_option.website,
        //     });
        //     setData('id', selected_option.id)
        // }

        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('yonetici.claim'));
    };

    return (
        <>
            <AdminGuestLayout>
                <Head title="Business Register" />
                <div className="p-8 bg-gray-50 rounded-3xl">

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={route('yonetici.login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Login
                        </Link>

                        <Link
                            href={route('yonetici.register')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Business not exist?
                        </Link>
                    </div>

                    <h3 className='text-center my-4'>Claim {selected_option ? (<a className="no-underline" href={`https://${selected_option}`} target="_blank">{selected_option}</a>) : 'Business'}</h3>

                    <form onSubmit={submit} className="space-y-4 mt-4">
                        <div>

                            {/* <Select
                                options={formattedData}
                                value={selectedOption}
                                styles={customStyles}
                                onChange={handleSelectChange}
                                placeholder="Select unclaimed Business..."
                                isClearable
                                disabled
                                className="w-64 inline"
                            />
                            <InputError message={errors.id} className="mt-2" /> */}
                        </div>
                        {
                            !selected_option && (
                                <div className="mt-4">
                                    <TextInput
                                        id="website"
                                        type="text"
                                        name="website"
                                        value={data.website}
                                        placeholder="Website Domain"
                                        className="mt-1 block w-full"
                                        autoComplete="website"
                                        onChange={(e) => setData('website', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.website} className="mt-2" />
                                </div>

                            )
                        }

                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <TextInput
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    placeholder="First Name"
                                    className="mt-1 block w-full"
                                    autoComplete="first name"
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.first_name} className="mt-2" />
                            </div>

                            <div className="">
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    placeholder="Last Name"
                                    className="mt-1 block w-full"
                                    autoComplete="last name"
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <div className='flex items-center'>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="company_email"
                                        value={data.company_email}
                                        placeholder="Work Email"
                                        className="mt-1 block w-full"
                                        autoComplete="work email"
                                        onChange={(e) => setData('company_email', e.target.value)}
                                        required
                                    />

                                    {/* <span className="text-gray-500 px-2">
                                        {data.domain}
                                    </span> */}
                                </div>

                                <InputError message={errors.company_email} className="mt-2" />
                            </div>

                            <div className="">
                                <TextInput
                                    id="job_title"
                                    type="text"
                                    name="job_title"
                                    value={data.job_title}
                                    placeholder="Job Title"
                                    className="mt-1 block w-full"
                                    autoComplete="job title"
                                    onChange={(e) => setData('job_title', e.target.value)}
                                    required
                                />

                                <InputError message={errors.job_title} className="mt-2" />
                            </div>
                        </div>


                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="Password"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    placeholder="Confirm Password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <textarea
                                className="form-control mt-2"
                                name="message"
                                id="message"
                                rows="2"
                                style={{ height: "auto" }}
                                value={data.message}
                                placeholder={`If your work email is same as domain you will be the owner.\nIf it is not, Please prove you are the owner of company.`}
                                onChange={(e) => setData('message', e.target.value)}
                            ></textarea>
                        </div>

                        <button disabled={processing} type="submit" className="w-full mt-4 p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600">Submit</button>
                    </form>
                </div>
            </AdminGuestLayout>
        </>
    );
}
