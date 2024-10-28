<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pergunta;

class PerguntaController extends Controller
{

    public function index()
    {
        $empresa = auth()->user()->enterprise;
        $perguntas = Pergunta::where('enterprise', $empresa)->get();

        return Inertia::render('CadastroPerguntas', [
            'perguntas' => $perguntas,
        ]);
    }

    public function list()
    {
        $empresa = auth()->user()->enterprise;
        $perguntas = Pergunta::where('enterprise', $empresa)->get();

        return response()->json(['perguntas' => $perguntas]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:pergunta|max:255',
            'description' => 'required|string|max:255',
            'size' => 'required',
            'order' => 'required|integer',
        ]);
        try {
            Pergunta::create([
                'enterprise' => auth()->user()->enterprise,
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'size' => $request->input('size'),
                'order' => $request->input('order'),
            ]);

            return response()->json(['message' => 'Pergunta criada com sucesso.'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao criar a pergunta: ' . $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:20',
            'order' => 'required',
            'size' => 'required',
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
