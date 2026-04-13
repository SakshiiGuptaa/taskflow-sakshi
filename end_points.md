API Reference
Base URL
http://localhost:8000/api
Authentication
Register User

POST /auth/register

Request
{
  "name": "Sakshi Gupta",
  "email": "sakshi@example.com",
  "password": "password123"
}
Response 201 Created
{
  "user": {
    "id": "uuid",
    "name": "Sakshi Gupta",
    "email": "sakshi@example.com"
  },
  "token": "jwt_token"
}
Login User

POST /auth/login

Request
{
  "email": "sakshi@example.com",
  "password": "password123"
}
Response 200 OK
{
  "user": {
    "id": "uuid",
    "name": "Sakshi Gupta",
    "email": "sakshi@example.com"
  },
  "token": "jwt_token"
}
Projects

All project endpoints require:

Authorization: Bearer <token>
List Projects

GET /projects

Returns projects owned by the current user or where the user is assigned tasks.

Response 200 OK
{
  "projects": [
    {
      "id": "uuid",
      "name": "TaskFlow",
      "description": "Interview Assignment",
      "owner_id": "uuid",
      "created_at": "2026-04-12T10:00:00Z"
    }
  ]
}
Create Project

POST /projects

Request
{
  "name": "TaskFlow",
  "description": "Interview Assignment"
}
Response 201 Created
{
  "id": "uuid",
  "name": "TaskFlow",
  "description": "Interview Assignment",
  "owner_id": "uuid"
}
Get Project Details

GET /projects/{id}

Returns project details including tasks.

Response 200 OK
{
  "id": "uuid",
  "name": "TaskFlow",
  "description": "Interview Assignment",
  "owner_id": "uuid",
  "tasks": [
    {
      "id": "uuid",
      "title": "Implement JWT",
      "status": "todo"
    }
  ]
}
Update Project

PATCH /projects/{id}

Request
{
  "name": "Updated Project Name",
  "description": "Updated Description"
}
Response 200 OK
{
  "id": "uuid",
  "name": "Updated Project Name",
  "description": "Updated Description"
}
Delete Project

DELETE /projects/{id}

Response 204 No Content
Tasks

All task endpoints require authentication.

List Tasks

GET /projects/{id}/tasks

Supports filters:

?status=todo
?assignee=uuid
Response 200 OK
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Implement Backend",
      "status": "todo",
      "priority": "high"
    }
  ]
}
Create Task

POST /projects/{id}/tasks

Request
{
  "title": "Implement Backend",
  "description": "Complete task APIs",
  "priority": "high",
  "assignee_id": "uuid",
  "due_date": "2026-04-20"
}
Response 201 Created
{
  "id": "uuid",
  "title": "Implement Backend",
  "status": "todo",
  "priority": "high",
  "project_id": "uuid",
  "creator_id": "uuid"
}
Update Task

PATCH /tasks/{id}

Request
{
  "status": "done",
  "priority": "medium"
}
Response 200 OK
{
  "id": "uuid",
  "title": "Implement Backend",
  "status": "done",
  "priority": "medium"
}
Delete Task

DELETE /tasks/{id}

Response 204 No Content
Error Responses
Validation Error 400
{
  "error": "validation failed",
  "fields": {
    "email": "is required"
  }
}
Unauthorized 401
{
  "error": "unauthorized"
}
Forbidden 403
{
  "error": "forbidden"
}
Not Found 404
{
  "error": "not found"
}