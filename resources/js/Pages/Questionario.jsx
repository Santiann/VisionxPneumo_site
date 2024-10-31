import React, { useState } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import AlertError from '@/Components/Utils/AlertError';

const Questionario = ({ auth, perguntas }) => {
  const { data, setData, post } = useForm({
    perguntasRespostas: {},
    observacoes: ''
  });

  const [erro, setErro] = useState(false);
  const textFields = document.querySelectorAll('.textField');

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

      {erro && <AlertError message={erro.message} />}

      <section className="bg-fundoAzulClaro rounded flex justify-center px-6 py-6">
        <div className="w-full text-left">
          <h1 className="text-corTitulo text-3xl font-bold mb-6">Questionário de Sintomas</h1>
          <div className="bg-white rounded shadow-lg p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <ol className="flex flex-col gap-4">
                {perguntas.map((item) => (
                  <li key={item.id} className="flex flex-col">
                    <label htmlFor={`pergunta-${item.id}`} className="text-gray-800 font-semibold">
                      {item.order} . {item.title}
                    </label>
                    <input
                      id={`pergunta-${item.id}`}
                      className="border rounded p-2 resize-none h-12 min-h-[48px] textField"
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                    ></input>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col mt-6">
                <label className="font-semibold">Observações</label>
                <textarea
                  className="border rounded-md p-2 min-h-24 text-black resize-none textField"
                  onChange={(e) => setData('observacoes', e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-end mt-6">
                <button type="submit" className="bg-[#212c36] text-white px-4 py-2 rounded-md hover:bg-[#1a1f26] transition duration-200">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
};

export default Questionario;
