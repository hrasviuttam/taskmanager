# Task Manager Web App (Django + React)

Simple full‑stack task app with auth, protected routes, and CRUD. Kept clean but not over‑engineered.

## Tech
- **Backend**: Django 5, DRF, SimpleJWT, SQLite
- **Frontend**: React (Vite), react‑router
- **Auth**: JWT (access/refresh), stored in localStorage
- **CORS**: frontend `5173` ↔ backend `8000`

---

## Quick Start

### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver 8000
```
API will be at `http://127.0.0.1:8000/api/`.

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev
```
App will be at `http://127.0.0.1:5173`.

---

## Auth Endpoints
- `POST /api/auth/register/` → `{ username, password }`
- `POST /api/auth/login/` → returns `{ access, refresh }`
- `POST /api/auth/refresh/` → refresh token → new access
- `POST /api/auth/logout/` → blacklist refresh token (optional in this demo)
- `GET /api/me/` → current user (needs `Authorization: Bearer <access>`)

## Tasks Endpoints (JWT required)
- `GET /api/tasks/` → list your tasks
- `POST /api/tasks/` → create `{ title, description?, is_completed? }`
- `GET /api/tasks/:id/`
- `PUT /api/tasks/:id/`
- `DELETE /api/tasks/:id/`

Each task is tied to whoever created it. Users can only see their own tasks.

---

## Frontend Notes
- Minimal styling on purpose (student project vibe).
- Protected routes check `localStorage.access`. If missing, you’re sent to `/login`.
- Logout just clears tokens locally.

---

## Common Gotchas
- If the frontend can’t hit the API, make sure backend is at `http://127.0.0.1:8000` and CORS allows `http://127.0.0.1:5173` (configured in `settings.py`).
- If JWT errors appear, log in again to refresh tokens.

---

## File Tree (trimmed)
```
taskmanager/
  backend/
    config/
    tasks/
    db.sqlite3 (after migrate)
    manage.py
    requirements.txt
  frontend/
    src/
      pages/
```

---

## Why JWT instead of sessions?
It’s simpler for React: no CSRF fiddling. This keeps the project small and easy to grade/run.
