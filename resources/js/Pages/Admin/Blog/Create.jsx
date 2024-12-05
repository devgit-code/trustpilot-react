import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import BlogEditor from './BlogEditor';
const Create = ({ onClose }) => {
    const { flash } = usePage().props;
    const [preview, setPreview] = useState(null); // Preview URL

    const { data, setData, post, errors, clearErrors, processing, recentlySuccessful } = useForm({
        image:null,
        name: '',
        status: 1,
    });

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        clearErrors();

        // Generate preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            // setPreview(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => {
                // onClose();
            },
        });
    };


    return (
        <div className='container-wrapper m-3'>
            <div className="card p-3">
                <div className='flex items-center justify-between'>
                    <div>
                        <h4>Write Blog</h4>
                    </div>

                    <Link href={route('admin.blogs.index')} className="btn btn-primary">
                        Back
                    </Link>
                </div>
                {flash.message && (
                    <div className="alert">{flash.message}</div>
                )}

                <BlogEditor />
            </div>
        </div>
    );
};

export default Create;

Create.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
