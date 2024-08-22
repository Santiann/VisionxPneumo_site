<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VerifyCrmController extends Controller
{
    public function verifyCrm(Request $request)
    {
        $bodyContent = $request->getContent();

        // Faz a requisição à API externa usando o Laravel HTTP Client
        try {
            $response = Http::post('https://portal.cfm.org.br/api_rest_php/api/v1/medicos/buscar_medicos', $bodyContent);

            if ($response->successful()) {
                $retorno = response()->json($response->json());
            } else {
                $retorno = response()->json(['error' => 'Erro ao validar CRM'], $response->status());
            }
        } catch (\Exception $e) {
            $retorno = response()->json(['error' => 'Erro ao se comunicar com a API'], 500);
        }

        dd($response->json());
    }
}
