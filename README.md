# Lavasa Connect — Full-stack city services portal

A responsive React + Express application for residents to report civic issues and administrators to process them. Includes SQLite persistence, JWT authentication, image uploads, GPS capture, dashboards, and Excel/PDF reports.

## Requirements
- Node.js 22 LTS
- npm

The server uses `better-sqlite3`, which requires a compatible native binary. Node.js 26 is not supported by the currently pinned dependency.

## Run locally (Windows / macOS / Linux)
1. Extract the ZIP and open the `lavasa-connect` folder in VS Code.
2. Open a terminal in the project root and run:
   ```bash
   npm install
   npm --prefix server install
   npm --prefix client install
   ```
3. Copy `server/.env.example` to `server/.env`. Change `JWT_SECRET` and the admin password before deployment.
4. Start both applications:
   ```bash
   npm run dev
   ```
5. Open the frontend at **http://localhost:5173**. API runs at **http://localhost:5000**.

## Demo administrator
- Email: `admin@lavasa.local`
- Password: `Admin@12345`

Change these credentials in `server/.env` before first startup / any public deployment. The database seeds the admin only when that email does not already exist.

## Resident workflow
- Register an account and sign in.
- Browse City services or select **Report an issue**.
- Choose category, enter a title and description, optionally add a photo, and use **Use my location** to capture GPS coordinates. The browser will ask for location permission; HTTPS is required outside localhost.
- Submit and track the request from **My requests**. The status shown to residents is the same status updated by the admin.

## Administrator workflow
- Sign in with the demo admin account.
- Use **Complaints** to search and filter reports, inspect uploaded photos and map coordinates, and change status to Pending, Processing, Completed or Rejected. Add an admin note to share a resolution update.
- Use **Reports** to download Excel or PDF summaries. Choose a month or leave the month empty for all records.

## API overview
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/services`
- `POST /api/complaints`, `GET /api/complaints/mine`
- `GET /api/admin/overview`, `GET /api/admin/complaints`
- `PATCH /api/admin/complaints/:id`
- `GET /api/admin/reports.xlsx?month=YYYY-MM`
- `GET /api/admin/reports.pdf?month=YYYY-MM`

All admin endpoints require a JWT for a user with the admin role. Complaint uploads accept JPEG, PNG and WebP up to 5 MB. SQLite database is created automatically at `server/lavasa.sqlite`; uploads are stored in `server/uploads` when the server is started from its directory (see note below).

## Important production checklist
This is a runnable project starter, not a production-hardened municipal deployment. Before going live: use HTTPS; set a strong secret and unique admin credentials; configure a persistent database and object storage; add email/SMS notifications; implement admin account provisioning, audit logs, backups, retention rules, CSRF/security headers and monitoring; validate image content and location data; and review privacy/legal requirements. The app currently provides GPS coordinates and a Google Maps link rather than a live map tile view.
