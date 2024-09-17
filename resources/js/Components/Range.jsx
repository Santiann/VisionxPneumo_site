import React, { useState } from 'react'

const Range = ({ name, value, setValue, max }) => {

   const calculoRange = Math.round((value / max) * 100)
    return (
        <>
            <label htmlFor={name} className="block mb-2 mt-3 text-sm font-medium text-gray-100 dark:text-white">{name}</label>
            <div className='flex justify-center content-center'>
                <input
                    id={name}
                    type="range"
                    min="0"
                    max={max}
                    value={value}
                    onChange={({ target }) => setValue(target.value)}
                    step="5"
                    className="w-full h-2 accent-primary bg-gray-200 rounded-lg appearance-none cursor-pointer  self-center"
                    style={{
                        background: `linear-gradient(to right, #51B6FF ${calculoRange}%, #ddd ${calculoRange}%)`,
                    }}
                />
                <span className='text-gray-100 ms-2 w-4'>{calculoRange}%</span>
            </div>
        </>
    )
}

export default Range