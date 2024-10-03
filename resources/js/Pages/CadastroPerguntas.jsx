import React, { useState } from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const createProfissional = async (data) => {
  await axios.post('/profissionais', data);
};

const updateProfissional = async (id, data) => {
  await axios.put(`/profissionais/${id}`, data);
};

const deleteProfissional = async (id) => {
  await axios.delete(`/profissionais/${id}`);
};

const CadastroPerguntas = ({ auth, profissionais }) => {
  const [currentProfissional, setCurrentProfissional] = useState(null);
  const [form, setForm] = useState({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentProfissional) {
      await updateProfissional(currentProfissional.id, form);
    } else {
      await createProfissional(form);
    }
    setForm({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });
    setCurrentProfissional(null);
  };

  const handleEdit = (profissional) => {
    setForm(profissional);
    setCurrentProfissional(profissional);
  };

  const handleDelete = async (id) => {
    await deleteProfissional(id);
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
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Título"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Tamanho"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Obrigatório"
              className="border p-2 sm:rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
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
            {profissionais.map(profissional => (
              <tr key={profissional.id}>
                <td className="px-6 py-4 whitespace-nowrap">{profissional.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{profissional.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{profissional.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(profissional)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(profissional.id)}
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
  )
}

export default CadastroPerguntas