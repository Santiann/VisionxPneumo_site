<?php

namespace App\Http\Controllers;

use App\Models\Profissional;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class ProfissionalController extends Controller
{
    public function index()
    {
        // Buscando os profissionais com a relação ao usuário
        $profissionais = User::join('profissionais', 'users.id', '=', 'profissionais.user_id')
            ->select('users.id', 'users.name', 'users.phone', 'users.email')
            ->get();

        // Renderiza a página com os dados dos profissionais
        return Inertia::render('Profissionais', [
            'profissionais' => $profissionais,
        ]);
    }

    public function list()
    {
        $profissionais = User::join('profissionais', 'users.id', '=', 'profissionais.user_id')
            ->select('users.id', 'users.name', 'users.phone', 'users.email')
            ->get();
        
        return response()->json(['profissionais' => $profissionais]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20', // Adicionando verificação única de telefone
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        try {
            // Criar o usuário
            $user = User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Criar o profissional associado ao usuário
            Profissional::create([
                'user_id' => $user->id,
                // Adicionar outros campos do profissional, se houver
            ]);

            return redirect()->route('profissionais.index')->with('success', 'Funcionário criado com sucesso.');
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Erro ao criar funcionário: ' . $e->getMessage()]);
        }
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->all());

        return redirect()->route('profissionais.index');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('profissionais.index');
    }
}
