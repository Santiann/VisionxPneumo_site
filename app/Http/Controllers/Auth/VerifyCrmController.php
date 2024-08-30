<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

/**
 * Valida o CRM do médico e retorna os dados dele.
 * 
 * @author Santian <joaosantian@hotmail.com>
 * @since 2024-08-26
 */
class VerifyCrmController extends Controller
{
    /**
     * Valida o CRM do médico, crm vem do request.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function verifyCrm(Request $request): JsonResponse
    {
        // Decodifica o conteúdo JSON do request para um array
        $bodyContent = json_decode($request->getContent(), true);

        // Faz a requisição à API externa usando o Laravel HTTP Client
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://portal.cfm.org.br/api_rest_php/api/v1/medicos/buscar_medicos', $bodyContent);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Erro ao validar CRM'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao se comunicar com a API'], 500);
        }
    }
}
