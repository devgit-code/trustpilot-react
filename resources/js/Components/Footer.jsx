import React from 'react'
import {
    Container,
} from 'react-bootstrap';
import {
    Link,
    usePage,
    // Button,
} from '@inertiajs/react';
import logo from '../../images/eniyi-logo-b.png'
import fav from '../../images/favicon.png'

const Footer = () => {
    return (
        <>
            <footer className="bg-dark p-5 text-white">
                <Container fluid="lg">
                    <div className='row'>
                        <div className="col-lg-3">
                            <Link href={route('home')} className="lg:inline-block lg:justify-start flex justify-center px-4 pb-4">
                                <img src={logo} alt="logo" style={{height:"2.1rem"}}/>
                                {/* <span className="text-white fw-bold fs-4"> TOPNTECH </span> */}
                            </Link>
                        </div>
                        <div className="col-lg-9">
                            <Link href={route('blogs.index')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white pr-4 hover:underline" >About Us</Link>
                            <Link href={route('categories.index')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" >Categories</Link>
                            <Link href={route('reviews.write')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" >Write a Review</Link>
                            <Link href={route('register')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" >Sign Up</Link>
                            <Link href={route('admin.login')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" >Business Login</Link>
                            <Link href={route('admin.register')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" >Business Sign Up</Link>
                            <Link href={route('admin.claim')} className="lg:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" >Claim Business</Link>
                        </div>
                    </div>
                </Container>
                <hr className="my-2" />
                <p className='mt-4 sm:mx-5 text-center text-zinc-300'>At Eniyi.co, we are driven by a passion for technology and a commitment to providing innovative solutions that empower businesses to thrive in the digital age.</p>
                <div className="text-zinc-300 pb-5 text-center">
                    You can contact us
                    <a className="ml-2 mb-0 fw-bold text-zinc-400 hover:text-gray-100" href="mailto:info@eniyi.co">
                    info@eniyi.co
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer
