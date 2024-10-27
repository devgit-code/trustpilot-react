import React from 'react'
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { usePage } from "@inertiajs/react";


const FrontendLayout = ({ children }) => {
    const { auth } = usePage().props

    return (
        <>
            <Navigation auth = {auth}/>

            <main className="">{children}</main>
            <Footer />
        </>
    )
}

export default FrontendLayout;
