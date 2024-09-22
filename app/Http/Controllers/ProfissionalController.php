<?php

namespace App\Http\Controllers;

use App\Models\Profissional;
use Illuminate\Http\Request;

class ProfissionalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Profissional::create($request->all());

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
