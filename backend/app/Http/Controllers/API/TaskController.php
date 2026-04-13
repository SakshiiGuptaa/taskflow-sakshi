<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Http\Request;
class TaskController extends Controller
{
    public function index(
    string $id,
    Request $request,
        TaskService $taskService
    ) {
        return response()->json([
            'tasks' => $taskService->listTasks(
                $id,
                auth('api')->id(),
                $request->only(['status', 'assignee'])
            )
        ]);
    }

    public function store(
        string $id,
        CreateTaskRequest $request,
        TaskService $taskService
    ) {
        return response()->json(
            $taskService->createTask(
                $id,
                auth('api')->id(),
                $request->validated()
            ),
            201
        );
    }

    public function update(
    string $id,
    UpdateTaskRequest $request,
    TaskService $taskService
    ) {
        return response()->json(
            $taskService->updateTask(
                $id,
                auth('api')->id(),
                $request->validated()
            )
        );
    }

    public function destroy(
        string $id,
        TaskService $taskService
    ) {
        $taskService->deleteTask(
            $id,
            auth('api')->id()
        );

        return response()->json(null, 204);
    }
}
