<?php

namespace App\Http\Controllers;

use App\Models\Profissional;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class ProfissionalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email'       => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password'    => ['required', Rules\Password::defaults()],
        ]);

        try {
            $user = User::create([
                'name'        => $request->name,
                'phone'       => $request->phone,
                'email'       => $request->email,
                'password'    => Hash::make($request->password),
            ]);

            $profissional = Profissional::create([
                'user_id' => $user->id,
            ]);

            return redirect()->route('profissionais.index')->with('success', 'Funcionário criado com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar funcionário: ' . $e->getMessage()]);
        }

        return redirect()->route('profissionais.index');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'enterprise' => 'required',
            'name' => 'required',
            'crm' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'password' => 'nullable|min:6',
        ]);

        $profissional = Profissional::findOrFail($id);
        $profissional->update($request->all());

        return redirect()->route('profissionais.index');
    }

    public function destroy($id)
    {
        $profissional = Profissional::findOrFail($id);
        $profissional->delete();

        return redirect()->route('profissionais.index');
    }
}
