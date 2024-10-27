<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CleanTempDataOnSessionExpired
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            DB::connection('sqlite')->table('temp_data_img')->where('user_id', auth()->id())->delete();
            DB::connection('sqlite')->table('temp_responses')->where('user_id', auth()->id())->delete();
        }

        return $next($request);
    }
}
