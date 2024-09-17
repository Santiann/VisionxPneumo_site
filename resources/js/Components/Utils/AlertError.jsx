import React from 'react'

const AlertError = ({ message }) => {
    return (
        <div className="bg-red-100 w-fit right-4 absolute border border-red-400 text-red-700 px-4 py-3 rounded " role="alert">
            <strong className="font-bold">Algo deu errado: </strong>
            <span className="block sm:inline">{message}</span>           
        </div>
    )
}

export default AlertError