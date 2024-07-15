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
        Schema::create('profissional', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medico_id')->constrained('medico')->onDelete('cascade');
            $table->string('str_nome');
            $table->string('str_telefone');
            $table->string('str_email')->unique();
            $table->string('str_senha');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profissional');
    }
};
