# TaskFlow — Frontend

React frontend for TaskFlow built with TypeScript, Vite, Tailwind CSS, and shadcn/ui.

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| HTTP client | Axios |
| Routing | React Router v7 |
| Icons | Lucide React |

---

## Project Structure

frontend/src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── task/
│   │   ├── TaskCard.tsx
│   │   └── TaskModal.tsx
│   └── ui/
│       └── button.tsx (shadcn components)
├── context/        # React context for auth state
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Route-level components
├── services/
│   └── api.ts      # Axios instance + interceptors
├── types/          # TypeScript type definitions
├── App.tsx
├── routes.tsx
└── main.tsx

---

## Running Locally (without Docker)

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:5173`

---

## Running with Docker

From the project root:

```bash
docker compose up --build
```

App available at `http://localhost:3000`

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://127.0.0.1:8000/api` |

Create a `.env` file in the frontend folder:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Key Design Decisions

**Optimistic UI** — Task status changes update instantly in the UI and revert if the API call fails, giving a snappy user experience without waiting for the server.

**Auth persistence** — JWT token is stored in localStorage and attached to every request via an Axios interceptor. Protected routes redirect to `/login` if no token is found.

**Component library** — shadcn/ui was chosen for its accessible, unstyled primitives built on Radix UI. It integrates cleanly with Tailwind without fighting component library opinions.

**Context for auth state** — Auth state (user, token) is managed in a React context so any component can access it without prop drilling.