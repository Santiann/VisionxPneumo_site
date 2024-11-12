<?php

namespace App\Http\Controllers;

use App\Mail\SupportEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SuporteController extends Controller
{
    public function index()
    {
        return Inertia::render('Suporte');
    }

    public function sendEmail(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'message' => 'required|string',
        ]);
        try {
            $mail = auth()->user()->email;
            Mail::to($mail)->send(new SupportEmail($data['title'], $data['message']));
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
