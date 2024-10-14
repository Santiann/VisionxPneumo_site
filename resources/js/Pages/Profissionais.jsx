import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const createProfissional = async (data) => {
    await axios.post('/profissionais', data);
};

const updateProfissional = async (id, data) => {
    await axios.put(`/profissionais/${id}`, data);
};

const deleteProfissional = async (id) => {
    try {
      await axios.delete(`/profissionais/${id}`);
      console.log(`Profissional com id ${id} deletado com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar profissional:", error);
    }
  };
  

const fetchProfissionais = async () => {
    const response = await axios.get('/profissionais/list');
    return response.data.profissionais;
};

const Profissionais = ({ auth }) => {
    const [form, setForm] = useState({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });
    const [modalForm, setModalForm] = useState({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profissionais, setProfissionais] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadProfissionais = async () => {
            const profissionaisData = await fetchProfissionais();
            setProfissionais(profissionaisData);
        };
        loadProfissionais();
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

    const handlePhoneChange = (value) => {
        setForm({
            ...form,
            phone: value || '',
        });
    };

    const handleModalPhoneChange = (value) => {
        setModalForm({
            ...modalForm,
            phone: value || '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Limpa os erros antes de submeter

        try {
            if (isModalOpen) {
                await updateProfissional(modalForm.id, modalForm);
                setIsModalOpen(false);
            } else {
                await createProfissional(form);
            }
            const updatedProfissionais = await fetchProfissionais(); // Atualiza a lista de profissionais
            setProfissionais(updatedProfissionais);
            setForm({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert('Ocorreu um erro ao processar a sua requisição.');
            }
        }
    };

    const handleEdit = (profissional) => {
        setModalForm(profissional);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        console.log(`Tentando deletar profissional com id: ${id}`);
        try {
            await deleteProfissional(id);
            const updatedProfissionais = await fetchProfissionais(); // Atualiza a lista de profissionais
            setProfissionais(updatedProfissionais);
            setForm({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });
        } catch (error) {
            console.error('Erro ao tentar deletar:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profissionais de Saúde</h2>}
        >
            <Head title="Profissionais de Saúde" />

            <div className="py-6">
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="border p-2 sm:rounded w-full"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                        </div>
                        <div>
                            <PhoneInput
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handlePhoneChange}
                                placeholder="Telefone"
                                country={'br'}
                                inputProps={{
                                    required: true,
                                    className: "border sm:rounded block w-full"
                                }}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border p-2 sm:rounded w-full"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Senha"
                                className="border p-2 sm:rounded w-full"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
                        </div>
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
                            <h2 className="text-xl font-bold mb-4">Editar Profissional</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={modalForm.name}
                                        onChange={handleModalChange}
                                        placeholder="Nome"
                                        className="border p-2 sm:rounded w-full mb-4"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                                </div>
                                <div>
                                    <PhoneInput
                                        type="tel"
                                        name="phone"
                                        value={modalForm.phone}
                                        onChange={handleModalPhoneChange}
                                        placeholder="Telefone"
                                        country={'br'}
                                        inputProps={{
                                            required: true,
                                            className: 'border sm:rounded block w-full',
                                        }}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={modalForm.email}
                                        onChange={handleModalChange}
                                        placeholder="Email"
                                        className="border p-2 sm:rounded w-full mt-4 mb-4"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={modalForm.password}
                                        onChange={handleModalChange}
                                        placeholder="Senha"
                                        className="border p-2 sm:rounded w-full mb-4"
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
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
                                Nome
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Telefone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {profissionais.map((profissional) => (
                            <tr key={profissional.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{profissional.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{profissional.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{profissional.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(profissional)}
                                        className="bg-[#427297] text-white px-3 py-1 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(profissional.id)}
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

export default Profissionais;