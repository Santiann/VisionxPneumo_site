
import React, { useRef, useState } from 'react'

const Image = ({zoom, scr, constraste, brilho, invert}) => {

    const imageRef = useRef(null)

    const handleMouseMove = (e) => {
        if (zoom) {
            imageRef.current = e.target
            const rect = imageRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
            const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";

            imageRef.current.style.transform = "scale(2)";
            imageRef.current.style.transformOrigin = `${x} ${y}`;
        }
    };

    const handleMouseLeave = () => {
        if (zoom) {
            imageRef.current.style.transform = "scale(1)";
            imageRef.current.style.transformOrigin = "center center";
        }
    };

    return (
        <img
            src={scr}
            id='img_raiox'
            alt="Imagem de Raio-X"
            className={'min-h-ful xl:w-[950px] xl:h-[750px] p-2 w-auto object-cover rounded transition-transform duration-300 ease-in-out'}
            style={{
                filter:
                    `contrast(${constraste}%) 
                      brightness(${brilho}%) 
                      invert(${invert}%)`
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        />
    )
}

export default Image