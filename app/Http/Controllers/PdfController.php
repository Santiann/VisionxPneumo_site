<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Pergunta;

class PdfController extends Controller
{
    public function generatePdf(Request $request)
    {
        function imageToBase64($imagePath) 
        {
            if (!file_exists($imagePath)) 
            {
                return false;
            }

            $imageData = file_get_contents($imagePath);
            return base64_encode($imageData);
        }

        $user = Auth::user();

        $tempDataImg = DB::connection('sqlite')->table('temp_data_img')->first();

        if (!$tempDataImg) {
            return response()->json(['error' => 'Nenhum dado encontrado'], 404);
        }

        $tempResponses =  DB::connection('sqlite')->table('temp_responses')->where('user_id', $user->id)->get();

         $quationario = [];
         $observacao = $tempResponses->first()->observations;

        foreach ($tempResponses as $response) {
            $question = Pergunta::select('id', 'titulo')->where('id', $response->question_id)->first();
    
            if ($question) {
                $quationario[] = [
                    'id' => $question->id,
                    'titulo' => $question->titulo,
                    'resposta' => $response->answer,
                ];
            }
        }

        $validatedData = $request->validate([
            'nome' => 'nullable|string',
            'sexo' => 'nullable|string',
            'idade' => 'nullable|integer',
            'telefone' => 'nullable|string',
            'cpf' => 'nullable|string',
            'dataNascimento' => 'nullable|date',
        ]);

        $isDataPacient = false;
        
        if (collect($validatedData)->filter()->isNotEmpty()) {
            $patientName = $validatedData['nome'] ?? null;
            $patientGender = $validatedData['sexo'] ?? null;
            $patientAge = $validatedData['idade'] ?? null;
            $patientPhone = $validatedData['telefone'] ?? null;
            $patientCpf = $validatedData['cpf'] ?? null;
            $patientBirthDate = $validatedData['dataNascimento'] ?? null;
            $isDataPacient = true;
        }

        $userName = $user->name;       
        $userCRM = $user->crm;
        $userEnterprise = $user->enterprise;        

        $imgSrcOriginal = 'data:image/jpeg;base64,' . $tempDataImg->image_original;
        $imgSrcCalor = 'data:image/jpeg;base64,' . $tempDataImg->image_heat;
        $imgSrcSinais = 'data:image/jpeg;base64,' . $tempDataImg->image_analysis;
        $resultPneumonia = $tempDataImg->is_pneumonia ? 'Pneumonia Detectada' : 'Nenhuma Pneumonia Detectada';
        $accuracy = $tempDataImg->accuracy;
        $lobeTopRight = $tempDataImg->lobo_superior_direito;
        $lobeMiddleRight = $tempDataImg->lobo_medio_direito;
        $lobeBottomRight = $tempDataImg->lobo_inferior_direito;
        $lobeTopLeft = $tempDataImg->lobo_superior_esquerdo;
        $lobeBottomLeft = $tempDataImg->lobo_inferior_esquerdo;
        $totalLobes = $lobeTopRight + $lobeMiddleRight + $lobeBottomRight + $lobeTopLeft + $lobeBottomLeft;


        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', false);
        $options->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($options);

        $phpFile1 = base_path('public/pdfs/pdf_a.php');
        $phpFile2 = base_path('public/pdfs/pdf_b.php');
        $phpFile3 = base_path('public/pdfs/pdf_c.php');

        $css = file_get_contents(base_path('public/pdfs/css/style_pdf.css'));

        ob_start();
        include(base_path('public/pdfs/pdf_c.php'));
        $html3 = ob_get_clean();

        $combinedHtml = '
            <html>
                <head>
                    <meta charset="UTF-8">
                    <style>' . $css . '</style>
                </head>
                <body>';

        if ($isDataPacient) {
            ob_start();
            include($phpFile2);
            $html2 = ob_get_clean();
            $combinedHtml .= $html2;
            $combinedHtml .= '<div style="page-break-after: always;"></div>';
        } else {
            ob_start();
            include($phpFile1);
            $html1 = ob_get_clean();
            $combinedHtml .= $html1;
            $combinedHtml .= '<div style="page-break-after: always;"></div>';
        }

        $combinedHtml .= $html3;

        $combinedHtml .= '
                </body>
            </html>';

        $dompdf->loadHtml($combinedHtml);

        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        return $dompdf->stream('relatorio.pdf', [
            "Attachment" => false
        ]);
    }
}