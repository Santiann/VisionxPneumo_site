import React, { useState, useEffect } from 'react'
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

    const debug = false;
    const url = 'http://localhost:8000';

    const resultDebug = {
        classification_img: true,
        result_img_h: mapaCalor,
        result_img_identify: imgAnalise
    }

    const [isUploaded, setUploaded] = useState(false)
    const [image, setImage] = useState(null)
    const [imageBinary, setImageBinary] = useState(null);
    const [result, setResult] = useState(null)
    const [erro, setErro] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingTempData, setLoadingTempData] = useState(true);
    
    useEffect(() => {
        const fetchTempData = async () => {
            setLoadingTempData(true);
            try {
                const response = await fetch(`${url}/tempImg`);
                if (response.ok) {
                    const data = await response.json();
                    const resultTemp = {
                        classification_img: data.data.is_pneumonia,
                        result_img_h: data.data.image_heat,
                        result_img_identify: data.data.image_analysis,
                    }
                    setResult(resultTemp);
                    setImage(data.data.image_original);
                    setUploaded(true);
                }
            } catch (error) {
                setErro('Erro ao buscar dados do banco temporário');
                setUploaded(false);
            } finally {
                setLoadingTempData(false); 
            }
        }

        fetchTempData();
    }, []);

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
                setImage(imageBinary);
                setImageBinary(null);
            }
        };

        uploadImage();
    }, [imageBinary]);


    async function cadastrarBancoTemp(dados) {
        const acuraciaArredondada = Math.round(dados.acuracia * 100) / 100;
        const formData = new FormData();
        formData.append('image_original', imageBinary)
        formData.append('image_heat', dados.result_img_h)
        formData.append('image_analysis', dados.result_img_identify)
        formData.append('is_pneumonia', dados.classification_img ? 1 : 0);
        formData.append('accuracy', acuraciaArredondada);
        formData.append('lobo_superior_direito', dados.lobos.lobo_ds ?? 0);
        formData.append('lobo_medio_direito', dados.lobos.lobo_dm ?? 0);
        formData.append('lobo_inferior_direito', dados.lobos.lobo_di ?? 0);
        formData.append('lobo_superior_esquerdo', dados.lobos.lobo_es ?? 0);
        formData.append('lobo_inferior_esquerdo', dados.lobos.lobo_ei ?? 0);
        try {

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
                throw new Error('Não foi possível guardar as informações temporariamente.');
            }

        } catch (error) {
            setErro(error);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Análise de Raio-X</h2>}>

            <Head title="Análise de Raio-X" />

            {erro && <AlertError message={erro.message} />}

            {loadingTempData ? (
               ''
            ) : isUploaded ? (
                <ResultadoUpload image={image} result={result} debug={debug} />
            ) : (
                <Upload setUploaded={setUploaded} setImage={setImage} setImageBinary={setImageBinary} />
            )}

            {loading && <Loading />}

        </AuthenticatedLayout>
    )
}

export default Analise