import React from 'react'
import NavOption from './NavOption'
// dark:bg-gray-800 dark:border-gray-700"
import inicio from '../../img/inicio.png'

const Sidebar = () => {
    return (
        <aside id="logo-sidebar" className=" h-screen w-52 pt-3 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 bg-zinc-900 border-b border-gray-600" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-zinc-900 border-b border-gray-600">
                <ul className="space-y-2 font-medium ">
                    <NavOption nome="Início" icon={inicio} />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar