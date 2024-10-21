<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\DB;

class DeleteTempDataOnLogout
{
    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
    {
        $userId = $event->user->id;

        // Excluir os dados temporários do usuário na tabela temp_data_img
        DB::connection('sqlite')->table('temp_data_img')->where('user_id', $userId)->delete();
    }
}
