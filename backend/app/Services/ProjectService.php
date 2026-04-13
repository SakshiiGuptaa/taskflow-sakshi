<?php


namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProjectService
{
    public function createProject(array $data, string $userId): Project
    {
        return Project::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'owner_id' => $userId,
        ]);
    }
    public function listProjects(string $userId)
    {
        return Project::query()
            ->where('owner_id', $userId)
            ->orWhereHas('tasks', function ($query) use ($userId) {
                $query->where('assignee_id', $userId);
            })
            ->latest()
            ->get();
    }
    public function findAccessibleProject(string $projectId, string $userId): Project
    {
        $project = Project::with('tasks')->find($projectId);
    
        if (!$project) {
            abort(404, 'Not found');
        }
    
        $hasAccess =
            $project->owner_id === $userId ||
            $project->tasks()->where('assignee_id', $userId)->exists();
    
        if (!$hasAccess) {
            abort(403, 'Forbidden');
        }
    
        return $project;
    }
    public function findOwnedProject(string $projectId, string $userId): Project
    {
        $project = Project::find($projectId);

        if (!$project) {
            abort(404, 'Not found');
        }

        if ($project->owner_id !== $userId) {
            abort(403, 'Forbidden');
        }

        return $project;
    }
    public function updateProject(
    string $projectId,
    string $userId,
    array $data
    ): Project {
        $project = $this->findOwnedProject($projectId, $userId);

        $project->update($data);

        return $project->fresh();
    }

    public function deleteProject(
    string $projectId,
    string $userId
    ): void {
        $project = $this->findOwnedProject($projectId, $userId);

        $project->delete();
    }
}
?>