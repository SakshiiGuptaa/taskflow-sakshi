# TaskFlow — Backend

REST API for TaskFlow built with Laravel 12 and PHP 8.2. Handles authentication, project management, and task tracking.

---

## Tech Stack

| | |
|---|---|
| Language | PHP 8.2 |
| Framework | Laravel 12 |
| Database | PostgreSQL 16 |
| Auth | JWT via tymon/jwt-auth (bcrypt cost 12) |
| Server | php artisan serve (containerized) |

---

## Project Structure
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/API/
│   │   │   ├── AuthController.php
│   │   │   ├── ProjectController.php
│   │   │   └── TaskController.php
│   │   └── Middleware/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Project.php
│   │   └── Task.php
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_04_12_120743_create_projects_table.php
│   │   └── 2026_04_12_120805_create_tasks_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   └── api.php
├── docker/
│   └── start.sh
└── Dockerfile

---

## Running with Docker

From the project root:

```bash
docker compose up --build
```

API available at `http://localhost:8000/api`

---

## Running Locally (without Docker)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate --force
php artisan db:seed --force
php artisan serve
```

---

## Migrations

Migrations run automatically on container start. To run manually:

```bash
# Run migrations
docker compose exec backend php artisan migrate --force

# Roll back
docker compose exec backend php artisan migrate:rollback

# Fresh migration + seed
docker compose exec backend php artisan migrate:fresh --seed
```

### Migration files
| File | Description |
|---|---|
| `0001_01_01_000000_create_users_table` | Users table with UUID primary key |
| `0001_01_01_000001_create_cache_table` | Laravel cache table |
| `0001_01_01_000002_create_jobs_table` | Laravel jobs table |
| `2026_04_12_120743_create_projects_table` | Projects with owner_id FK |
| `2026_04_12_120805_create_tasks_table` | Tasks with status, priority, assignee, creator |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /auth/register | No | Register new user |
| POST | /auth/login | No | Login, returns JWT |
| GET | /projects | Yes | List user's projects |
| POST | /projects | Yes | Create project |
| GET | /projects/{id} | Yes | Project details + tasks |
| PATCH | /projects/{id} | Yes | Update project (owner only) |
| DELETE | /projects/{id} | Yes | Delete project (owner only) |
| GET | /projects/{id}/tasks | Yes | List tasks, filter by status/assignee |
| POST | /projects/{id}/tasks | Yes | Create task |
| PATCH | /tasks/{id} | Yes | Update task |
| DELETE | /tasks/{id} | Yes | Delete task |

---

## Environment Variables

| Variable | Description |
|---|---|
| `APP_KEY` | Laravel app key |
| `JWT_SECRET` | JWT signing secret |
| `DB_CONNECTION` | Database driver (pgsql) |
| `DB_HOST` | Database host (db in Docker) |
| `DB_DATABASE` | Database name |
| `DB_USERNAME` | Database user |
| `DB_PASSWORD` | Database password |