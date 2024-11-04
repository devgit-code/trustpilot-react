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
            <footer className="bg-dark pt-5 text-white">
                <Container fluid="lg">
                    <div className="py-5">
                        <a href={route('home')} className="sm:inline-block sm:justify-start flex justify-center p-1">
                            <img src={logo} alt="logo" style={{height:"2.1rem"}}/>
                            {/* <span className="text-white fw-bold fs-4"> TOPNTECH </span> */}
                        </a>
                    </div>
                    <div className="pb-100">
                        <div className="row">
                            <div className="col-lg-3">
                                <h6 className="text-lg-start text-center text-lg fw-bold text-zinc-400">About</h6>
                                <ul className="list-unstyled">
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > About us</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Jobs</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Contact</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Blog</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > How Trustpilot works</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3">
                                <h6 className="text-lg-start text-center text-lg fw-bold text-zinc-400">Community</h6>
                                <ul className="list-unstyled">
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Trust in reviews</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Help center</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Login</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Sign up</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3">
                                <h6 className="text-lg-start text-center text-lg fw-bold text-zinc-400">Businesses</h6>
                                <ul className="list-unstyled">
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Products</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Plans & pricing</Link>
                                    </li>
                                    <li className="text-lg-start text-sm text-center py-3">
                                        <Link href="#" className="no-underline text-white hover:underline" > Blog for business</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3">
                                <Link href={route('home')} className="flex justify-center"><img src={fav} alt="logo" style={{height:"6rem"}}/></Link>
                                <p className="text-md mt-2 indent-3 p-1">
                                    <i>
                                         At Eniyi.co, we are driven by a passion for technology and a commitment to providing innovative solutions that empower businesses to thrive in the digital age.
                                    </i>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-5 text-md">
                        <Link href="#" className="sm:inline-block sm:text-left block text-center py-2 no-underline text-white pr-4 hover:underline" > Legal</Link>
                        <Link href="#" className="sm:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" > Privacy policy</Link>
                        <Link href="#" className="sm:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" > Terms & conditions</Link>
                        <Link href="#" className="sm:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" > Guidelines for reviewers</Link>
                        <Link href="#" className="sm:inline-block sm:text-left block text-center py-2 no-underline text-white px-4 hover:underline" > Cookie preference</Link>
                    </div>

                </Container>
                <hr className="my-2" />
                <div className="text-zinc-400 py-9 ml-9">
                    © 2024 Eniyi.co :
                    <a className="fw-bold text-zinc-400 hover:text-gray-100" href="#">
                    Tüm hakları saklıdır.
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer
