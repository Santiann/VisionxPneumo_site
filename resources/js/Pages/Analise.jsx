import React from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import raiox from '../../img/raiox.jpeg'

const Analise = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}
        >
            <Head title="Análise de Raio-X" />

            <div className='h-full w-100 flex flex-col bg-zinc-800 max-w-7xl m-auto xl:flex-row rounded border border-gray-500'>
                <div className='h-full flex flex-col xl:flex-[3] flex-1'>
                    <div>
                        <h1 className='text-gray-100 p-6 font-semibold text-2xl'>Sinais de Pneumonia Encontrados</h1>
                    </div>
                    <img src={raiox} className='h-full w-auto object-cover rounded' alt="" />
                </div>
                <div className='w-100 h-100 flex-1'>
                        <div className='p-6'>
                            <h1 className='text-gray-100 font-medium text-xl p-2'>Filtros</h1>
                            <div className='h-1 bg-gray-500 w-full'></div>
                            <div className='p-6 flex justify-center'>
                                <button className='bg-zinc-900 rounded border-gray-400 border text-white p-2'>Zoom</button>
                            </div>
                        </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Analise