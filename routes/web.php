<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\TempImgController;
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

Route::get('/teste', function () {
    return Inertia::render('Teste');
});
Route::get('pdf', [PdfController::class, 'index']);

Route::get('/inicio', function () {
    return Inertia::render('Inicio');
})->middleware(['auth', 'verified'])->name('inicio');

Route::get('/analise', function () {
    return Inertia::render('Analise');
})->middleware(['auth', 'verified'])->name('analise');

Route::get('/questionario', function () {
    return Inertia::render('Questionario');
})->middleware(['auth', 'verified'])->name('questionario');

Route::get('/suporte', function () {
    return Inertia::render('Suporte');
})->middleware(['auth', 'verified'])->name('suporte');

Route::get('/profissionais', function () {
    return Inertia::render('Profissionais');
})->middleware(['auth', 'verified'])->name('profissionais');

Route::get('/cadastro_perguntas', function () {
    return Inertia::render('CadastroPerguntas');
})->middleware(['auth', 'verified'])->name('cadastro_perguntas');

Route::post('/temp-img', [TempImgController::class, 'store'])->name('temp-img.store');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
