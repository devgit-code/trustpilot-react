import React from 'react'
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { usePage } from "@inertiajs/react";


const FrontendLayout = ({ children }) => {
    const { auth, flash } = usePage().props
    console.log('d----', flash)
    return (
        <>
            <Navigation auth = {auth}/>

            <main>{children}</main>
            <Footer />
        </>
    )
}

export default FrontendLayout;
