import React, {useState, useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ResultadoUpload from './ResultadoUpload';
import Upload from './Upload';
import AlertError from '@/Components/Utils/AlertError';
import Loading from '@/Components/Utils/Loading';
import mapaCalor from '../../img/mapa_calor.png'
import imgAnalise from '../../img/img_analise.png'

const Analise = ({ auth }) => { 

    const debug = true;
    const url = 'http://localhost:8000';
    
    const resultDebug = {
        classification_img: true,
        result_img_h : mapaCalor,
        result_img_identify : imgAnalise
    }

    const [isUploaded, setUploaded] = useState(false)
    const [image, setImage] = useState(null)
    const [imageBinary, setImageBinary] = useState(null);
    const [result, setResult] = useState(null)
    const [erro, setErro] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const uploadImage = async () => {
            if (!imageBinary) return;
    
            setLoading(true);
            setErro(null);
    
            try {
                if (debug) {
                    console.log(resultDebug);
                    setResult(resultDebug);
                    cadastrarBancoTemp(resultDebug);
                    setUploaded(true);
                    return;
                }
    
                const response = await fetch('http://localhost:8000/uploadImage', {
                    method: 'POST',
                    body: JSON.stringify({
                        adjust_image_quality: 1,
                        img: imageBinary,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erro Desconhecido');
                }
    
                const data = await response.json();
                setResult(data);
                await cadastrarBancoTemp(data);
                setUploaded(true);
            } catch (error) {
                setErro(error);
            } finally {
                setLoading(false);
                setImageBinary(null);
            }
        };
    
        uploadImage();
    }, [imageBinary]);


     async function cadastrarBancoTemp(dados){
        const formData = new FormData();
        formData.append('image_original', imageBinary)
        formData.append('image_heat', dados.result_img_h)
        formData.append('image_analysis', dados.result_img_identify)
        formData.append('is_pneumonia', dados.classification_img ? 1 : 0);
        formData.append('accuracy', 'sem dados')
        try{

            const response = await fetch(`${url}/tempImg`, {
                method: 'POST',
                body: formData,
                headers: {                   
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error('Não foi possível guardar as informações');
            }           

        } catch(error){
            setErro(error);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}>

         <Head title="Análise de Raio-X" />
        
        {erro ? <AlertError message={erro.message}/> : ''}
        
         {isUploaded ?  
         <ResultadoUpload image={image} result={result} debug={debug}/> : 
         <Upload setUploaded={setUploaded} setImage={setImage} setImageBinary={setImageBinary} />}

        {loading ?  <Loading /> : ''} 

        </AuthenticatedLayout>
    )
}

export default Analise