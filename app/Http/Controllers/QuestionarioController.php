<?php

namespace App\Http\Controllers;

use App\Models\Pergunta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class QuestionarioController extends Controller
{
    public function index()
    {
        $perguntas = Pergunta::select('ordem', 'descricao', 'titulo')
            ->orderBy('ordem', 'asc')
            ->get();

        // Renderiza o front-end com os dados das perguntas
        return Inertia::render('Questionario', [
            'perguntas' => $perguntas,
        ]);
    }
    public function store(Request $request)
    {
        Log::info($request->all());

        return response()->json(['message' => 'Dados recebidos com sucesso!'], 200);
    }
}
