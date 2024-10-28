import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const createPergunta = async (data) => {
  await axios.post('/pergunta', data, {
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  });
};

const updatePergunta = async (id, data) => {
  try {
    await axios.put(`/pergunta/${id}`, data, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
  }
};

const deletePergunta = async (id) => {
  try {
    await axios.delete(`/pergunta/${id}`, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    });
  } catch (error) {
    console.error("Erro ao deletar pergunta:", error);
  }

};

const fetchPerguntas = async () => {
  const response = await axios.get('/pergunta/list');
  return response.data.perguntas;
};

const CadastroPerguntas = ({ auth }) => {
  const [form, setForm] = useState({ title: '', size: '', order: '', description: '' });
  const [modalForm, setModalForm] = useState({ title: '', size: '', order: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perguntas, setPerguntas] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadPerguntas = async () => {
      const perguntasData = await fetchPerguntas();
      setPerguntas(perguntasData);
    };
    loadPerguntas();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value || '',
    });
  };

  const handleModalChange = (e) => {
    setModalForm({
      ...modalForm,
      [e.target.name]: e.target.value || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (isModalOpen) {
        if (modalForm.id) {
          await updatePergunta(modalForm.id, modalForm);
          setIsModalOpen(false);
        } else {
          alert('ID da pergunta não encontrado. Não é possível atualizar.');
        }
      } else {
        await createPergunta(form);
      }
      const updatedPerguntas = await fetchPerguntas();
      setPerguntas(updatedPerguntas);
      setForm({ title: '', size: '', order: '', description: '' });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Ocorreu um erro ao processar a sua requisição.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (pergunta) => {
    setModalForm(pergunta);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePergunta(id);
      const updatedPerguntas = await fetchPerguntas();
      setPerguntas(updatedPerguntas);
    } catch (error) {
      console.error('Erro ao tentar deletar:', error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Perguntas</h2>}
    >
      <Head title="Cadastro de Perguntas" />
      <h1 className='font-semibold text-3xl text-gray-800'>Cadastro de Perguntas</h1>
      <div className="py-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Tamanho"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              placeholder="Ordem"
              className="border p-2 sm:rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#212c36] text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Editar Pergunta</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title" className="text-sm font-semibold text-gray-700">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={modalForm.title}
                    onChange={handleModalChange}
                    placeholder="Título"
                    className="border p-2 sm:rounded w-full mb-4"
                    required
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
                </div>
                <label htmlFor="description" className="text-sm font-semibold text-gray-700">Descrição</label>
                <div>
                  <input
                    type="text"
                    name="description"
                    value={modalForm.description}
                    onChange={handleModalChange}
                    placeholder="Descrição"
                    className="border p-2 sm:rounded w-full mb-4"
                    required
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
                </div>
                <label htmlFor="size" className="text-sm font-semibold text-gray-700">Tamanho</label>
                <div>
                  <input
                    type="text"
                    name="size"
                    value={modalForm.size}
                    onChange={handleModalChange}
                    placeholder="Tamanho"
                    className="border p-2 sm:rounded w-full mb-4"
                    required
                  />
                  {errors.size && <p className="text-red-500 text-sm">{errors.size[0]}</p>}
                </div>
                <label htmlFor="order" className="text-sm font-semibold text-gray-700">Ordem</label>
                <div>
                  <input
                    type="number"
                    name="order"
                    value={modalForm.order}
                    onChange={handleModalChange}
                    placeholder="Obrigatório"
                    className="border p-2 sm:rounded w-full mb-4"
                    required
                  />
                  {errors.order && <p className="text-red-500 text-sm">{errors.order[0]}</p>}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#212c36] text-white px-4 py-2 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tamanho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ordem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {perguntas.map(pergunta => (
              <tr key={pergunta.id}>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.size}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(pergunta)}
                    className="bg-[#427297] text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pergunta.id)}
                    className="bg-[#f22c2c] text-white px-3 py-1 rounded"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default CadastroPerguntas;
