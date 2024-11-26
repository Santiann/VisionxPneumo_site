<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'enterprise' => 'required|string|max:255',
            'name'       => 'required|string|max:255',
            'crm'        => 'required|string|max:10',
            'phone'      => 'required|string|max:50',
            'email'      => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password'   => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'enterprise.required' => 'O campo empresa é obrigatório e não pode ser vazio.',
            'name.required' => 'Por favor, forneça seu nome completo.',
            'crm.required' => 'O CRM é obrigatório para o cadastro.',
            'phone.required' => 'O telefone de contato é necessário.',
            'email.required' => 'O email não pode ser deixado em branco.',
            'email.unique' => 'Este email já está registrado. Escolha outro.',
            'password.required' => 'A senha é obrigatória e deve ter no mínimo 8 caracteres.',
            'password.confirmed' => 'As senhas não coincidem. Tente novamente.'
        ]);

        $user = User::create([
            'enterprise'  => $request->enterprise,
            'name'        => $request->name,
            'crm'         => $request->crm,
            'phone'       => $request->phone,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
