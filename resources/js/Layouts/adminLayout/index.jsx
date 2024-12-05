import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import "../../../css/style.css";
import { Head, usePage } from "@inertiajs/react";


const AdminLayout = ({ children }) => {
    const { auth } = usePage().props

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Your page description" />
                <meta name="csrf-token" content="{{ csrf_token() }}" />
            </Head>
            {/* Bootstrap icons */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
            />

            <div id="main">
                <Sidebar auth={auth}/>
                <div className="main-content">
                <Header auth={auth}/>
                {/* Tabs section */}
                <main className="">{children}</main>

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
