<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pergunta;

class PerguntaController extends Controller
{

    public function index()
    {
        $perguntas = Pergunta::all();

        return Inertia::render('CadastroPerguntas', [
            'profissionais' => $perguntas,
        ]);
    }

    public function list()
    {
        $perguntas = Pergunta::all();

        return response()->json(['perguntas' => $perguntas]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string|max:20',
            'ordem' => 'required',
        ]);

        try {
            Pergunta::create([
                'titulo' => $request->name,
                'descricao' => $request->phone,
                'ordem' => $request->email,
            ]);

            return redirect()->route('pergunta.index')->with('success', 'Pergunta criada com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar a pergunta ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string|max:20',
            'ordem' => 'required',
        ]);

        try {
            $pergunta = Pergunta::findOrFail($id);
            $pergunta->update($request->all());

            return redirect()->route('pergunta.index')->with('success', 'Pergunta atualizada com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar pergunta: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $pergunta = Pergunta::findOrFail($id);
            $pergunta->delete();

            return redirect()->route('pergunta.index')->with('success', 'Pergunta deletada com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao deletar pergunta: ' . $e->getMessage()]);
        }
    }
}
