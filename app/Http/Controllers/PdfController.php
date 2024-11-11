<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Models\Pergunta;
use App\Mail\PdfEmail;
use Illuminate\Support\Facades\Mail;

class PdfController extends Controller
{
    public function generatePdf(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Usuário não autenticado'], 403);
            }

            $tempDataImg = DB::connection('sqlite')->table('temp_data_img')->first();
            if (!$tempDataImg) {
                return response()->json(['error' => 'Nenhum dado encontrado'], 404);
            }

            $tempResponses = DB::connection('sqlite')->table('temp_responses')->where('user_id', $user->id)->get();
            $questionario = [];
            $observacao = $tempResponses->first()->observations ?? null;

            foreach ($tempResponses as $response) {
                if ($response->question_id > 0) {
                    $question = Pergunta::select('id', 'title')->find($response->question_id);
                    if ($question) {
                        $questionario[] = [
                            'id' => $question->id,
                            'titulo' => $question->title,
                            'resposta' => $response->answer,
                        ];
                    }
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

            
            $patientName = $validatedData['nome'] ?? null;
            $patientGender = $validatedData['sexo'] ?? null;
            $patientAge = $validatedData['idade'] ?? null;
            $patientPhone = $validatedData['telefone'] ?? null;
            $patientCpf = $validatedData['cpf'] ?? null;
            $patientBirthDate = $validatedData['dataNascimento'] ?? null;

            $userName = $user->name;
            $userCRM = $user->crm;
            $userEnterprise = $user->enterprise;
            
            $imgSrcOriginal = 'data:image/jpeg;base64,' . $tempDataImg->image_original;
            $imgSrcCalor = 'data:image/jpeg;base64,' . $tempDataImg->image_heat;
            $imgSrcSinais = 'data:image/jpeg;base64,' . $tempDataImg->image_analysis;
            $resultPneumonia = $tempDataImg->is_pneumonia ? 'Pneumonia Detectada' : 'Nenhuma Pneumonia Detectada';
            $accuracy = round($tempDataImg->accuracy);
            $lobeTopRight = $tempDataImg->lobo_superior_direito ?? 0;
            $lobeMiddleRight = $tempDataImg->lobo_medio_direito ?? 0;
            $lobeBottomRight = $tempDataImg->lobo_inferior_direito ?? 0;
            $lobeTopLeft = $tempDataImg->lobo_superior_esquerdo ?? 0;
            $lobeBottomLeft = $tempDataImg->lobo_inferior_esquerdo ?? 0;
            $totalLobes = $lobeTopRight + $lobeMiddleRight + $lobeBottomRight + $lobeTopLeft + $lobeBottomLeft;
            
            $options = new Options();
            $options->set('isHtml5ParserEnabled', true);
            $options->set('defaultFont', 'Arial');
            
            $dompdf = new Dompdf($options);
            $css = file_get_contents(base_path('public/pdfs/css/style_pdf.css'));
            
            $combinedHtml = '<html><head><meta charset="UTF-8"><style>' . $css . '</style></head><body>';
            
            $isDataPacient = collect($validatedData)->filter()->isNotEmpty();
            if ($isDataPacient) {
                ob_start();
                include(base_path('public/pdfs/pdf_b.php'));
                $html2 = ob_get_clean();
                $combinedHtml .= $html2 . '<div style="page-break-after: always;"></div>';
            } else {
                ob_start();
                include(base_path('public/pdfs/pdf_a.php'));
                $html1 = ob_get_clean();
                $combinedHtml .= $html1 . '<div style="page-break-after: always;"></div>';
            }

            if (($observacao && !$questionario) || $questionario) {
                ob_start();
                include(base_path('public/pdfs/pdf_c.php'));
                $html3 = ob_get_clean();
                $combinedHtml .= $html3 . '</body></html>';
            }       

            $dompdf->loadHtml($combinedHtml);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();

            return $dompdf->stream('relatorio.pdf', ["Attachment" => false]);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Dados de entrada inválidos', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error("Erro ao gerar o PDF: {$e->getMessage()}");
            return response()->json(['error' => 'Ocorreu um erro ao gerar o PDF. Tente novamente mais tarde.'], 500);
        }
    }

    public function sendEmail(Request $request)
    { 
        $data = $request->validate([
            'title' => 'required|string',
            'message' => 'required|string',
            'pdf' => 'file|mimes:pdf|max:2048',
        ]);
        try {
            $pdfPath = null;
            if ($request->hasFile('pdf')) {
                $pdfPath = $request->file('pdf')->store('temp_pdfs');
            }

            Mail::to(config('mail.from.address'))->send(new PdfEmail($data['title'], $data['message'], storage_path("app/$pdfPath")));

            return response()->json(['status' => 'success']);

        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        } finally{
            if ($pdfPath) {
                \Storage::delete($pdfPath);
            }
        }
    }
}
