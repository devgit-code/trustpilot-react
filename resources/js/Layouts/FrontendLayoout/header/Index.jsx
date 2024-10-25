import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
} from 'react-bootstrap';
import fav from "../../../../images/eniyi-logo-b.png"
import "./Style.css"

export default function Navigation() {
    const { auth } = usePage().props;

    // Function to get the user's initials
    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
        return initials.slice(0, 2); // Return first two initials
    };

    return (
        <>
            <Navbar collapseOnSelect expand="sm" className="bg-dark">
                <Container fluid="lg">
                    <Navbar.Brand ><Link href={route('home')}><img src={fav} alt="logo" style={{height:"35px"}}/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-white"/>
                    <Nav className="d-none d-sm-flex">
                        {auth && auth.user ? (
                            <>
                                <NavDropdown
                                    title={
                                        auth.user.avatar_url ? (
                                            <div
                                                className="bg-gray-200 text-green-500 rounded-circle d-flex justify-content-center align-items-center"
                                                style={{ height: '40px', width: '40px' }}
                                            >
                                                {getInitials(auth.user.name)}
                                            </div>
                                        ) : (
                                            <img
                                                src="/img/avatar/user.png"
                                                alt="avatar"
                                                className="avatar"
                                                style={{ height: '40px', borderRadius: '50%' }}
                                            />
                                        )
                                    }
                                    id="user-dropdown"
                                    align="end"
                                    autoClose='outside'
                                >
                                    <NavDropdown.Item disabled>{auth.user.name}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} href={route('profile')}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>console.log("logout")}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="butn" > Login </Link>
                                <Link href={route('register')} className="butn" > Register </Link>
                            </>
                        )}
                    </Nav>
                    {/* <Navbar.Collapse id="responsive-navbar-nav">

                        <>
                            <Link
                                href={route('login')}
                                className="butn"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="butn"
                            >
                                Register
                            </Link>
                        </>

                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </>
    );
}
