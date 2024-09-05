import React from 'react'

const TipoImagem = ({tipo, scr, setScr, nome}) => {
    return (
        <button 
        className={`bg-zinc-900 py-2  w-40 text-gray-200 border-gray-400 border rounded-sm text-center hover:bg-zinc-800 
        ${scr == tipo ? 'bg-gray-300 text-zinc-900 font-semibold hover:bg-gray-200' : ''}`} 
        onClick={() => setScr(tipo)}>{nome}</button>
    )
}

export default TipoImagem