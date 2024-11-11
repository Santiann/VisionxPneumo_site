import React from 'react'
import Swal from 'sweetalert2';

const BotaoNovoPaciente = () => {
    const handleNovoPacienteClick = async () => {
        try {
            const response = await fetch('/tempImg', {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Os dados do paciente anterior foram removidos com sucesso.',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: '#4da3d6',
                }).then(() => {
                    window.location.href = '/analise';
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Falha ao apagar os dados temporários.',
                    icon: 'error',
                    confirmButtonText: 'Tentar novamente',
                    confirmButtonColor: '#d33',
                });
            }
        } catch (error) {
            console.error('Erro ao deletar dados temporários:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao processar sua solicitação.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <button
            onClick={handleNovoPacienteClick}
            className="w-full p-3 mt-4 mb-2 text-white bg-[#4da3d6] rounded-lg shadow-lg hover:bg-[#3a92c0] transition-colors duration-300 flex items-center justify-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Paciente
        </button>
    );
};

export default BotaoNovoPaciente;
