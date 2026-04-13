<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Services\ProjectService;
class ProjectController extends Controller
{
    public function store(
    CreateProjectRequest $request,
    ProjectService $projectService
    ) {
        $project = $projectService->createProject(
            $request->validated(),
            auth('api')->id()
        );

        return response()->json($project, 201);
    }

    public function index(ProjectService $projectService)
    {
        return response()->json([
            'projects' => $projectService->listProjects(auth('api')->id())
        ]);
    }
    public function show(string $id, ProjectService $projectService)
    {
        return response()->json(
            $projectService->findAccessibleProject(
                $id,
                auth('api')->id()
            )
        );
    }
    public function update(
    string $id,
    UpdateProjectRequest $request,
    ProjectService $projectService
    ) {
        return response()->json(
            $projectService->updateProject(
                $id,
                auth('api')->id(),
                $request->validated()
            )
        );
    }
    public function destroy(
    string $id,
    ProjectService $projectService
    ) {
        $projectService->deleteProject(
            $id,
            auth('api')->id()
        );

        return response()->json(null, 204);
    }
}
