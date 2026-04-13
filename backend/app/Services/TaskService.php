<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function createTask(
        string $projectId,
        string $userId,
        array $data
    ): Task {
        app(ProjectService::class)
            ->findAccessibleProject($projectId, $userId);

        return Task::create([
            ...$data,
            'project_id' => $projectId,
            'creator_id' => $userId,
            'status' => 'todo',
        ]);
    }

    public function listTasks(
    string $projectId,
    string $userId,
    array $filters
    )
    {
        app(ProjectService::class)
            ->findAccessibleProject($projectId, $userId);

        return Task::query()
            ->where('project_id', $projectId)
            ->when(
                $filters['status'] ?? null,
                fn ($query, $status) => $query->where('status', $status)
            )
            ->when(
                $filters['assignee'] ?? null,
                fn ($query, $assignee) => $query->where('assignee_id', $assignee)
            )
            ->latest()
            ->get();
    }

    public function findTaskWithAccess(
    string $taskId,
    string $userId
    ): Task {
        $task = Task::with('project')->find($taskId);

        if (!$task) {
            abort(404, 'Not found');
        }

        app(ProjectService::class)
            ->findAccessibleProject($task->project_id, $userId);

        return $task;
    }
    public function updateTask(
    string $taskId,
    string $userId,
    array $data
    ): Task {
        $task = $this->findTaskWithAccess($taskId, $userId);

        $task->update($data);

        return $task->fresh();
    }

    public function deleteTask(
    string $taskId,
    string $userId
    ): void {
        $task = Task::with('project')->find($taskId);

        if (!$task) {
            abort(404, 'Not found');
        }

        $isProjectOwner = $task->project->owner_id === $userId;
        $isTaskCreator = $task->creator_id === $userId;

        if (!$isProjectOwner && !$isTaskCreator) {
            abort(403, 'Forbidden');
        }

        $task->delete();
    }

    
}