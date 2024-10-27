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

export default function Navigation({auth}) {

    // Function to get the user's initials
    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
        return initials.slice(0, 2); // Return first two initials
    };

    const doLogin = () => {
        console.log("login++++", auth)
        // if(auth.is_verified == undefined || auth.is_verified == null || !auth.is_verified)
            // window.location.href = `${process.env.APP_URL}/verify-email`;

        // window.location.href = "http://127.0.0.1:8000/login";
    }

    useEffect(() => {
        console.log("init+++++++++", auth)

    }, []);

    return (
        <>
            <Navbar collapseOnSelect expand="sm" className="bg-dark">
                <Container fluid="lg">
                    <Navbar.Brand ><Link href={route('home')}><img src={logo} alt="logo" style={{height:"2.2rem"}}/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-white"/>

                    <Navbar.Collapse id="responsive-navbar-nav " className="">
                        <div className="list-unstyled sm:hidden block">
                            <Link href="#" className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Write a review</Link>
                            <Link href="#" className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > Categories</Link>
                            <Link href="#" className="block text-center py-2 no-underline text-white pr-4 bg-red hover:bg-blue" > About us</Link>
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

                    <Nav className="d-none d-sm-flex justify-content-center align-items-center">
                        <NavLink href={route('home')} className="butn" > Write a review </NavLink>
                        <NavLink href={route('home')} className="butn" > Categories </NavLink>
                        <NavLink href={route('home')} className="butn" > About us </NavLink>
                        {auth && auth.user ? (
                            <>
                                <NavDropdown
                                    title={
                                        auth.user.avatar_url ? (
                                            <img
                                                src="/img/avatar/user.png"
                                                alt="avatar"
                                                className="avatar p-0"
                                                style={{ height: '2.2rem', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <div
                                                className="bg-gray-200 text-green-500 rounded-circle d-flex justify-content-center align-items-center p-0"
                                                style={{ height: '2.2rem', width: '2.2rem', padding: '0' }}
                                            >
                                                {getInitials(auth.user.name)}
                                            </div>
                                        )
                                    }
                                    id="user-dropdown"
                                    align="end"
                                    autoClose='outside'
                                    style={{ marginLeft: '3rem'}}
                                >
                                    <NavDropdown.Item disabled>{auth.user.name}</NavDropdown.Item>
                                    <NavDropdown.Divider />
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
