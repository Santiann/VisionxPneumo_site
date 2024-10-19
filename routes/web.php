<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\TempImgController;
use App\Http\Controllers\ProfissionalController;
use App\Http\Controllers\SuporteController;
use App\Http\Controllers\QuestionarioController;
use App\Http\Controllers\AnaliseController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\PerguntaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    
  // Rotas para pdf
    Route::get('/teste', function () {
      return Inertia::render('Teste');
    });
  
    Route::get('/pdf', [PdfController::class, 'generatePdf']);

    // Rotas para inicio
    Route::get('/inicio', [InicioController::class, 'index'])->name('inicio.index');

    // Rotas para analise
    Route::get('/analise', [AnaliseController::class, 'index'])->name('analise.index');

    // Rotas para questionário
    Route::get('/questionario', [QuestionarioController::class, 'index'])->name('questionario.index');
    Route::post('/questionario', [QuestionarioController::class, 'store'])->name('questionario.store');
    

    // Rotas para suporte
    Route::get('/suporte', [SuporteController::class, 'index'])->name('suporte.index');

    // Rotas para perguntas
    Route::get('/pergunta', [PerguntaController::class, 'index'])->name('pergunta.index');

    // Rotas para o banco temporário
    Route::post('/tempImg', [TempImgController::class, 'store'])->name('tempImg.store');
    Route::get('/tempImg', [TempImgController::class, 'getTempData'])->name('tempImg.get');
    Route::delete('/tempImg', [TempImgController::class, 'deleteTempData'])->name('tempImg.delete');

    // Rotas para profissionais
    Route::get('/profissionais', [ProfissionalController::class, 'index'])->name('profissionais.index');
    Route::post('/profissionais', [ProfissionalController::class, 'store'])->name('profissionais.store');
    Route::put('/profissionais/{id}', [ProfissionalController::class, 'update'])->name('profissionais.update');
    Route::delete('/profissionais/{id}', [ProfissionalController::class, 'destroy'])->name('profissionais.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
