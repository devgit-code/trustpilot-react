import React, { useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import "../../../css/style.css";
import { Head, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const AdminLayout = ({ children }) => {
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
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Your page description" />
                <meta name="csrf-token" content="{{ csrf_token() }}" />
            </Head>
            {/* Bootstrap icons */}
            {/* <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
            /> */}

            <div id="main">
                <Sidebar auth={auth}/>
                <div className="main-content">
                <Header auth={auth}/>
                {/* Tabs section */}
                <main className="">{children}</main>
                <ToastContainer />

                </div>
            </div>


            {/* Bootstrap js cdn link */}
            <script
                src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                crossOrigin="anonymous"
            ></script>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
                integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
                crossOrigin="anonymous"
            ></script>

        </>
    );
};

export default AdminLayout;
