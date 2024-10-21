import React from 'react'
import NavOption from './NavOption'
import { useEffect, useState } from 'react';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-6">
        <path strokeLinecap="round" strokeWidth="1.8" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

const LungIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5">
            <path d="M18.244 22.263q-.439-7.433-3.523-7.698c-3.32-.284-8.41 5.144-9.92 12.772s-.764 13.092 1.211 13.46c1.975.37 4.844-1.78 6.205-1.78s6.079 1.04 6.079-.844V30.07m11.328-7.7q.422-7.538 3.53-7.805c3.32-.284 8.41 5.144 9.919 12.772s.764 13.092-1.21 13.46c-1.975.37-4.845-1.78-6.206-1.78c-1.36 0-6.079 1.04-6.079-.844V30.07" />
            <path d="M20.556 5v14.91q-.066 3.438-5.737 3.438M27.292 5v14.91q.065 3.438 5.736 3.438" />
            <path strokeLinejoin="round" d="M15 30.07q5.932 0 9-2.818q3.09 2.819 9.029 2.818" />
        </g>
    </svg>
);

const questionnaireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeWidth="1.5" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const supportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeWidth="1.6" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
);

const employeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeWidth="1.6" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
    </svg>
);

const questionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const Sidebar = () => {
    const [isMedico, setIsMedico] = useState(false);

    const checkIfMedico = async () => {
        try {
            const response = await fetch('/profissionais/verifica_medico');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.isMedico !== undefined) {
                setIsMedico(data.isMedico);
            } else {
                console.error("Dados inesperados:", data);
            }
        } catch (error) {
            console.error("Erro ao verificar se é médico:", error);
        }
    };


    useEffect(() => {
        checkIfMedico();
    }, []);

    return (
        <aside className="fixed top-14 transition-transform -translate-x-full sm:translate-x-0 left-0 z-40 h-screen w-52 pt-3 bg-[#212c36] border-r border-[#4da3d6] " aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto">
                <ul className="space-y-2 font-medium text-[#edf2f7]">
                    <NavOption nome="Início" icon={HomeIcon} size="text-base" link={'inicio.index'} />
                    <NavOption nome="Análise de Raio-X" icon={LungIcon} size="text-base" link={'analise.index'} />
                    <NavOption nome="Questionário" icon={questionnaireIcon} size="text-base" link={'questionario.index'} />
                    <NavOption nome="Suporte" icon={supportIcon} size="text-base" link={'suporte.index'} />
                    {isMedico && <NavOption nome="Funcionários" icon={employeeIcon} size="text-base" link={'profissionais.index'} />}
                    {isMedico && <NavOption nome="Perguntas" icon={questionIcon} size="text-base" link={'pergunta.index'} />}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar