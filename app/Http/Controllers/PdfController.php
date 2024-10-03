<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use Dompdf\Options;

class PdfController extends Controller
{
    public function generatePdf()
    {
        // Função para converter imagem em Base64
        function imageToBase64($imagePath) 
        {
            if (!file_exists($imagePath)) 
            {
                return false;
            }

            $imageData = file_get_contents($imagePath);
            return base64_encode($imageData);
        }

        // Caminhos para as imagens
        $imagePathOriginal = public_path('pdfs/img_test/imagem_original.jpg');
        $imagePathCalor = public_path('pdfs/img_test/imagem_calor.png');
        $imagePathSinais = public_path('pdfs/img_test/imagem_sinais.png');

        // Convertendo imagens para Base64
        $base64ImageOriginal = imageToBase64($imagePathOriginal);
        $base64ImageCalor = imageToBase64($imagePathCalor);
        $base64ImageSinais = imageToBase64($imagePathSinais);

        // Definindo URLs das imagens em Base64
        $imgSrcOriginal = $base64ImageOriginal !== false ? 'data:image/jpeg;base64,' . $base64ImageOriginal : '';
        $imgSrcCalor = $base64ImageCalor !== false ? 'data:image/png;base64,' . $base64ImageCalor : '';
        $imgSrcSinais = $base64ImageSinais !== false ? 'data:image/png;base64,' . $base64ImageSinais : '';

        // Configurações do Dompdf
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', false);
        $options->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($options);

        // Caminho para os arquivos PHP
        $phpFile1 = base_path('public/pdfs/pdf_a.php');
        $phpFile2 = base_path('public/pdfs/pdf_b.php');
        $phpFile3 = base_path('public/pdfs/pdf_c.php');

        // Captura o conteúdo gerado pelo PHP
        ob_start();
        include($phpFile1);
        $html1 = ob_get_clean();

        ob_start();
        include($phpFile2);
        $html2 = ob_get_clean();

        ob_start();
        include($phpFile3);
        $html3 = ob_get_clean();

        // Captura o conteúdo do arquivo CSS
        $css = file_get_contents(base_path('public/pdfs/css/style_pdf.css'));

        // Adiciona o CSS ao HTML gerado
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

        // Inserindo o HTML combinado que queremos converter
        $dompdf->loadHtml($combinedHtml);

        // Definindo o papel e a orientação
        $dompdf->setPaper('A4', 'portrait');

        // Renderizando o HTML como PDF
        $dompdf->render();

        // Retornar o PDF para o usuário (abre no navegador)
        return $dompdf->stream('relatorio.pdf', [
            "Attachment" => false
        ]);
    }
}