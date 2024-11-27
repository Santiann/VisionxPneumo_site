import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Alert from '@/Components/Utils/Alert';

const Questionario = ({ auth, questionario, observacoes }) => {
  const { data, setData, post } = useForm({
    perguntasRespostas: {},
    observacoes: ''
  });

  const [erro, setErro] = useState(false);
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    const respostas = {};
    questionario.forEach((item) => {
      if (item.resposta) {
        respostas[item.id] = item.resposta;
      }
    });
    setData(prevData => ({
      ...prevData,
      perguntasRespostas: respostas
    }));
  }, [questionario]);
  
  useEffect(() => {
    if (observacoes) {
      setData(prevData => ({
        ...prevData,
        observacoes: observacoes
      }));
    }
  }, [observacoes]);

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
      setSucess(' Questionário salvo com sucesso!')
    } catch(error){
      setErro('Ocorreu um erro ao salvar o questionário ', error)
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Questionário de Sintomas</h2>}
    >
      <Head title="Questionário de Sintomas" />

      {erro && <Alert message={erro.message} type={'error'} />}
      {sucess && <Alert message={sucess} type={'sucess'} />}

      <section className="bg-fundoAzulClaro rounded flex justify-center px-6 py-6">
        <div className="w-full text-left">
          <h1 className="text-corTitulo text-3xl font-bold mb-6">Questionário de Sintomas</h1>
          <div className="bg-white rounded shadow-lg p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <ol className="flex flex-col gap-4">
                {questionario.map((item) => (
                  <li key={item.id} className="flex flex-col">
                    <label htmlFor={`pergunta-${item.id}`} className="text-gray-800 font-semibold">
                      {item.ordem} . {item.titulo}
                    </label>
                    <input
                      id={`pergunta-${item.id}`}
                      className="border rounded p-2 resize-none h-12 min-h-[48px] textField"
                      value={data.perguntasRespostas[item.id] || ""}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                    ></input>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col mt-6">
                <label className="font-semibold">Observações</label>
                <textarea
                  className="border rounded-md p-2 min-h-24 text-black resize-none textField"
                  value={data.observacoes || ''}
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
