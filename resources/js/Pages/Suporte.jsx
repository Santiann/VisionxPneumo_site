import React from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Suporte = ({ auth }) => {
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suporte</h2>}
>
    <Head title="Suporte" />

    

</AuthenticatedLayout>
  )
}

export default Suporte