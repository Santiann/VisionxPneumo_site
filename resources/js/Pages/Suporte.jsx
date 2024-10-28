import React, { useEffect, useState, useRef } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const FAQ = ({ perguntasFrequentes, visibleQuestion, toggleVisibility }) => (
  <div className='bg-white w-auto p-6 rounded m-6'>
    <h2 className='font-semibold text-xl text-gray-800'>FAQ. Perguntas Frequentes</h2>
    {perguntasFrequentes.map((item, index) => (
      <div key={index}>
        <h3 onClick={() => toggleVisibility(index)} className='cursor-pointer'>
          {item.title}
        </h3>
        {visibleQuestion === index && <p className='text-gray-600'>{item.description}</p>}
      </div>
    ))}
  </div>
);

const EmailForm = ({ handleEmailSubmit }) => (
  <div id="formEmailEl" className='bg-white lg:w-6/12 mb-4 rounded p-6 m-6'>
    <h3 className='font-semibold mb-4 text-xl text-gray-800'>Por e-mail</h3>
    <form onSubmit={handleEmailSubmit} className='flex flex-col gap-2 h-auto w-full'>
      <input className='sm:rounded' type='text' name='title' placeholder='Título' required />
      <textarea id='autoReSize1' className='sm:rounded min-h-36' name='message'
        placeholder='Detalhe seu problema, para que possamos te ajudar.' required></textarea>
      <button type='Submit' className='w-28 mt-4 bg-[#212c36] text-white px-4 py-2 rounded-md hover:bg-[#1a1f26] transition duration-200'>Enviar</button>
    </form>
  </div>
);

const WhatsAppForm = ({ handleWhatsAppSubmit }) => (
  <div id="formPhoneEl" className='bg-white lg:w-6/12 h-auto mb-4 rounded p-6 m-6'>
    <h2 className='font-semibold mb-4 text-xl text-gray-800'>Pelo WhatsApp</h2>
    <form onSubmit={handleWhatsAppSubmit} className='flex flex-col gap-2 h-auto w-full'>
      <input className='sm:rounded' type='text' name='whatsTitle' placeholder='Título da mensagem' required />
      <textarea
        id='autoReSize2'
        className='sm:rounded min-h-36'
        name='whatsMessage'
        placeholder='Detalhe seu problema, para que possamos te ajudar.'
        required
      ></textarea>
      <button type='Submit' className='w-28 mt-4 bg-[#212c36] text-white px-4 py-2 rounded-md hover:bg-[#1a1f26] transition duration-200'>
        Enviar
      </button>
    </form>
  </div>
);


const Suporte = ({ auth }) => {
  const [visibleQuestion, setQuestionToVisible] = useState(null);
  const [phone, setPhone] = useState(auth.user.phone);

  const perguntasFrequentes = [
    {
      title: 'Quem vai ter acesso aos dados dos meus pacietes?', description: 'Ninguem tera acesso aos dados usados, os mesmos serão excluidos do sistema após o encerramento da sua sessão.',
    },
    {
      title: 'O resultado do sistema é confiavel?', description: 'Atualmente a precisão do sistema é de 98%, melhorando a cada dia.',
    },
    {
      title: 'Como faço para baixar o relatório?', description: 'Você vai encontrar na página de analise da imagem um botão escrito gerar relatório, apenas clique nele',
    },
    {
      title: 'O palmeiras tem mundial?', description: 'Não sei dizer, mas vale o questionamento, desde que isso te mantenha longe dos cigarros!',
    }
  ];

  const toggleVisibility = (index) => {
    setQuestionToVisible(visibleQuestion === index ? null : index);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch('/suporte/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('E-mail enviado com sucesso!');
      } else {
        alert('Falha ao enviar e-mail.');
      }
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      alert('Erro ao enviar e-mail.');
    }
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const title = e.target.whatsTitle.value;
    const message = e.target.whatsMessage.value;

    const whatsappUrl = `https://wa.me/41995477764?text=${encodeURIComponent(title)}%0A${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suporte</h2>}>
      <Head title="Suporte" />
      <section className="w-full mx-auto flex flex-col bg-fundoAzulClaro rounded">
        <div className='ml-6 mt-6 flex selection: gap-4'>
          <h1 className='text-corTitulo text-3xl font-bold'>Fale com nossa equipe</h1>
        </div>
        <section className='lg:flex justify-between'>
          <EmailForm handleEmailSubmit={handleEmailSubmit} />
          <WhatsAppForm phone={phone} setPhone={setPhone} handleWhatsAppSubmit={handleWhatsAppSubmit} />
        </section>
        <FAQ perguntasFrequentes={perguntasFrequentes} visibleQuestion={visibleQuestion} toggleVisibility={toggleVisibility} />
      </section>
    </AuthenticatedLayout>
  );
};

export default Suporte;
