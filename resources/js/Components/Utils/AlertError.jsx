import React, { useEffect, useState } from 'react'

const AlertError = ({ message }) => {

    const [showError, setShowError] = useState(true)

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowError(false);
        }, 3000)

        return () => clearTimeout(timer)
    }, [message])

    return (
        <>
            {showError && (
                <div id='alert-error' className="bg-red-100 w-fit right-4 top-16 absolute border border-red-400 text-red-700 px-4 py-3 rounded transition-opacity ease-out" role="alert">
                    <strong className="font-bold">Algo deu errado: </strong>
                    <span className="block sm:inline">{message}</span>
                </div>
            )}
        </>

    )
}

export default AlertError