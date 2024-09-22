import React from 'react';
import { Link } from '@inertiajs/react';
import Logo from '@/Components/Logo';

const Welcome = () => {
    return (
        <div className="bg-white min-h-screen flex">
            <nav className="w-full flex justify-between items-center py-4 px-8 fixed top-0 z-10">
                <div>
                    <Link href="/">
                        <Logo className="text-[#0A2850] text-4xl font-bold mb-6" />
                    </Link>
                </div>
            </nav>
            <div className="w-1/2 bg-[#d9e2ec] p-10 flex flex-col justify-center items-center">
                <div className="w-10/12 text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tecnologia de ponta para diagnósticos</h1>
                    
                    <p className="text-lg text-gray-600 mb-8">
                        Usamos técnicas avançadas de visão computacional para analisar imagens de raio-X e fornecer suporte
                        aos profissionais de saúde no diagnóstico precoce de pneumonia.
                    </p>

                    <p className="text-lg text-gray-600">
                        Estamos prontos para auxiliar você no diagnóstico de pneumonia usando nossa tecnologia avançada de visão computacional.
                    </p>

                </div>
            </div>


            <div className="w-1/2 bg-white p-10 flex flex-col justify-center items-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Seja bem-vindo</h2>

                <p className="w-9/12 text-lg text-gray-600 mb-8 text-center">
                    Se você já possui uma conta, faça o login. Caso contrário, registre-se agora para começar a usar nossos recursos.
                </p>

                <div className="flex space-x-4">
                    <Link
                        href="/login"
                        className="px-6 py-3 text-lg font-medium text-white bg-[#0A2850] rounded-lg hover:bg-[#5176a1] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                        Entrar
                    </Link>
                    <Link
                        href="/register"
                        className="px-6 py-3 text-lg font-medium text-white bg-[#0A2850] rounded-lg hover:bg-[#5176a1] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Registrar-se
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Welcome;
