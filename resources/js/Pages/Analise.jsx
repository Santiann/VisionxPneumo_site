import React from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Analise = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}
        >
            <Head title="Análise de Raio-X" />

            <div className='grid grid-cols-12 h-full w-100 2xl:px-8 xl:px-2 bg-gray-500'>
                <div className=' w-100 h-100 col-span-10 flex flex-col'>
                    <div>
                        <h1 className='text-white p-6 text-xl'>Análise de Raio-X</h1>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='col-span-2'>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Analise