import React from 'react'
import Navigation from './header';
import Footer from '../../Components/Footer';


const FrontendLayout = ({ children }) => {
    return (
        <>
            <Navigation />

            <main className="">{children}</main>
            <Footer />
        </>
    )
}

export default FrontendLayout;
