import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function PacienteForm() {
  const [formData, setFormData] = useState({
    nome: '',
    sexo: '',
    idade: '',
    telefone: '',
    cpf: '',
    dataNascimento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExport = (e) => {
    e.preventDefault();
    console.log('Dados exportados:', formData);
  };

  return (
    <div className="m-6 p-6 bg-gray-50 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Incluir dados do paciente?</h1>
      
      <form>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">Sexo</label>
          <select 
            id="sexo" 
            name="sexo" 
            value={formData.sexo} 
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="idade" className="block text-sm font-medium text-gray-700">Idade</label>
          <input 
            type="text" 
            id="idade" 
            name="idade" 
            maxLength="3"
            value={formData.idade} 
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
          <InputMask 
            type="tel" 
            mask="(99) 99999-9999"
            id="telefone" 
            name="telefone" 
            value={formData.telefone} 
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
          <InputMask 
            type="text" 
            mask="999.999.999-99"
            id="cpf" 
            name="cpf" 
            value={formData.cpf} 
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
          <input 
            type="date" 
            id="dataNascimento" 
            name="dataNascimento" 
            value={formData.dataNascimento} 
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="flex justify-center">
          <button 
            type="button" 
            onClick={handleExport} 
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Exportar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PacienteForm;
