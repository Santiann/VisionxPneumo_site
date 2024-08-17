import React from 'react'
import NavOption from './NavOption'
// dark:bg-gray-800 dark:border-gray-700"
import inicio from '../../img/inicio.png'
import pulmao from '../../img/pulmao.png'
import questionario from '../../img/questionario.png'
import suporte from '../../img/suporte.png'
import medico from '../../img/medico.png'
import perguntas from '../../img/perguntas.png'

const Sidebar = () => {
    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 h-screen w-52 pt-3 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 bg-zinc-900 border-b border-gray-600" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-zinc-900 border-b border-gray-600">
                <ul className="space-y-2 font-medium ">
                    <NavOption nome="Início" icon={inicio} size="text-lg" link={'inicio'}/>
                    <NavOption nome="Análise de Raio-X" icon={pulmao} size="text-base" link={'analise'} />
                    <NavOption nome="Questionário" icon={questionario} size="text-base" link={'questionario'} />
                    <NavOption nome="Suporte" icon={suporte} size="text-lg" link={'suporte'}/>
                    <NavOption nome="Profissionais de Saúde" icon={medico} size="text-sm" link={'profissionais'} />
                    <NavOption nome="Cadastro de Perguntas" icon={perguntas} size="text-sm" link={'cadastro_perguntas'}/>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar