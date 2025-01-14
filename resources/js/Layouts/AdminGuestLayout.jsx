import React, { useEffect } from "react";
import {
    Link,
    usePage,
} from '@inertiajs/react';
import Footer from '@/Components/Footer';
import {
    Container,
    Navbar,
} from 'react-bootstrap';
import logo from "@/../images/eniyi-logo-b.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

export default function Guest({ children }) {
    const { auth, flash } = usePage().props

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
        <div className="flex flex-col min-h-screen">

            <Navbar collapseOnSelect expand="sm" className="bg-dark h-[65px]">
                <Container fluid="lg">
                    <Navbar.Brand ><Link href={route('home')}><img src={logo} alt="logo" className="my-1" style={{height:"2.2rem"}}/></Link></Navbar.Brand>
                </Container>
            </Navbar>

            <div className="flex flex-grow sm:justify-center bg-[#29DB8F]">
                <div className="w-full sm:max-w-xl py-10 gap-8 bg-transparent rounded-lg overflow-hidden">
                    {children}
                </div>
            </div>

            <Footer />
            <ToastContainer />
        </div>
    );
}
