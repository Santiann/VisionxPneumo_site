import React, { useEffect ,useState } from 'react'
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


const Suporte = ({ auth }) => {

  const [visibleQuestion, setQuestionToVisible] = useState(null);
  const [email, setEmail] = useState(auth.user.email);
  const perguntasFrequentes = [
    {
      title: 'Quem vai ter acesso aos dados dos meus pacietes?',
      description: 'Ninguem tera acesso aos dados usados, os mesmos serão excluidos do sistema após o encerramento da sua sessão.',
    },
    {
      title: 'O resultado do sistema é confiavel?',
      description: 'Atualmente a precisão do sistema é de 98%, melhorando a cada dia.',
    },
    {
      title: 'Como faço para baixar o relatório?',
      description: 'Você vai encontrar na página de analise da imagem um botão escrito gerar relatório, apenas clique nele',
    },
    {
      title: 'O palmeiras tem mundial?',
      description: 'Não sei dizer, más vale o questionamento, desde que isso te mantenha longe dos cigarros!',
    }
  ];

  let turn = 0;

  const toggleVisibility = (index) => {
    if (visibleQuestion === index) setQuestionToVisible(null);
    else setQuestionToVisible(index); 
  }


  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const teste = {
      SecureToken : "",
      To : "",
      From : `${email}`,
      Subject : `${e.target.title.value}`,
      Body : `${e.target.message.value}`
    };
    console.log(teste);
  }

  const handleWhatssapSubmit = (e) => {
    const whatsappNumber = e.target.phone.value;
    const message = "tentando ver se consigo enviar uma msg";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank'); // Abre o link em uma nova aba
  }

  useEffect(() => {
    const formEmail = function() {
      console.log(turn);
      document.getElementById('formEmailEl').classList.replace('lg:w-4/12', 'lg:w-8/12');
      document.getElementById('formPhoneEl').classList.replace('lg:w-8/12', 'lg:w-4/12');
      document.getElementById('formEmailEl').classList.remove('flex-shrink-1');
      document.getElementById('formPhoneEl').classList.add('flex-shrink-1');
      turn = Math.abs(turn-1);
    }

    const formPhone = function() {
      console.log(turn);
      document.getElementById('formEmailEl').classList.replace('lg:w-8/12', 'lg:w-4/12');
      document.getElementById('formPhoneEl').classList.replace('lg:w-4/12', 'lg:w-8/12');
      document.getElementById('formPhoneEl').classList.remove('flex-shrink-1');
      document.getElementById('formEmailEl').classList.add('flex-shrink-1');
      turn = Math.abs(turn-1);
      
    }

    document.getElementById('phoneIcon').addEventListener('click', formPhone);
    document.getElementById('formPhoneEl').addEventListener('click', formPhone);
    
    document.getElementById('emailIcon').addEventListener('click', formEmail);
    document.getElementById('formEmailEl').addEventListener('click', formEmail);

    const txArea = document.getElementById('autoReSize1');
    if (txArea) {
      txArea.style.height = 'auto';
      txArea.style.height = `${txArea.scrollHeight}px`; // Ajusta a altura  do textarea conforme conteúdo

      txArea.addEventListener('input', () => {
        txArea.style.height = 'auto';
        txArea.style.height = `${txArea.scrollHeight}px`;
      });
    }


    return () => {
      if (phoneIcon) {
        phoneIcon.removeEventListener('click', formPhone);
      }
      if (emailIcon) {
        emailIcon.removeEventListener('click', formEmail);
      }
    };

    
  }, []); // O array vazio [] garante que isso seja executado apenas quando o componente for montado
    
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suporte</h2>}
>
    <Head title="Suporte" />
    

    <section className="w-full mx-auto flex flex-col bg-fundoAzulClaro sm:rounded">
      {/*Entre em contato*/}

      <div className='ml-6 mt-6 flex selection: gap-4'>
        <h2 className='font-semibold text-xl text-gray-800'>Fale com nossa equipe</h2>
        <svg id='phoneIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-6 cursor-pointer'><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        <svg id='emailIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6 cursor-pointer'><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg>
        
      </div>

      {/*EMAIL */}
      <section className='lg:flex justify-between'>
        <div id="formEmailEl" className='bg-white lg:w-8/12 mb-16 rounded-2xl p-6 m-6'>
          <h3 className='font-semibold text-xl text-gray-800'>Por email</h3>
          <form onSubmit={handleEmailSubmit} action='' method='POST' className='flex flex-col gap-2 h-auto w-full'>
            <input className=' sm:rounded' 
            type='email' 
            name='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email'
            required></input>

            <input className=' sm:rounded' 
            type='text' 
            name='title' 
            placeholder='Titulo' 
            required></input>

            <textarea id='autoReSize1' className='sm:rounded min-h-24' 
            name='message' 
            placeholder='Detalhe seu problema, para que possamos te ajudar.' 
            required></textarea>

            <button type='Submit' 
            className='w-28 text-center cursor-pointer mt-4 bg-gray-800 text-white font-medium py-2 px-4 rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300'
            >Submit </button>
          </form>
        </div>

        {/*WHATSSAP */}
        <div  id="formPhoneEl" className='bg-white lg:w-4/12 h-auto mb-16 rounded-3xl p-6 m-6'>
          <h2 className='font-semibold text-xl text-gray-800'>Pelo Whatssap</h2>
          <form onSubmit={handleWhatssapSubmit} action='' method='POST' className='flex flex-col gap-2 h-auto w-full'>
            <input className=' sm:rounded' 
            type='tel' 
            name='phone' 
            value='5545985053873'
            required></input>

            <textarea id='autoReSize2' className='sm:rounded min-h-36' 
            name='whattsMessage' 
            placeholder='Detalhe seu problema, para que possamos te ajudar.' 
            required></textarea>

            <button type='Submit' 
            className='w-28 text-center cursor-pointer mt-4 bg-gray-800 text-white font-medium py-2 px-4 rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300'
            >Submit </button>
          </form>
        </div>
      </section>
      
      {/*FAQ: perguntas frequentes*/}
      <div className='bg-white w-auto p-6 rounded-3xl m-6'>
        <h2 className='font-semibold text-xl text-gray-800'>FAQ. Perguntas Frequentes</h2>
        {perguntasFrequentes.map((pergunta, index) => (
            <div key={index} className='py-4 bg-white my-2 sm:rounded'>

              <div className='flex mx-2'>
                <div className='mr-5'>
                  <svg id='plusSign' onClick={() => toggleVisibility(index)} className={`w-6 cursor-pointer ${visibleQuestion === index ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                  <svg id='minusSign' onClick={() => toggleVisibility(index)} className={`w-6 cursor-pointer ${visibleQuestion !== index ? 'hidden' : ''}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                </div>
                <h3 className='text-gray-800'>{pergunta.title}</h3>
              </div>

              {visibleQuestion === index && (
                <p className='ml-14 text-gray-600'>{pergunta.description}</p>
              )}
              
            </div>
        ))}
      </div>

    </section>
</AuthenticatedLayout>
  )
}

export default Suporte