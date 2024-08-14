import Logo from '@/Components/Logo';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Dropdown from '@/Components/Utils/Dropdown';
import NavLink from '@/Components/Utils/NavLink';
import ResponsiveNavLink from '@/Components/Utils/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Teste() {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <>
            <Header />
            <Sidebar />
        </>
    );
}
