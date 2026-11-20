# Professional development prompt — Lavasa Connect

Act as a senior full-stack engineer and UI/UX designer. Design and build **Lavasa Connect**, a production-minded, responsive city services and civic issue reporting web application for Lavasa, India.

## Product goal
Residents must be able to discover city services, submit civic problems with a description, photograph and GPS location, and follow progress. Administrators must receive those reports, review evidence and location, manage work status, and generate monthly Excel and PDF reports. Both dashboards must read the same persisted complaint record so status updates are consistent everywhere.

## User roles and authentication
- Resident: self-registration, login, logout, profile identity and resident-only complaint access.
- Administrator: protected administrator login and role-based access to operations and reports.
- Hash passwords; use signed expiring sessions/tokens; validate input on the server; never trust a client-supplied role.
- Provide useful validation, loading, empty, success and error states.

## Resident experience
- Premium, calm, civic-focused interface with responsive desktop, tablet and mobile layouts.
- Landing/dashboard with service shortcuts and request summary cards.
- Service directory: Water Supply, Roads & Potholes, Waste Management, Street Lights, Drainage & Sewage, Parks & Public Spaces, Electricity and Other.
- Report form: category, short title, detailed description, address/landmark, GPS capture through browser Geolocation API, and optional image attachment.
- Show a clear permission explanation and manual location fallback if GPS is unavailable or denied.
- Validate image type and size; show selected image filename/preview.
- My Requests page with request ID, category, submitted date, location and synchronized status: Pending, Processing, Completed or Rejected.
- Request detail view with administrator update/resolution note.

## Administrator experience
- Protected admin dashboard with totals for all, pending, processing and completed requests.
- Visual analytics for monthly trends, service categories and status distribution.
- Search and filter by status, resident, category and month.
- Complaint detail view with resident details, description, photo, GPS coordinates and map link.
- Change status, set priority and add an update visible to the resident.
- Keep a timestamp for submission and every status update; preserve an audit trail in a production implementation.

## Reports
- Monthly report selection.
- Excel export with complaint ID, service, title, description, location, status, priority, submission/update timestamps and resident details.
- PDF summary with reporting period, total and status counts, and complaint details.
- Support all-time exports when no month is selected.

## Technical architecture
- Frontend: React + Vite, responsive component styling, accessible controls, Lucide icons, Recharts analytics.
- Backend: Node.js + Express REST API.
- Database: SQLite for local development; keep data access modular so PostgreSQL can replace it for deployment.
- Authentication: bcrypt password hashing and JWT authorization middleware.
- Uploads: Multer with server-side file validation and size limits; use object storage in production.
- Reports: ExcelJS and PDFKit.
- Use environment variables for secrets, ports, CORS origin and administrator bootstrap credentials.
- Keep user and administrator endpoints separate; residents can only access their own complaints; only admins can list all complaints, update status or export reports.

## UI direction
Use a modern municipal SaaS visual language: deep navy/teal brand, warm white surfaces, restrained accent colors, subtle borders, rounded cards, generous spacing, readable typography and clear status chips. Avoid clutter, oversized gradients and excessive animation. Provide consistent navigation, breadcrumbs, responsive sidebar, accessible contrast and clear action hierarchy.

## Acceptance criteria
1. A resident can register and log in.
2. A resident can submit a complaint with an optional image and location.
3. The complaint is persisted and visible in the resident's request list.
4. An admin can log in and see all resident complaints.
5. Admin status changes are persisted and reflected in the resident dashboard after refresh.
6. Admin can filter/search complaints and view evidence/location.
7. Admin can export month-filtered Excel and PDF reports.
8. Unauthorized users cannot call admin APIs or access another resident's requests.
9. The application runs locally using the documented commands and includes a seeded development admin account whose credentials must be changed before deployment.
