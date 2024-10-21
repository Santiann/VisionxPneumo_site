import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Inicio({ auth }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);

    const sections = [
        {
            title: 'Upload de Imagens',
            description: 'Envie as radiografias de tórax para análise com nosso sistema de IA.',
            buttonText: 'Enviar Imagem',
            action: () => { window.location.href = '/analise'; },
        },
        {
            title: 'Análise de Imagens',
            description: 'Veja o diagnóstico detalhado fornecido pela Inteligência Artificial.',
            buttonText: 'Consultar Análise',
            action: () => { window.location.href = '/analise'; },
        },
        {
            title: 'Suporte ao Usuário',
            description: 'Entre em contato com nossa equipe para suporte técnico e dúvidas sobre o sistema.',
            buttonText: 'Contatar Suporte',
            action: () => { window.location.href = '/suporte'; },
        },
        {
            title: 'Preencha o Questionário',
            description: 'Contribua para um diagnóstico mais completo preenchendo o questionário elaborado por você.',
            buttonText: 'Preencher Questionário',
            action: () => { window.location.href = '/questionario'; },
        },
        {
            title: 'Exportar Informações',
            description: 'Exporte diagnósticos e relatórios para PDF para consulta e arquivamento.',
            buttonText: 'Exportar para PDF',
            action: () => { window.location.href = '/pdf'; },
        }
    ];

    const totalSlides = sections.length;

    const nextSlide = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
            setFade(true);
        }, 150);
    };

    const prevSlide = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
            setFade(true);
        }, 300);
    };

    const visibleSlides = sections.slice(currentSlide, currentSlide + 3).concat(
        sections.slice(0, Math.max(0, (currentSlide + 3) - totalSlides))
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bem-vindo(a), {auth.user.name}</h2>}
        >
            <Head title="Inicio" />
            <div className="bg-white shadow sm:rounded-lg p-6">

                <div className="mb-8 text-center text-justify">
                    <p className="text-gray-600 text-base ">
                        O <strong>VisionXPneumo</strong> é uma ferramenta assistida por Inteligência Artificial projetada para auxiliar médicos no diagnóstico de pneumonia. Nosso sistema otimiza o processo clínico, permitindo o envio de radiografias e oferecendo diagnósticos precisos e rápidos.
                    </p>
                </div>

                <div className="relative">
                    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        {visibleSlides.map((section, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
                            >
                                <h3 className="font-semibold text-xl text-gray-800">{section.title}</h3>
                                <p className="text-gray-600 mt-3">{section.description}</p>
                                <button
                                    className="mt-4 bg-gray-800 text-white font-medium py-2 px-4 rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300"
                                    onClick={section.action}
                                >
                                    {section.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button onClick={prevSlide} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            <i className="fas fa-chevron-left"></i> Anterior
                        </button>

                        <div className="flex space-x-2">
                            {visibleSlides.map((_, i) => (
                                <span key={i} className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-gray-800' : 'bg-gray-400'}`}></span>
                            ))}
                        </div>

                        <button onClick={nextSlide} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            Próximo <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
