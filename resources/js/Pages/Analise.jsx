import React, {useState, useEffect} from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ResultadoUpload from './ResultadoUpload';
import Upload from './Upload';

const Analise = ({ auth }) => { 

    const [isUploaded, setUploaded] = useState(false)
    const [image, setImage] = useState(null)
    const [imageBinary, setImageBinary] = useState(null);

    useEffect(() => {
        console.log('useEffect triggered');
        if (imageBinary) {
            fetch('http://localhost:8000/uploadImage', {
                method: 'POST',
                body: JSON.stringify( {
                    "adjust_image_quality": 1,
                    "img": imageBinary,
                }),
                headers:{ 'Content-Type': 'application/json'}
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Sucesso", data)
            })
            .catch((erro) => {
                console.log("Erro", erro)
            })
        }
    }, [imageBinary]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}
        >
            <Head title="Análise de Raio-X" />
        {isUploaded ?  <ResultadoUpload image={image} /> : <Upload setUploaded={setUploaded} setImage={setImage} setImageBinary={setImageBinary} />}

           

        </AuthenticatedLayout>
    )
}

export default Analise