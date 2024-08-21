import React from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Profissionais = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profissionais de Saúde</h2>}
        >
            <Head title="Profissionais de Saúde" />



        </AuthenticatedLayout>
    )
}

export default Profissionais