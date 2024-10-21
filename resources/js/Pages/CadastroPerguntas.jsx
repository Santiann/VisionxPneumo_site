import React, { useState } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const createPergunta = async (data) => {
  await axios.post('/pergunta', data);
};

const updatePergunta = async (id, data) => {
  await axios.put(`/pergunta/${id}`, data);
};

const deletePergunta = async (id) => {
  await axios.delete(`/pergunta/${id}`);
};

const CadastroPerguntas = ({ auth }) => {
  const [form, setForm] = useState({
    title: '',
    size: '',
    required: '',
    description: '',
  });
  const [currentPergunta, setCurrentPergunta] = useState(null);
  const [perguntas, setPerguntas] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPergunta) {
      await updatePergunta(currentPergunta.id, form);
    } else {
      await createPergunta(form);
    }
    setForm({ title: '', size: '', required: '', description: '' });
    setCurrentPergunta(null);
  };

  const handleEdit = (pergunta) => {
    setForm(pergunta);
    setCurrentPergunta(pergunta);
  };

  const handleDelete = async (id) => {
    await deletePergunta(id);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Perguntas</h2>}
    >
      <Head title="Cadastro de Perguntas" />
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
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Tamanho"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="text"
              name="required"
              value={form.required}
              onChange={handleChange}
              placeholder="Obrigatório"
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
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#212c36] text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </form>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obrigatório</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {perguntas.map(pergunta => (
              <tr key={pergunta.id}>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.size}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pergunta.required}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(pergunta)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pergunta.id)}
                    className="text-red-500 hover:text-red-700"
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
}

export default CadastroPerguntas;
