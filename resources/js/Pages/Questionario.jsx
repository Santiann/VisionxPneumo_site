import React from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Questionario = ({ auth }) => {
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Questionário de Sintomas</h2>}
>
    <Head title="Questionário de Sintomas" />

    

</AuthenticatedLayout>
  )
}

export default Questionario