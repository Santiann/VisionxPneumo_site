<?php

namespace App\Http\Controllers;

// require_once 'vendor/autoload.php';

use Dompdf\Dompdf;

class PdfController extends Controller
{
    public function index()
    {
        $dompdf = new Dompdf();

        $html = file_get_contents(base_path('public/pdfs/teste.html'));

        //inserindo o HTML que queremos converter
        $dompdf->loadHtml($html);

        // Definindo o papel e a orientação
        $dompdf->setPaper('A4', 'portrait');

        // Renderizando o HTML como PDF
        $dompdf->render();
        $dompdf->stream('pdf1.pdf', [
            "Attachment" => false
        ]);
        
    }
}
