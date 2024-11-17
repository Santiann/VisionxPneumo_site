<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TempImgController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image_original' => 'required|string',
            'image_heat' => 'required|string',
            'image_analysis' => 'required|string',
            'is_pneumonia' => 'required|in:0,1',
            'accuracy' => 'required|string',
            'lobo_superior_direito' => 'required|integer|min:0',
            'lobo_medio_direito' => 'required|integer|min:0',
            'lobo_inferior_direito' => 'required|integer|min:0',
            'lobo_superior_esquerdo' => 'required|integer|min:0',
            'lobo_inferior_esquerdo' => 'required|integer|min:0',
        ]);

        DB::connection('sqlite')->table('temp_data_img')->insert([
            'image_original' => $request->input('image_original'),
            'image_heat' => $request->input('image_heat'),
            'image_analysis' => $request->input('image_analysis'),
            'is_pneumonia' => $request->input('is_pneumonia'),
            'accuracy' => $request->input('accuracy'),
            'lobo_superior_direito' => $request->input('lobo_superior_direito'),
            'lobo_medio_direito' => $request->input('lobo_medio_direito'),
            'lobo_inferior_direito' => $request->input('lobo_inferior_direito'),
            'lobo_superior_esquerdo' => $request->input('lobo_superior_esquerdo'),
            'lobo_inferior_esquerdo' => $request->input('lobo_inferior_esquerdo'),
            'user_id' => auth()->id(),
        ]);


        return response()->json(['message' => 'Data stored successfully in SQLite']);
    }

    public function getTempData()
    {
        $userId = auth()->id();

        $tempData = DB::connection('sqlite')
        ->table('temp_data_img')
        ->where('user_id', $userId)
        ->first();

         $tempResponseExist = DB::connection('sqlite')
        ->table('temp_responses')
        ->where('user_id', $userId)
        ->exists();

        if ($tempData) {
            return response()->json(['data' => $tempData, 'response_exists' => $tempResponseExist], 200);
        } else {
            return response()->json(['message' => 'Nenhum dado encontrado'], 404);
        }
    }

    public function deleteTempData()
    {
        $userId = auth()->id();

        DB::connection('sqlite')->table('temp_data_img')->where('user_id', $userId)->delete();
        DB::connection('sqlite')->table('temp_responses')->where('user_id', $userId)->delete();

        return response()->json(['message' => 'Nenhum dado encontrado'], 200);
    }
}
