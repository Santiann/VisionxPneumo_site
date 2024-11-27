import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Logo from '@/Components/Logo';

const Welcome = () => {
    return (
        <>
            <Head title="Welcome" />

            <div className="bg-white min-h-screen flex flex-col lg:flex-row">
                <nav className="w-full flex justify-between items-center py-4 px-6 lg:px-8 fixed top-0 z-10">
                    <div>
                        <Link href="/">
                            <Logo className="text-[#0A2850] text-3xl lg:text-4xl font-bold" />
                        </Link>
                    </div>
                </nav>

                <div className="lg:w-1/2 bg-[#d9e2ec] p-6 lg:p-10 flex flex-col justify-center items-center mt-20 lg:mt-0">
                    <div className="w-full lg:w-10/12 text-left">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            Tecnologia de ponta para diagnósticos
                        </h1>

                        <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8">
                            Usamos técnicas avançadas de visão computacional para analisar imagens de raio-X e fornecer
                            suporte aos profissionais de saúde no diagnóstico precoce de pneumonia.
                        </p>

                        <p className="text-base lg:text-lg text-gray-600">
                            Estamos prontos para auxiliar você no diagnóstico de pneumonia usando nossa tecnologia avançada
                            de visão computacional.
                        </p>
                    </div>
                </div>

                <div className="lg:w-1/2 bg-white p-6 lg:p-10 flex flex-col justify-center items-center mt-10 lg:mt-0">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-6">Seja bem-vindo</h2>

                    <p className="w-full lg:w-9/12 text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 text-center">
                        Se você já possui uma conta, faça o login. Caso contrário, registre-se agora para começar a usar
                        nossos recursos.
                    </p>

                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full justify-center">
                        <Link
                            href="/login"
                            className="w-full lg:w-auto px-6 py-3 text-base lg:text-lg font-medium text-white bg-[#0A2850] rounded-lg hover:bg-[#5176a1] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-center"
                        >
                            Entrar
                        </Link>
                        <Link
                            href="/register"
                            className="w-full lg:w-auto px-6 py-3 text-base lg:text-lg font-medium text-white bg-[#0A2850] rounded-lg hover:bg-[#5176a1] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-center"
                        >
                            Registrar-se
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
