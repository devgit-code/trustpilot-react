import {
    Link,
    usePage,
    // Button,
} from '@inertiajs/react';
import {
    React,
    useEffect,
} from 'react';
import {
    Container,
    Nav,
    NavLink,
    Navbar,
    NavDropdown,
} from 'react-bootstrap';

import logo from "../../../images/eniyi-logo-b.png"
import "./Style.css"
import UserAvatar from '@/Components/UserAvatar';

export default function Navigation({auth}) {
    return (
        <>
            <Navbar collapseOnSelect expand="sm" className="bg-dark p-0">
                <Container fluid="lg">
                    <Navbar.Brand ><Link href={route('home')}><img src={logo} alt="logo" className="my-1" style={{height:"2.2rem"}}/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-white"/>

                    <Navbar.Collapse id="responsive-navbar-nav " className="">
                        <div className="list-unstyled sm:hidden block">
                            <Link href={route('reviews')} className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Write a review</Link>
                            <Link href={route('categories')} className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Categories</Link>
                            <Link href={route('aboutus')} className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Blog</Link>
                            <hr className="hr text-white" />
                            {auth && auth.user ? (
                                <>
                                    <Link href="#" disabled className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > {auth.user.name}</Link>
                                    <Link href={route('profile')} className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Profile</Link>
                                    <Link href={route('logout')} as="button" method="post" className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Logout</Link>
                                </>
                            ):(
                                <>
                                    <Link href={route('login')} className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue"> Login </Link>
                                    <Link href={route('register')} className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Register </Link>
                                </>
                            )}
                        </div>

                    </Navbar.Collapse>

                    <Nav className="d-none d-sm-flex justify-content-center h-full">
                        <div className="flex h-full">
                            <NavLink href={route('reviews')} active={route().current('reviews')} className="butn" > Write a review </NavLink>
                            <NavLink href={route('categories')} active={route().current('categories')} className="butn" > Categories </NavLink>
                            <NavLink href={route('aboutus')} active={route().current('aboutus')} className="butn" > About us </NavLink>
                        </div>
                        {auth && auth.user ? (
                            <>
                                <NavDropdown
                                    title={
                                        <UserAvatar user={auth.user} avatar_url={auth.userProfileImage}/>
                                    }
                                    id="user-dropdown"
                                    align="end"
                                    autoClose='outside'
                                    style={{ marginLeft: '3rem'}}
                                    className="flex items-center"
                                >
                                    <NavDropdown.Item disabled>{auth.user.name}</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} href={route('profile')}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-left"
                                        >Logout</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="butn" style={{ marginLeft: '3rem'}}> Login </Link>
                                <Link href={route('register')} className="butn" > Register </Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
