<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/',
        '/teste',
        '/pdf',
        '/pdf/sendEmail',
        '/inicio',
        '/analise',
        '/questionario',
        '/suporte',
        '/suporte/sendEmail',
        '/pergunta',
        '/pergunta/list',
        '/pergunta/store',
        '/pergunta/*',
        '/tempImg',
        '/tempImg/store',
        '/tempImg/getTempData',
        '/tempImg/deleteTempData',
        '/profissionais',
        '/profissionais/verifica_medico',
        '/profissionais/list',
        '/profissionais/store',
        '/profissionais/*',
        '/profile',
        '/profile/edit',
        '/profile/update',
        '/profile/destroy',

        '/register',
        '/login',
        '/verifyCrm',
        '/forgot-password',
        '/reset-password/{token}',
        '/reset-password',
        '/verify-email',
        '/verify-email/{id}/{hash}',
        '/email/verification-notification',
        '/confirm-password',
        '/logout',
        '/uploadImage',
    ];
}
