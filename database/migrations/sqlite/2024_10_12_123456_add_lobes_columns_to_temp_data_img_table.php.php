<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('temp_data_img', function (Blueprint $table) {
            $table->integer('lobo_superior_direito')->nullable();
            $table->integer('lobo_medio_direito')->nullable();
            $table->integer('lobo_inferior_direito')->nullable();
            $table->integer('lobo_superior_esquerdo')->nullable();
            $table->integer('lobo_inferior_esquerdo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('temp_data_img', function (Blueprint $table) {
            $table->dropColumn('lobo_superior_direito');
            $table->dropColumn('lobo_medio_direito');
            $table->dropColumn('lobo_inferior_direito');
            $table->dropColumn('lobo_superior_esquerdo');
            $table->dropColumn('lobo_inferior_esquerdo');
        });
    }
};
