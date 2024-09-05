import React, { useState, useCallback  } from 'react'
import { useDropzone } from 'react-dropzone';

const Upload = ({setUploaded, setImage, setImageBinary}) => {

    const processFile = (file) => {
        const reader = new FileReader();
        
        reader.onloadend = () => {
            const binaryStr = reader.result.split(',')[1];
            setImageBinary(binaryStr)
        };
          
        reader.readAsDataURL(file);  
        setImage(URL.createObjectURL(file))
        setUploaded(true)
    }

    const uploadImagem = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        processFile(file);
    }

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        processFile(file);
      }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop 
      });

    return (
        <div {...getRootProps()} className="flex items-center justify-center w-full max-w-7xl m-auto ">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="#51B6FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold text-base">Clique ou arraste para fazer o upload da imagem de Raio-X</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG(MAX. 800x400px)</p>
                </div>
                <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" onChange={uploadImagem} />
            </label>
        </div>
    )
}

export default Upload