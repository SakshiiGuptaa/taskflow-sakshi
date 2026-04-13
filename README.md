# TaskFlow

A full-stack task management system built with Laravel and React. Users can register, log in, create projects, add tasks, assign them to team members, and track progress by status.

---

## 1. Overview

**What it does:**
- JWT-based authentication (register and login)
- Create and manage projects
- Add tasks with status, priority, assignee, and due date
- Filter tasks by status
- Optimistic UI updates for task status changes
- Fully containerized with Docker Compose

**Tech Stack:**
| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Laravel 12, PHP 8.2, REST API |
| Auth | JWT via tymon/jwt-auth (bcrypt cost 12) |
| Database | PostgreSQL 16 |
| Infrastructure | Docker, Docker Compose, nginx |

---

## 2. Architecture Decisions

**Why Laravel over Go?**
The assignment preferred Go but explicitly allowed other languages. Laravel was chosen because it allowed faster delivery of a complete, production-quality submission within the time constraint. Laravel's migration system, Eloquent ORM, and JWT package provided a solid foundation without sacrificing code quality.

**Why separate Dockerfiles?**
Each service (frontend, backend, database) has a single responsibility. The backend Dockerfile uses a multi-stage build — a builder stage installs Composer dependencies, and a minimal runtime stage runs the app. This keeps the final image small and free of build tools.

**Why php artisan serve instead of nginx + php-fpm?**
For this assignment scope, `php artisan serve` is sufficient and keeps the backend container simple. In production, this would be replaced with nginx + php-fpm for performance and process management.

**Why shadcn/ui?**
shadcn/ui provides accessible, unstyled components built on Radix UI primitives. It integrates cleanly with Tailwind CSS and gives full control over styling without fighting a component library's opinions.

**What was intentionally left out:**
- No test suite — time was prioritised on core features and Docker setup
- No pagination — endpoints return all results
- No WebSocket/SSE real time updates
- No drag and drop

---

## 3. Running Locally

The only requirement is Docker Desktop. No PHP, Node, or PostgreSQL needed.

```bash
git clone https://github.com/SakshiiGuptaa/taskflow-sakshi.git
cd taskflow-sakshi
cp .env.example .env
# Fill in your values in .env (see .env.example for reference)
docker compose up --build
```

- Frontend → http://localhost:3000
- Backend API → http://localhost:8000/api

---

## 4. Running Migrations

Migrations and seeding run **automatically** on container start. No manual steps needed.

The backend container runs this on startup:
```bash
php artisan config:clear
php artisan migrate --force
php artisan db:seed --force
```

If you need to run them manually:
```bash
docker compose exec backend php artisan migrate --force
docker compose exec backend php artisan db:seed --force
```

To roll back:
```bash
docker compose exec backend php artisan migrate:rollback
```

---

## 5. Test Credentials

A test user is seeded automatically on first startup. You can either **register a new account** or use the pre-seeded test credentials below:

> **Recommended:** Register a new account first to explore the full flow, then use the test credentials if you want pre-seeded project and task data ready to go.

Email:    test@example.com
Password: password123

The seed also creates 1 project and 3 tasks with different statuses (todo, in_progress, done).

---

## 6. API Reference

**Base URL:** `http://localhost:8000/api`

**Common Request Headers:**
```
Accept: application/json
Authorization: Bearer <jwt_token>
```

All endpoints except `/auth/*` require:
### Authentication

**POST /auth/register**
```json
// Request
{ "name": "Sakshi Gupta", "email": "sakshi@example.com", "password": "password123" }

// Response 201
{ "user": { "id": "uuid", "name": "Sakshi Gupta", "email": "sakshi@example.com" }, "token": "jwt_token" }
```

**POST /auth/login**
```json
// Request
{ "email": "sakshi@example.com", "password": "password123" }

// Response 200
{ "user": { "id": "uuid", "name": "Sakshi Gupta", "email": "sakshi@example.com" }, "token": "jwt_token" }
```

### Projects

**GET /projects** — list projects owned by or assigned to current user
```json
// Response 200
{ "projects": [{ "id": "uuid", "name": "TaskFlow", "description": "...", "owner_id": "uuid", "created_at": "..." }] }
```

**POST /projects**
```json
// Request
{ "name": "TaskFlow", "description": "Interview Assignment" }
// Response 201 — returns created project object
```

**GET /projects/{id}** — project details with tasks
```json
// Response 200
{ "id": "uuid", "name": "TaskFlow", "tasks": [{ "id": "uuid", "title": "...", "status": "todo" }] }
```

**PATCH /projects/{id}** — owner only
```json
// Request
{ "name": "Updated Name", "description": "Updated Description" }
// Response 200 — returns updated project object
```

**DELETE /projects/{id}** — owner only → Response 204

### Tasks

**GET /projects/{id}/tasks** — supports `?status=todo|in_progress|done` and `?assignee=uuid`
```json
// Response 200
{ "tasks": [{ "id": "uuid", "title": "...", "status": "todo", "priority": "high" }] }
```

**POST /projects/{id}/tasks**
```json
// Request
{ "title": "Implement Backend", "description": "...", "priority": "high", "assignee_id": "uuid", "due_date": "2026-04-20" }
// Response 201 — returns created task object
```

**PATCH /tasks/{id}**
```json
// Request — all fields optional
{ "status": "done", "priority": "medium" }
// Response 200 — returns updated task object
```

**DELETE /tasks/{id}** — project owner or task creator only → Response 204

### Error Responses
```json
// 400 Validation error
{ "error": "validation failed", "fields": { "email": "is required" } }

// 401 Unauthenticated
{ "error": "unauthorized" }

// 403 Forbidden
{ "error": "forbidden" }

// 404 Not found
{ "error": "not found" }
```

---

## 7. What I'd Do With More Time

**Tests** — No test suite was written. I would add PHPUnit integration tests covering auth, project ownership checks, and task CRUD. The assignment asked for at least 3 and I would prioritise the auth and permission-related endpoints as they are the most critical.

**Pagination** — All list endpoints return every record. I would add `?page=&limit=` query parameters with a consistent envelope response including `total`, `page`, and `per_page` fields.

**Dark mode** — I would add a dark mode toggle using Tailwind's dark mode class strategy, persisted in localStorage so the user's preference survives page refreshes.

**Drag and drop** — I would implement drag-and-drop task reordering using dnd-kit, allowing users to move tasks between status columns (todo, in_progress, done) visually instead of using the dropdown.
