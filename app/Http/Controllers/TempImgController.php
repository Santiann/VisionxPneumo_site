<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TempImgController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image_original' => 'required|string',
            'image_heat' => 'required|string',
            'image_analysis' => 'required|string',
            'is_pneumonia' => 'required|boolean',
            'accuracy' => 'required|string',
        ]);

        DB::connection('sqlite')->table('temp_data_img')->insert([
            'image_original' => $request->input('image_original'),
            'image_heat' => $request->input('image_heat'),
            'image_analysis' => $request->input('image_analysis'),
            'is_pneumonia' => $request->input('is_pneumonia'),
            'accuracy' => $request->input('accuracy'),
        ]);

        return redirect()->back()->with('message', 'Data stored successfully in SQLite');
    }
}