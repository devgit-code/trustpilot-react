import ApplicationLogo from '@/Components/ApplicationLogo';
import {
    Link,
    usePage,
} from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    const { auth } = usePage().props

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation auth={auth}/>

            <div className="flex flex-grow flex-col sm:justify-center items-center pt-3 sm:pt-0 bg-gray-100">

                <div className="w-full sm:max-w-md my-5 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>

            <Footer />
        </div>
    );
}
