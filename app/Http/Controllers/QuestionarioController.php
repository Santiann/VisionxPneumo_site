<?php

namespace App\Http\Controllers;

use App\Models\Pergunta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuestionarioController extends Controller
{
    public function index()
    {
        $perguntas = Pergunta::select('id', 'order', 'description', 'title')
            ->where('enterprise', auth()->user()->enterprise)
            ->orderBy('order', 'asc')
            ->get();

        // Renderiza o front-end com os dados das perguntas
        return Inertia::render('Questionario', [
            'perguntas' => $perguntas,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'perguntasRespostas' => ['required', 'array', 'min:1'],
            'perguntasRespostas.*' => ['string', 'min:1'],
            'observacoes' => ['nullable', 'string', 'max:255'],
        ]);

        $userId = auth()->id();

        DB::connection('sqlite')->table('temp_responses')->where('user_id', $userId)->delete(); //apaga as respostas do médico primeiro para não ficar duplicado

        $responsesData = [];
        $observations = $request->input('observacoes');
        $firstObservationStored = false;

        foreach ($request->input('perguntasRespostas') as $questionId => $answer) {
            $responsesData[] = [
                'question_id' => $questionId,
                'answer' => $answer,
                'observations' => !$firstObservationStored ? $observations : null, 
                'user_id' => $userId,
            ];

            if (!$firstObservationStored) {
                $firstObservationStored = true;
            }
        }
    
        DB::connection('sqlite')->table('temp_responses')->insert($responsesData);   
    }
}
