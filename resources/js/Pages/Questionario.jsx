import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const Questionario = ({ auth, perguntas }) => {
  const [tooltipIndex, setTooltipIndex] = useState(null); // Altera para gerenciar o índice da pergunta com tooltip
  
  const { data, setData, post, errors } = useForm({
    perguntasRespostas: {},
    observacoes: ''
  });

  const calcularLarguraInput = (pergunta) => {
    return `${pergunta.length}ch`; 
  };

   useEffect(() => {
    const txArea = document.getElementById('autoReSize');
    if (txArea) {
      txArea.style.height = 'auto';
      txArea.style.height = `${txArea.scrollHeight}px`; // Ajusta a altura  do textarea conforme conteúdo

      txArea.addEventListener('input', () => {
        txArea.style.height = 'auto';
        txArea.style.height = `${txArea.scrollHeight}px`;
      });
    }
  }, []);

  const handleInputChange = (id, value) => {
    setData('perguntasRespostas', {
      ...data.perguntasRespostas,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('questionario.store'));
  };



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Questionário de Sintomas</h2>}
    >
      <Head title="Questionário de Sintomas" />

    

</AuthenticatedLayout>
  )
}

export default Questionario;