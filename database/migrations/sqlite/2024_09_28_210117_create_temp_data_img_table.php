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
        Schema::connection('sqlite')->create('temp_data_img', function (Blueprint $table) {
            $table->id();
            $table->binary('image_original'); 
            $table->binary('image_heat'); 
            $table->binary('image_analysis');
            $table->boolean('is_pneumonia'); 
            $table->string('accuracy'); 
            $table->unsignedBigInteger('user_id')->after('id');
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
        Schema::dropIfExists('temp_data_img');
    }
};
