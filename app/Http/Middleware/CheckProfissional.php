<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckProfissional
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Você precisa estar autenticado.');
        }

        $isProfissional = DB::table('profissionais')->where('user_id', $user->id)->exists();

        if ($isProfissional) {
            return redirect()->route('inicio.index')->with('error', 'Você não tem permissão para acessar esta área.');
        }

        return $next($request);
    }
}
