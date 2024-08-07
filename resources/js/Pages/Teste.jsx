import Logo from '@/Components/Logo';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Teste() {
    return (
        <>
            <Header />
            <Sidebar />
        </>
    );
}
