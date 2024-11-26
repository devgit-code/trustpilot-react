import {
    Link,
    usePage,
} from '@inertiajs/react';
import Footer from '@/Components/Footer';
import {
    Container,
    Navbar,
} from 'react-bootstrap';
import logo from "@/../images/eniyi-logo-b.png"

export default function Guest({ children }) {
    const { auth } = usePage().props

    return (
        <>

            <Navbar collapseOnSelect expand="sm" className="bg-dark h-[65px]">
                <Container fluid="lg">
                    <Navbar.Brand ><Link href={route('home')}><img src={logo} alt="logo" className="my-1" style={{height:"2.2rem"}}/></Link></Navbar.Brand>
                </Container>
            </Navbar>

            <div className="flex sm:justify-center bg-[#29DB8F]">
                <div className="w-full sm:max-w-xl py-10 gap-8 bg-transparent rounded-lg overflow-hidden">
                    {children}
                </div>
            </div>

            <Footer />
        </>
    );
}
