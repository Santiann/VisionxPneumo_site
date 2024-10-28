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

const EmailForm = ({ email, setEmail, handleEmailSubmit }) => (
  <div id="formEmailEl" className='bg-white lg:w-6/12 mb-4 rounded p-6 m-6'>
    <h3 className='font-semibold mb-4 text-xl text-gray-800'>Por email</h3>
    <form onSubmit={handleEmailSubmit} className='flex flex-col gap-2 h-auto w-full'>
      <input className='sm:rounded' type='email' name='email' value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
      <input className='sm:rounded' type='text' name='title' placeholder='Título' required />
      <textarea id='autoReSize1' className='sm:rounded min-h-24' name='message'
        placeholder='Detalhe seu problema, para que possamos te ajudar.' required></textarea>
      <button type='Submit' className='w-28 mt-4 bg-[#212c36] text-white px-4 py-2 rounded-md hover:bg-[#1a1f26] transition duration-200'>Enviar</button>
    </form>
  </div>
);

const WhatsAppForm = ({ handleWhatsAppSubmit, phone, setPhone }) => (
  <div id="formPhoneEl" className='bg-white lg:w-6/12 h-auto mb-4 rounded p-6 m-6'>
    <h2 className='font-semibold mb-4 text-xl text-gray-800'>Pelo WhatsApp</h2>
    <form onSubmit={handleWhatsAppSubmit} className='flex flex-col gap-2 h-auto w-full'>
      <input className='sm:rounded' type='tel' name='phone' value={phone}
        onChange={(e) => setPhone(e.target.value)} required />
      <textarea id='autoReSize2' className='sm:rounded min-h-36' name='whatsMessage'
        placeholder='Detalhe seu problema, para que possamos te ajudar.' required></textarea>
      <button type='Submit' className='w-28 mt-4 bg-[#212c36] text-white px-4 py-2 rounded-md hover:bg-[#1a1f26] transition duration-200'>Enviar</button>
    </form>
  </div>
);

const Suporte = ({ auth }) => {
  const [visibleQuestion, setQuestionToVisible] = useState(null);
  const [email, setEmail] = useState(auth.user.email);
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
      title: 'O palmeiras tem mundial?', description: 'Não sei dizer, más vale o questionamento, desde que isso te mantenha longe dos cigarros!',
    }
  ];

  const toggleVisibility = (index) => {
    setQuestionToVisible(visibleQuestion === index ? null : index);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const data = {
      SecureToken: "",
      To: "",
      From: email,
      Subject: e.target.title.value,
      Body: e.target.message.value
    };
    console.log(data);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/${phone}?text=tentando ver se consigo enviar uma msg`;
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
          <EmailForm email={email} setEmail={setEmail} handleEmailSubmit={handleEmailSubmit} />
          <WhatsAppForm phone={phone} setPhone={setPhone} handleWhatsAppSubmit={handleWhatsAppSubmit} />
        </section>
        <FAQ perguntasFrequentes={perguntasFrequentes} visibleQuestion={visibleQuestion} toggleVisibility={toggleVisibility} />
      </section>
    </AuthenticatedLayout>
  );
};

export default Suporte;
