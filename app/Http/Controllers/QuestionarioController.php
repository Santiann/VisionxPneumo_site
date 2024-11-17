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
        $user = Auth::user();

        $perguntas = Pergunta::select('id', 'order', 'description', 'title')
        ->where('enterprise', auth()->user()->enterprise)
        ->orderBy('order', 'asc')
        ->get();

        // Obtém as respostas temporárias do banco
        $tempResponses = DB::connection('sqlite')
            ->table('temp_responses')
            ->where('user_id', $user->id)
            ->get();

        $questionario = [];    
        $observacoes =$tempResponses[0]->observations;

        foreach ($perguntas as $pergunta) {
            $resposta = $tempResponses->firstWhere('question_id', $pergunta->id);
            
            $questionario[] = [
                'id' => $pergunta->id,
                'titulo' => $pergunta->title,
                'ordem' => $pergunta->order,
                'resposta' => $resposta ? $resposta->answer : null,
            ];
        }

        // Renderiza o front-end com os dados das perguntas
        return Inertia::render('Questionario', [
            'questionario' =>  $questionario,
            'observacoes' =>  $observacoes
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'perguntasRespostas' => ['nullable', 'array'],
            'observacoes' => ['nullable', 'string', 'max:255'],
        ]);

        $userId = auth()->id();

        DB::connection('sqlite')->table('temp_responses')->where('user_id', $userId)->delete(); //apaga as respostas do médico primeiro para não ficar duplicado

        $responsesData = [];
        $observations = $request->input('observacoes');
        $responses = $request->input('perguntasRespostas');
        $firstObservationStored = false;

        $responses = array_filter($responses, function($value) {
            return !is_null($value) && $value !== '';
        });

        if (empty($responses) && !empty($observations)) {
            $responsesData[] = [
                'question_id' => 0,
                'answer' => '',
                'observations' => $observations,
                'user_id' => $userId,
            ];
        }

        foreach ($request->input('perguntasRespostas') as $questionId => $answer) {
            if (!empty($answer)) {
                $responsesData[] = [
                    'question_id' => $questionId,
                    'answer' => $answer,
                    'observations' => !$firstObservationStored ? $observations : null, 
                    'user_id' => $userId,
                ];               
                    $firstObservationStored = true;
            }
        }
        
        if (!empty($responsesData || $observations)) {
            DB::connection('sqlite')->table('temp_responses')->insert($responsesData);
        }   
    }
}
