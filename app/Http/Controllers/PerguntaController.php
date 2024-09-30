<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PerguntaController extends Controller
{

    public function index()
    {
        return Inertia::render('CadastroPerguntas', [
            'profissionais' => [],
        ]);
    }
}
