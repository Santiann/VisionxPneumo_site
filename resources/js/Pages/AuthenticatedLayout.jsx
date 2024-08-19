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
        <div className="h-screen bg-[#222222]">
            <Header user={user} />
            <div className='flex h-screen  overflow-y-auto'>
                <Sidebar />
                <main className='flex-1 overflow-y-auto mt-14 h-100 p-8 sm:ml-56 max-w-8xl sm:px-6 lg:px-8'>
                    {children}
                </main>
            </div>

        </div>
    );
}
