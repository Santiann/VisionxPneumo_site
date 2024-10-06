<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\DB;

class PdfController extends Controller
{
    public function generatePdf()
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

        $tempData = DB::connection('sqlite')->table('temp_data_img')->first();

        if (!$tempData) {
            return response()->json(['error' => 'Nenhum dado encontrado'], 404);
        }

        // $imagePathOriginal = public_path('pdfs/img_test/imagem_original.jpg');
        //$imagePathCalor = public_path('pdfs/img_test/imagem_calor.png');
        //$imagePathSinais = public_path('pdfs/img_test/imagem_sinais.png');

        //$base64ImageOriginal = imageToBase64($tempData->image_original);
        //$base64ImageCalor = imageToBase64($imagePathCalor);
        //$base64ImageSinais = imageToBase64( $imagePathSinais);

        // Definindo URLs das imagens em Base64
        // $imgSrcOriginal = $base64ImageOriginal !== false ? 'data:image/jpeg;base64,' . $base64ImageOriginal : '';
        //$imgSrcCalor = $base64ImageCalor !== false ? 'data:image/png;base64,' . $base64ImageCalor : '';
         //$imgSrcSinais = $base64ImageSinais !== false ? 'data:image/png;base64,' . $base64ImageSinais : '';

        $imgSrcOriginal = 'data:image/jpeg;base64,' . $tempData->image_original;
        $imgSrcCalor = 'data:image/jpeg;base64,' . $tempData->image_heat;
        $imgSrcSinais = 'data:image/jpeg;base64,' . $tempData->image_analysis;

        $resultPneumonia = $tempData->is_pneumonia ? 'Pneumonia Detectada' : 'Nenhuma Pneumonia Detectada';


        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', false);
        $options->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($options);

        $phpFile1 = base_path('public/pdfs/pdf_a.php');
        $phpFile2 = base_path('public/pdfs/pdf_b.php');
        $phpFile3 = base_path('public/pdfs/pdf_c.php');

        ob_start();
        include($phpFile1);
        $html1 = ob_get_clean();

        ob_start();
        include($phpFile2);
        $html2 = ob_get_clean();

        ob_start();
        include($phpFile3);
        $html3 = ob_get_clean();

        $css = file_get_contents(base_path('public/pdfs/css/style_pdf.css'));

        $combinedHtml = '
            <html>
                <head>
                    <meta charset="UTF-8">
                    <style>' . $css . '</style>
                </head>
                <body>
                    ' . $html1 . '
                    <div style="page-break-after: always;"></div>
                    ' . $html2 . '
                    <div style="page-break-after: always;"></div>
                    ' . $html3 . '
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