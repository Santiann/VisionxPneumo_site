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
            'phone' => 'required|string|max:20',
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

            Profissional::create([
                'user_id' => $user->id,
            ]);

            return redirect()->route('profissionais.index')->with('success', 'Funcionário criado com sucesso.');
        } catch (\Exception $e) {
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

        try {
            $user = User::findOrFail($id);
            
            $data = $request->except('password');

            if ($request->filled('password')) {
                $data['password'] = bcrypt($request->password);
            }

            $user->update($data);

            return redirect()->route('profissionais.index')->with('success', 'Funcionário atualizado com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar funcionário: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return redirect()->route('profissionais.index')->with('success', 'Funcionário deletado com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao deletar funcionário: ' . $e->getMessage()]);
        }
    }

    public function verifica_medico()
    {
        if ($user = auth()->user()) {
            $isMedico = !Profissional::where('user_id', $user->id)->exists();
            return response()->json(['isMedico' => $isMedico]);
        }

        return response()->json(['isMedico' => false]);
    }
}
