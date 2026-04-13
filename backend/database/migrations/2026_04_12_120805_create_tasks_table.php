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
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('status', ['todo', 'in_progress', 'done'])
                ->default('todo');

            $table->enum('priority', ['low', 'medium', 'high'])
                ->default('medium');

            $table->foreignUuid('project_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignUuid('assignee_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignUuid('creator_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->date('due_date')->nullable();

            $table->timestamps();
            $table->index(['project_id', 'status']);
            $table->index(['project_id', 'assignee_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
