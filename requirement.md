# Cinema Project Refactoring and Bug Fix Task

You are a senior full-stack engineer. Analyze the entire Cinema project and implement all required fixes.

## Goal

Make the project production-ready by:

* Resolving all merge conflicts
* Fixing backend architecture issues
* Fixing frontend integration issues
* Connecting admin pages to backend APIs
* Applying authentication and authorization correctly
* Removing duplicate code and unused structures
* Ensuring the project builds and runs successfully

---

# BACKEND TASKS

## 1. Resolve Git Merge Conflicts

Find and resolve all remaining merge conflicts.

Affected files include:

* app.js
* config/db.js
* middleware/errorhandler.js

Remove all:

# <<<<<<< HEAD

> > > > > > >

markers and keep the correct final implementation.

---

## 2. Standardize Database Connection

Current issue:

db.js contains two different approaches:

Option A:

* mysql.createPool()

Option B:

* mysql.createConnection()

Choose ONE architecture only.

Requirements:

* Use mysql2/promise
* Use connection pooling
* Export a reusable pool instance
* Move all credentials to .env

Expected variables:

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

---

## 3. Unify Route Architecture

Current issue:

* showTimeRoute.js exists separately
* auth/movie/halls routes belong to another structure

Refactor into one consistent route architecture:

/api/v1/auth
/api/v1/movies
/api/v1/halls
/api/v1/showtimes
/api/v1/dashboard

Register everything from app.js.

---

## 4. Remove Async Handler Duplication

Current issue:

* custom middleware/asyncHandler.js
* express-async-handler package

Choose ONE solution.

Preferred:

* express-async-handler

Remove unused implementation.

---

## 5. Remove Duplicate Models

Movie models:

* models/Movie.js
* models/movieModels.js

Hall models:

* models/CinemaHall.js
* models/hallsModel.js

Requirements:

* Keep only one implementation per entity
* Use repository/service architecture consistently
* Delete unused model files

---

## 6. Remove Duplicate Repositories

Current folders:

repository/
repositories/

Merge them into one structure.

Preferred:

repositories/

Ensure:

* UserRepository
* MovieRepository
* HallRepository
* ShowTimeRepository
* DashboardRepository

follow a consistent pattern.

---

## 7. Add Authentication and Authorization

Protect all admin CRUD routes.

Apply:

protect
authorize("admin")

to:

* movie routes
* hall routes
* showtime routes
* dashboard routes

Public routes should remain accessible only where intended.

---

## 8. Secure Environment Variables

Remove all hardcoded secrets.

Especially:

password: "200757gn"

Move every secret into:

.env

Add:

.env.example

---

## 9. Fix changePassword Architecture

Current issue:

changePassword bypasses repository layer.

Refactor:

Controller
→ Service
→ Repository
→ Database

No service should access DB directly.

---

# FRONTEND TASKS

## 1. Replace Mock Data

Current issue:

AppContext uses:

* mock movies
* mock halls
* mock genres

Replace all mock data with real backend API calls.

Use:

GET /movies
GET /halls
GET /genres

Create missing backend endpoints if required.

---

## 2. Unify API Base URL

Current issue:

auth/dashboard use port 3000

showtime uses port 5050

Requirements:

Use one environment variable:

VITE_API_BASE_URL

Example:

VITE_API_BASE_URL=http://localhost:3000/api/v1

Update all API services to use this variable.

---

## 3. Fix Context Providers

Current issue:

AppProvider is not mounted.

Wrap application:

<AuthProvider>
  <AppProvider>
    <App />
  </AppProvider>
</AuthProvider>

Ensure all admin pages receive context correctly.

---

## 4. Add Missing Admin Routes

Register routes for:

/admin/dashboard
/admin/movies
/admin/halls
/admin/showtimes
/admin/employees
/admin/genres

All admin pages must be accessible.

---

## 5. Protect Admin Pages

Use ProtectedRoute.

Requirements:

* User must be authenticated
* User role must be admin

Example:

<ProtectedRoute allowedRoles={["admin"]}>

Apply to all admin routes.

---

## 6. Add Authorization Header

Current issue:

Dashboard API requests do not send JWT token.

ShowTime API requests do not send JWT token.

Requirements:

Add:

Authorization: Bearer <token>

to every protected API request.

---

## 7. Remove Duplicate Components

Current duplicates:

admin/components/atoms/Badge.jsx
client/components/atoms/Badge.jsx

admin/molecules/Pagination.jsx
client/molecules/Pagination.jsx

Refactor into:

src/shared/components/

Reuse one implementation.

---

## 8. Complete Missing Features

Frontend contains:

* Employees page
* Genres page

But backend APIs do not exist.

Create:

GET /employees
POST /employees
PUT /employees/:id
DELETE /employees/:id

GET /genres
POST /genres
PUT /genres/:id
DELETE /genres/:id

Integrate frontend with these APIs.

---

# FINAL VERIFICATION

After all fixes:

1. Backend starts successfully
2. Frontend builds successfully
3. No merge conflicts remain
4. No mock data remains
5. No hardcoded secrets remain
6. Admin routes work
7. JWT authentication works
8. Authorization works
9. Movies CRUD works
10. Halls CRUD works
11. ShowTimes CRUD works
12. Genres CRUD works
13. Employees CRUD works
14. Dashboard loads real data

Finally provide:

* List of modified files
* Summary of fixes
* Remaining issues (if any)
* Suggested future improvements
