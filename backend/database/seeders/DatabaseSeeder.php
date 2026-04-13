<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Skip if already seeded
        if (User::where('email', 'test@example.com')->exists()) {
            echo "==> Seed data already exists, skipping...\n";
            return;
        }

        $user = User::create([
            'id'       => Str::uuid(),
            'name'     => 'Test User',
            'email'    => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        $project = Project::create([
            'id'          => Str::uuid(),
            'name'        => 'Sample Project',
            'description' => 'This is a seeded test project',
            'owner_id'    => $user->id,
        ]);

        Task::create([
            'id'          => Str::uuid(),
            'title'       => 'First Task',
            'description' => 'This task is yet to be started',
            'status'      => 'todo',
            'priority'    => 'high',
            'project_id'  => $project->id,
            'assignee_id' => $user->id,
            'creator_id'  => $user->id,
            'due_date'    => now()->addDays(7)->toDateString(),
        ]);

        Task::create([
            'id'          => Str::uuid(),
            'title'       => 'Second Task',
            'description' => 'This task is currently being worked on',
            'status'      => 'in_progress',
            'priority'    => 'medium',
            'project_id'  => $project->id,
            'assignee_id' => $user->id,
            'creator_id'  => $user->id,
            'due_date'    => now()->addDays(3)->toDateString(),
        ]);

        Task::create([
            'id'          => Str::uuid(),
            'title'       => 'Third Task',
            'description' => 'This task has been completed',
            'status'      => 'done',
            'priority'    => 'low',
            'project_id'  => $project->id,
            'assignee_id' => $user->id,
            'creator_id'  => $user->id,
            'due_date'    => now()->subDays(1)->toDateString(),
        ]);

        echo "==> Seed data created successfully\n";
    }
}