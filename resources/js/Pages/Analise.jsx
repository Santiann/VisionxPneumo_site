import React, {useState, useEffect} from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ResultadoUpload from './ResultadoUpload';
import Upload from './Upload';
import AlertError from '@/Components/Utils/AlertError';
import Loading from '@/Components/Utils/Loading';

const Analise = ({ auth }) => { 

    const [isUploaded, setUploaded] = useState(false)
    const [image, setImage] = useState(null)
    const [imageBinary, setImageBinary] = useState(null);
    const [result, setResult] = useState(null)
    const [erro, setErro] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (imageBinary) {
            setLoading(true);
            setErro(null);
            fetch('http://localhost:8000/uploadImage', {
                method: 'POST',
                body: JSON.stringify( {
                    "adjust_image_quality": 1,
                    "img": imageBinary,
                }),
                headers:{ 'Content-Type': 'application/json'}
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {throw new Error(err.error || 'Erro Desconhecido')})
                }
                return response.json()
            })
            .then((data) => {
                setResult(data)
                setUploaded(true)
            })
            .catch((erro) => {
                setErro(erro)     
                setLoading(false);    
            })
        }
    }, [imageBinary]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}>

         <Head title="Análise de Raio-X" />
        
        {erro ? <AlertError message={erro.message}/> : ''}
        
         {isUploaded ?  
         <ResultadoUpload image={image} result={result} /> : 
         <Upload setUploaded={setUploaded} setImage={setImage} setImageBinary={setImageBinary} />}

        {loading ?  <Loading /> : ''} 

        </AuthenticatedLayout>
    )
}

export default Analise