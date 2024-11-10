<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PdfEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected string $title;
    protected string $message;
    public $pdfPath;

    /**
     * Create a new message instance.
     */
    public function __construct($title, $message, $pdfPath)
    {
        $this->title = $title;
        $this->message = $message;
        $this->pdfPath = $pdfPath;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email = $this->view('emails.pdf')
            ->subject($this->title)
            ->with([
                'title' => $this->title,
                'messageContent' => $this->message
            ]);

            if ($this->pdfPath) {
                $email->attach($this->pdfPath, [
                    'as' => 'relatorio.pdf',
                    'mime' => 'application/pdf',
                ]);
            }
        
        return $email;
    }
}
