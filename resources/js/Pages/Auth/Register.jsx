import { useEffect } from 'react';
import GuestLayout from '@/Pages/GuestLayout';
import InputError from '@/Components/Utils/InputError';
import InputLabel from '@/Components/Utils/InputLabel';
import PrimaryButton from '@/Components/Utils/PrimaryButton';
import TextInput from '@/Components/Utils/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        enterprise: '',
        crm: '',
        phone: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // Função para validar o CRM após o usuário preencher o campo
    const validateCrm = async () => {
        const json = formataJson();

        if (json) {
            try {
                const response = await fetch('http://localhost:8080/verifyCrm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.status === 'sucesso' && result.dados.length > 0) {
                    console.log(result);

                    const medico = result.dados[0];
                    setData('name', medico.NM_MEDICO);
                } else {
                    console.log(result);
                    console.error('CRM não encontrado ou inválido.');
                }
            } catch (error) {
                console.error('Erro ao validar o CRM:', error);
            }
        }
    };

    function formataJson() {
        let estado = '';
        let crm = '';

        if (!data.crm.includes('-')) {
            return null;
        }

        const [crmParte, estadoParte] = data.crm.split('-');
        estado = estadoParte.trim();
        crm = crmParte.replace(/\D/g, '').trim();

        if (crm.length >= 4 && estado.length === 2) {
            console.log('CRM:', crm);
            console.log('Estado (UF):', estado);

            return JSON.stringify({
                medico: {
                    nome: '',
                    ufMedico: estado,
                    crmMedico: crm,
                    municipioMedico: '',
                    tipoInscricaoMedico: '',
                    situacaoMedico: 'A',
                    detalheSituacaoMedico: '',
                    especialidadeMedico: '',
                    areaAtuacaoMedico: ''
                },
                page: 1,
                pageSize: 10
            });
        }

        return null;
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="enterprise" value="Empresa" />

                    <TextInput
                        id="enterprise"
                        name="enterprise"
                        value={data.enterprise}
                        className="mt-1 block w-full"
                        autoComplete="enterprise"
                        isFocused={true}
                        onChange={(e) => setData('enterprise', e.target.value)}
                        required
                    />
                    <InputError message={errors.enterprise} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="crm" value="Crm" />
                    <TextInput
                        id="crm"
                        name="crm"
                        value={data.crm}
                        className="mt-1 block w-full"
                        autoComplete="crm"
                        isFocused={true}
                        onBlur={validateCrm}  // Valida o CRM ao sair do campo
                        onChange={(e) => setData('crm', e.target.value)}
                        maxLength={10}
                        required
                    />

                    <InputError message={errors.crm} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Telefone" />

                    <PhoneInput
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        autoComplete="tel"
                        country={'br'}
                        onChange={(phone) => setData('phone', phone)}  // Atualiza o estado do telefone
                        inputProps={{
                            required: true,
                            className: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                        }}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirme a senha" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Já possui cadastro?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
