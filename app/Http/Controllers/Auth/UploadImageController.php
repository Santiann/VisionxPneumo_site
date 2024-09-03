<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;


class UploadImageController extends Controller{

    public function uploadImage(Request $request): JsonResponse
    {
        $bodyContent = json_decode($request->getContent(), true);

        try {
            $response = Http::withOptions([
                'verify' => false,
            ])->withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://8e71-34-141-192-8.ngrok-free.app/upload', $bodyContent);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Erro ao fazr o upload da imagem Raio-x'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao se comunicar com a API Ngrok', $e->getMessage()], 500);
        }
    }
}