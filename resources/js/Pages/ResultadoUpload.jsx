import React, { useRef, useState } from 'react'
import Range from '@/Components/Range';
import Image from '@/Components/Image';
import TipoImagem from '@/Components/TipoImagem';
import Modal from '@/Components/Utils/Modal';
import PacienteForm from '@/Components/PacienteForm';
import mapaCalor from '../../img/mapa_calor.png'

const ResultadoUpload = ({image, result, debug}) => {
    const [constraste, setContraste] = useState(100);
    const [brilho, setBrilho] = useState(100);
    const [invert, setInvert] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [modal, setModal] = useState(false)

    let mapaCalor;
    let imgAnalise;
    
    image = 'data:image/png;base64,' + image;
    
    if (debug) {
        mapaCalor = result.result_img_h;
        imgAnalise = result.result_img_identify;
    } else {
        mapaCalor = 'data:image/png;base64,' + result.result_img_h;
        imgAnalise = 'data:image/png;base64,' + result.result_img_identify;
    }
    
    const [scr, setScr] = useState(imgAnalise)

    const resultadoMensagem = result.classification_img  == 1 ? 'Pneumonia Detectada' : 'Pneumonia não Detectada';

    return (
        <div className='min-h-full w-100 flex flex-col bg-[#212c36] max-w-7xl m-auto xl:flex-row rounded border border-gray-500'>
            <div className=' flex flex-col xl:flex-[3] flex-1'>
                <div className='flex flex-row justify-between items-center'>
                    <h1 className='text-gray-100 p-6 font-semibold text-2xl'>{resultadoMensagem}</h1>
                    <button onClick={() => setModal(true)} className='bg-red-500 hover:bg-red-600 outline outline-2 outline-red-500 hover:outline-red-600 outline-offset-2 rounded-sm py-1 px-2 m-5 transition font-medium text-gray-100 text-center'>Exportar Resultados</button>
                </div>
                <div className={`h-full relative overflow-hidden ${zoom ? 'cursor-zoom-in' : ''}`} >
                    <Image scr={scr} zoom={zoom} constraste={constraste} brilho={brilho} invert={invert} />
                </div>
            </div>
            <div className='w-100 h-100 flex-1'>
                <div className='p-3 me-4'>
                    <h1 className='text-gray-100 font-medium text-xl p-2'>Filtros</h1>
                    <div className='h-1 bg-gray-500 w-full'></div>
                    <div className='p-5 flex justify-center'>
                        <button className={` rounded border-gray-400 border text-white p-2 ${zoom ? 'bg-primary' : 'bg-[#212c36]'} `} onClick={() => setZoom(!zoom)}>Zoom</button>
                    </div>
                    <div className='m-3'>
                        <Range name={'Contraste'} value={constraste} setValue={setContraste} max={200} />
                        <Range name={'Brilho'} value={brilho} setValue={setBrilho} max={200} />
                        <Range name={'Inversão de cores'} value={invert} setValue={setInvert} max={100} />
                    </div>
                    <h1 className='text-gray-100 font-medium text-xl p-2 mt-3'>Alterar Imagem</h1>
                    <div className='h-1 bg-gray-500 w-full'></div>
                    <div className='p-6 flex justify-center content-center xl:flex-col gap-2 flex-wrap'>
                        <TipoImagem tipo={image} scr={scr} setScr={setScr} nome={'Original'}/>
                        <TipoImagem tipo={mapaCalor} scr={scr} setScr={setScr} nome={'Mapa de Calor'}/>
                        <TipoImagem tipo={imgAnalise} scr={scr} setScr={setScr} nome={'Pontos de Análise'}/>              
                    </div>
                    <h1 className='text-gray-100 font-medium text-xl p-2'>Legendas</h1>
                    <div className='h-1 bg-gray-500 w-full'></div>
                    <div className='flex m-3 flex-col justify-center content-center gap-2'>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-zinc-900 self-center border-gray-400 border rounded-sm flex items-center justify-center'>
                                <div className=' w-6 h-6 rounded-full bg-[#4F4892] border border-yellow-200'></div>
                            </div>
                            <p className='text-gray-100 self-center'>Sinais de Pneumonia</p>
                        </div>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-blue-500 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Baixa Densidade</p>
                        </div>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-green-400 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Média Densidade</p>
                        </div>
                        <div className='flex content-center gap-2'>
                            <div className='w-8 h-8 bg-red-400 self-center border-gray-400 border rounded-sm '></div>
                            <p className='text-gray-100 self-center'>Alta Densidade</p>
                        </div>

                    </div>
                </div>
            </div>

            <Modal show={modal} onClose={() => setModal(false)}>
                <PacienteForm />
            </Modal>

        </div>
    )
}

export default ResultadoUpload