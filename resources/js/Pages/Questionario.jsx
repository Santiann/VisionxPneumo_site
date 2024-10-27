import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import AlertError from '@/Components/Utils/AlertError';

const Questionario = ({ auth, perguntas }) => {
  const [tooltipIndex, setTooltipIndex] = useState(null); // Altera para gerenciar o índice da pergunta com tooltip
  const [erro, setErro] = useState(false);

  const { data, setData, post, errors } = useForm({
    perguntasRespostas: {},
    observacoes: ''
  });

  const textFields = document.querySelectorAll('.text-field')

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
    try{
      post(route('questionario.store')); 
      setData('');
      textFields.forEach(textField => {
        textField.value = '';
      })
    } catch(error){
      setErro(error)
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Questionário de Sintomas</h2>}
    >
      <Head title="Questionário de Sintomas" />

      <section>
        <h2 className="text-corTitulo text-3xl font-semibold">Questionário de Sintomas</h2>
        <hr className="border-corTexto border-1"></hr>
      </section>

      {erro && <AlertError message={erro.message} />}

      <section >
        <form method="POST" onSubmit={handleSubmit}>
          <ol className="flex flex-wrap">

            {perguntas.map((item, index) => (
              <li key={item.id} className="flex flex-col mx-2 flex-grow mt-4" style={{ Width: calcularLarguraInput(item.titulo) }}>

                <label htmlFor={`pergunta-${item.id}`} className="text-corTexto text-wrap list-decimal list-outside font-semibold"
                  onMouseEnter={() => setTooltipIndex(index)}
                  onMouseLeave={() => setTooltipIndex(null)}
                >
                  {item.ordem}. {item.titulo}
                </label>

                <div className="relative">
                  {tooltipIndex === index && (
                    <div className="tooltip-box">
                      {item.descricao}
                    </div>
                  )}
                </div>

                <textarea
                  id={`pergunta-${item.id}`}
                  className="h-12 resize-none text-field"
                  onChange={(e) => handleInputChange(item.id, e.target.value)}></textarea>

              </li>

            ))}

          </ol>
          <div className="flex flex-col mt-8 text-corTexto mx-2">
            <label className="font-semibold">Observações</label>
            <textarea id="autoReSize"
              className="h-fit min-h-24 text-field text-black"
              onChange={(e) => setData('observacoes', e.target.value)}></textarea>
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="flex gap-2 mt-4 bg-gray-800 text-white font-medium py-4 px-4 rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300">
              Salvar Questionário<svg className="h-6 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            </button>
          </div>

        </form>
      </section>

      <style jsx>{`
        .tooltip-box {
          position: absolute; 
          top: 100%;
          left: 0;
          background-color: rgba(31, 41, 55, 0.9);
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