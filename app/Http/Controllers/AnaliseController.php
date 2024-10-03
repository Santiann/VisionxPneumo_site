<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnaliseController extends Controller
{
    public function index()
    {
        return Inertia::render('Analise');
    }
}
