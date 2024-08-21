import React from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const CadastroPerguntas = ({ auth }) => {
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Perguntas</h2>}
>
    <Head title="Cadastro de Perguntas" />

    

</AuthenticatedLayout>
  )
}

export default CadastroPerguntas