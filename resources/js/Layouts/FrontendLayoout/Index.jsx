import React, { useEffect } from 'react'
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { usePage } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles


const FrontendLayout = ({ children }) => {
    const { auth, flash, status } = usePage().props

     useEffect(() => {
        // Display success message if available
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-right",
                autoClose: 3000, // 3 seconds duration
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                className: "bg-green-500 text-black", // Tailwind classes for the success notification
            });
        }

        if (flash.warning) {
            toast.warning(flash.warning, {
                position: "top-right",
                autoClose: 3000, // 3 seconds duration
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                className: "bg-red-500 text-black", // Tailwind classes for the warning notification
            });
        }

        // Display error message if available
        if (flash.error) {
            toast.error(flash.error, {
                position: "top-right",
                autoClose: 3000, // 3 seconds duration
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                className: "bg-red-500 text-black", // Tailwind classes for the error notification
            });
        }
    }, [flash]);

    return (
        <>
            <Navigation auth = {auth}/>
            <ToastContainer />

            <main>{children}</main>
            <Footer />
        </>
    )
}

export default FrontendLayout;
