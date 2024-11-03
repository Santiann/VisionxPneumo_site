import React, { useEffect, useState } from 'react'

const Alert = ({ message, type }) => {

    const [showMessage, setShowMessage] = useState(true)

    const types = {
        error: {
            bg: 'bg-red-100',
            border: 'border-red-400',
            text : 'text-red-700',
            name: 'erro',
            firstMessage: 'Algo deu errado:'
        },
        sucess: {
            bg: 'bg-green-100',
            border: 'border-green-400',
            text : 'text-green-700',
            name: 'sucess',
            firstMessage: 'Sucesso:'
        }
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 3000)

        return () => clearTimeout(timer)
    }, [message])

    const alertType = types[type] || types.error;

    return (
        <>
            {showMessage && (
                <div 
                    id={`alert-${type}`} 
                    className={`${alertType.bg} w-fit right-4 top-16 absolute ${alertType.border} ${alertType.text} px-4 py-3 rounded transition-opacity ease-out`} 
                    role="alert"
                >
                    <strong className="font-bold">{alertType.firstMessage}</strong>
                    <span className="block sm:inline">{message}</span>
                </div>
            )}
        </>

    )
}

export default Alert