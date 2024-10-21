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
      user={user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Questionário de Sintomas</h2>}
    >
      <Head title="Questionário de Sintomas" />

      <section>
        <h2 class="text-corTitulo text-3xl font-semibold">Questionário de Sintomas</h2>
        <hr class="border-corTexto border-1"></hr>
      </section>
      

      <section >
      <form method="POST" action="/questionario">
          <ol class="flex flex-wrap">
            
            {perguntas.map((item, index) => (
              <li key={item.id} class="flex flex-col mx-2 flex-grow mt-4" style={{Width: calcularLarguraInput(item.titulo)}}>
                
                  <label htmlFor={`pergunta-${item.id}`} class="text-corTexto text-wrap list-decimal list-outside font-semibold"
                  onMouseEnter={() => setTooltipIndex(index)}
                  onMouseLeave={() => setTooltipIndex(null)}
                  > 
                  {item.ordem}. {item.titulo} 
                  </label>

                  <div class="relative">
                    {/* Exibe a tooltip como uma caixa de texto */}
                  {tooltipIndex === index && (
                    <div className="tooltip-box">
                      {item.descricao}
                    </div>
                    )}
                  </div>
                  
                  
                  <textarea 
                  id={`pergunta-${item.id}`} 
                  class="h-12 resize-none"
                  onChange={(e) => handleInputChange(item.id, e.target.value)}></textarea>

              </li>
              
            ))}

          </ol>
          <div class="flex flex-col mt-8 text-corTexto mx-2">
            <label class="font-semibold">Observações</label>
            <textarea id="autoReSize" 
            class="h-fit min-h-24 text-black"
            onChange={(e) => setData('observacoes', e.target.value)}></textarea>
          </div>

          <div class="flex items-center justify-center">
            <button type="submit" class="bg-corBotao px-6 py-3 mt-8 flex text-lg text-white rounded-xl">
            
            <svg class="h-6 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
              Salvar Questionário
            </button>
          </div>
          
        </form>
      </section>

      
      <style jsx>{`
        .tooltip-box {
          position: absolute; 
          top: 100%;
          left: 0;
          background-color: rgba(33, 44, 54, 0.9);
          color: white;
          padding: 8px;
          border-radius: 4px;
          margin-top: 4px;
          z-index: 1000;
          width: auto;
          min-width: 150px;
          max-width: 300px;
        }
      `}</style>
      
    </AuthenticatedLayout>
  );
};

export default Questionario;