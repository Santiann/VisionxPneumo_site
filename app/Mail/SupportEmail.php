<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SupportEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected string $title;
    protected string $message;

    /**
     * Create a new message instance.
     */
    public function __construct($title, $message)
    {
        $this->title = $title;
        $this->message = $message;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->view('emails.support')
            ->subject($this->title)
            ->with([
                'title' => $this->title,
                'messageContent' => $this->message
            ]);
    }
}
