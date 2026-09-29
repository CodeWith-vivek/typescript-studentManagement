# Student Management

A server-rendered student management web app built with Express, TypeScript, MongoDB and EJS.

Students can register, log in, view their profile and edit their details. Admins can log in, list all students, edit a student's name, class and roll number, and delete students.

## Features

**Student** (mounted at `/`)
- Register with name, email, class, roll number and password (`GET/POST /register`). Duplicate emails are rejected.
- Log in / log out (`GET /`, `POST /login`, `GET /logout`)
- View own profile (`GET /home`)
- Edit own details, including password (`GET/POST /editUser`)

**Admin** (mounted at `/admin`)
- Log in / log out (`GET /admin`, `POST /admin/login`, `GET /admin/logout`)
- List all students (`GET /admin/home`)
- Edit a student's name, class and roll number (`GET/POST /admin/edit/:id`, where `:id` is the student's email)
- Delete a student (`GET /admin/delete/:id`)

**Common**
- Passwords hashed with bcrypt (10 salt rounds)
- Session-based auth with `express-session`; separate guards for student and admin routes
- Logged-in users are redirected away from login/register pages
- Flash messages (`connect-flash`) shown via SweetAlert2
- `nocache` plus `Cache-Control: no-store` on authenticated pages, so the back button does not show protected pages after logout

## Tech stack

- **Runtime:** Node.js, TypeScript 5
- **Server:** Express 5
- **Database:** MongoDB via Mongoose 8
- **Views:** EJS templates
- **Auth / session:** express-session, connect-flash, bcrypt
- **Frontend (loaded from CDN in the views):** Bootstrap 5, Tailwind CSS 2, Font Awesome 6, SweetAlert2
- **Dev tooling:** ts-node-dev

## Folder structure

```
.
├── public/                     Static files served at /
│   └── assets/                 Images used by the views
├── views/                      EJS templates
│   ├── admin/                  login, home, editUser
│   └── students/               login, register, home, editUser
├── src/
│   ├── server.ts               Entry point: loads env, connects DB, starts HTTP server
│   ├── app.ts                  Express app: middleware, session, view engine, routes
│   ├── config/
│   │   └── database.ts         MongoDB connection (reads DB_URL)
│   ├── modules/
│   │   ├── student/            student.{routes,controller,service,repository,model,interface}.ts
│   │   └── admin/              admin.{routes,controller,service,repository,model,interface}.ts
│   └── shared/
│       ├── middlewares/        auth.middleware.ts (route guards)
│       ├── utils/              password.util.ts (bcrypt hash/compare)
│       └── types/              session.ts (express-session typings)
├── .env.example
├── package.json
└── tsconfig.json
```

Each module follows the same layered flow: **routes → controller → service → repository → Mongoose model**. Dependencies are wired by hand in `src/app.ts`.

## Prerequisites

- Node.js and npm
- A running MongoDB instance (local or hosted)

## Setup

```bash
git clone https://github.com/CodeWith-vivek/typescript-studentManagement.git
cd typescript-studentManagement
npm install
cp .env.example .env    # then edit .env with your values
```

### Creating an admin account

There is no admin registration route. To create an admin, insert a document into the `admins` collection with `name`, `email` and a **bcrypt-hashed** `password`. Plain-text passwords will not match at login.

Generate a hash with the installed `bcrypt` package:

```bash
node -e "require('bcrypt').hash('your-password', 10).then(console.log)"
```

## Environment variables

Defined in `.env` (see `.env.example`):

| Variable         | Required | Purpose                                                              |
| ---------------- | -------- | -------------------------------------------------------------------- |
| `DB_URL`         | Yes      | MongoDB connection string. The server throws on startup if missing. |
| `PORT`           | No       | HTTP port. Defaults to `3000`.                                       |
| `SESSION_SECRET` | No       | Secret used to sign session cookies. Falls back to a hard-coded default, so set it in any real deployment. |

## Development

```bash
npm run dev
```

Runs `src/server.ts` with ts-node-dev and restarts on changes. The app is served at `http://127.0.0.1:<PORT>`.

Type-check without emitting:

```bash
npm run typecheck
```

## Build and run

```bash
npm run build   # compiles src/ to dist/ with tsc
npm start       # runs node dist/server.js
```

`views/` and `public/` are read from the project root at runtime, so they must sit next to `dist/` when you run the build.

## Tests

No tests are set up yet. `package.json` has no `test` script, and the repo has no test files.

## Deployment

The repo has no deployment config (no Dockerfile, CI workflow or platform config). To deploy manually:

1. Provide `DB_URL`, `PORT` and `SESSION_SECRET` as environment variables.
2. Run `npm install` and `npm run build`.
3. Start with `npm start`.
4. Ship `dist/`, `views/`, `public/`, `package.json` and `package-lock.json` together.

Sessions use express-session's default in-memory store. Sessions are lost on restart and are not shared across multiple instances.
