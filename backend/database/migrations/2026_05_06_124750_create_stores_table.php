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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('tagline')->nullable();
            $table->string('logo')->nullable();
            $table->string('banner')->nullable();
            $table->string('type'); // cozy_kitchen, cannabis_cabinet, gr_oil, adults_only
            $table->boolean('requires_age_gate')->default(false);
            $table->integer('min_age')->default(18);
            $table->boolean('is_active')->default(true);
            $table->boolean('accepts_orders')->default(true);
            $table->string('primary_color')->default('#4F7942');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('whatsapp')->nullable();
            $table->json('social_links')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
