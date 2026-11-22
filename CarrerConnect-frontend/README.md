# HireFlow React Frontend

Modern React + Vite frontend for a Java/Spring Boot + MySQL job portal.

## Tech
- React + Vite
- React Router
- Axios
- React Hook Form
- React Toastify
- Lucide React
- Recharts
- CSS design system (no utility framework required)

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL, normally http://localhost:5173.

## Backend integration

Copy `.env.example` to `.env` and set:

VITE_API_URL=http://localhost:8080/api

Suggested Spring Boot endpoints:

POST `/api/auth/login`
POST `/api/auth/register`

GET `/api/jobs`
GET `/api/jobs/{id}`
POST `/api/jobs`
PUT `/api/jobs/{id}`
DELETE `/api/jobs/{id}`

POST `/api/applications`
GET `/api/applications/my`
GET `/api/jobs/{jobId}/applications`
PUT `/api/applications/{id}/status`

The current UI uses mock data so it can run immediately. Service files are already prepared for Axios API integration. Replace mock calls page-by-page once your Spring Boot endpoints are available.

For production authentication, use your backend session/JWT and secure authorization checks; the demo registration/login in this package stores a local demo user only.
