<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;



class UploadImageController extends Controller{

    public function uploadImage(Request $request): JsonResponse
    {
                
        $jsonFilePath = base_path('url.json');
        
                
        if (!file_exists($jsonFilePath)) {
            return response()->json(['error' => 'Arquivo JSON não encontrado.'], 500);
        }
             
        $jsonContent = file_get_contents($jsonFilePath);
        $jsonData = json_decode($jsonContent, true);
    
        if (!isset($jsonData['ngrok_url'])) {
            return response()->json(['error' => 'URL de upload não encontrada no arquivo JSON.'], 500);
        }
        
        $uploadUrl = $jsonData['ngrok_url'] . '/upload';

        $bodyContent = json_decode($request->getContent(), true);

        try {
            $response = Http::withOptions([
                'verify' => false,
            ])->withHeaders([
                'Content-Type' => 'application/json',
            ])->post($uploadUrl, $bodyContent);

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