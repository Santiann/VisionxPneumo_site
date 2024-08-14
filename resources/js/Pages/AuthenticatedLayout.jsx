import { useState } from 'react';
import Logo from '@/Components/Logo';
import Dropdown from '@/Components/Utils/Dropdown';
import NavLink from '@/Components/Utils/NavLink';
import ResponsiveNavLink from '@/Components/Utils/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function Authenticated({ user, children }) {

    return (
        <div className="min-h-screen bg-[#222222]">
            <Header user={user} />
            <div className='flex'>
                <Sidebar />
                <main className='flex-1'>{children}</main>
            </div>

        </div>
    );
}
