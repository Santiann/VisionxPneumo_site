import React, {useState} from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ResultadoUpload from './ResultadoUpload';
import Upload from './Upload';

const Analise = ({ auth }) => { 

    const [isUploaded, setUploaded] = useState(false)
    const [image, setImage] = useState(null)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}
        >
            <Head title="Análise de Raio-X" />
        {isUploaded ?  <ResultadoUpload image={image} /> : <Upload setUploaded={setUploaded} setImage={setImage} />}

           

        </AuthenticatedLayout>
    )
}

export default Analise