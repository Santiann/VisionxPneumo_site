import React from 'react'

const TipoImagem = ({tipo, scr, setScr, nome}) => {
    return (
        <button 
        className={`py-2  w-40 text-gray-200 border-gray-400 border rounded-sm text-center 
        ${scr == tipo ? 'bg-gray-200 text-zinc-900 font-semibold hover:bg-gray-300' : 'bg-zinc-900 hover:bg-zinc-800 '}`} 
        onClick={() => setScr(tipo)}>{nome}</button>
    )
}

export default TipoImagem