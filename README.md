# Job Application Tracker

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
![React](https://img.shields.io/badge/React-in%20progress-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack web application to track and manage job applications through every stage of a job search, from a role you have saved, to applied, to interviewing, to an offer. Built to work hands-on with a real Spring Boot, PostgreSQL, and React stack.

---

## Why this project

Managing a job search across many companies gets messy fast: which roles you applied to, which replied, which need a follow-up. This app keeps every application in one place, with its current status, key dates, and notes, so nothing slips through the cracks.

---

## Tech Stack

| Layer | Technology |
|----------|--------------------------------|
| Backend | Java 21, Spring Boot, Spring Data JPA |
| Database | PostgreSQL |
| Frontend | React *(in progress)* |
| Build | Maven |

---

## Features

- Full CRUD for job applications (create, read, update, delete)
- Status tracking through the application lifecycle: `SAVED`, `APPLIED`, `INTERVIEWING`, `OFFER`, `REJECTED`, `ACCEPTED`, `WITHDRAWN`
- Each application stores company, role, status, applied date, follow-up date, location, source, and notes
- Tables created automatically from the data model on startup

---

## API Endpoints

| Method | Endpoint | Description |
|--------|--------------------|----------------------------|
| `GET` | `/api/jobs` | List all job applications |
| `GET` | `/api/jobs/{id}` | Get a single application |
| `POST` | `/api/jobs` | Create a new application |
| `PUT` | `/api/jobs/{id}` | Update an existing application |
| `DELETE` | `/api/jobs/{id}` | Delete an application |

### Example request body

```json
{
  "company": "Mastercard",
  "role": "Software Engineer II",
  "status": "APPLIED",
  "appliedDate": "2026-06-29",
  "location": "Dublin",
  "source": "LinkedIn",
  "notes": "Tailored CV sent"
}
```

---

## Project Structure

```
job-application-tracker/
├── backend/
│   ├── src/main/java/com/abhilasha/job_tracker/
│   │   ├── JobTrackerApplication.java   # Entry point
│   │   ├── Job.java                     # Entity (one application)
│   │   ├── JobStatus.java               # Status enum
│   │   ├── JobRepository.java           # Database access
│   │   └── JobController.java           # REST endpoints
│   ├── src/main/resources/
│   │   └── application.properties       # Config (DB password via env var)
│   └── pom.xml
├── frontend/                            # React app (in progress)
├── README.md
└── LICENSE
```

---

## Running Locally

### Prerequisites
- Java 21
- Maven
- PostgreSQL

### Steps

1. **Create the database.** In PostgreSQL, create a database named `jobtracker`.

2. **Set your database password as an environment variable** (the app reads it from `DB_PASSWORD`, so it is never committed to the repo):
   ```bash
   # macOS / Linux
   export DB_PASSWORD=your_postgres_password
   ```
   ```powershell
   # Windows (PowerShell)
   $env:DB_PASSWORD="your_postgres_password"
   ```

3. **Run the backend** from the `backend` folder:
   ```bash
   ./mvnw spring-boot:run
   ```

4. The API is now live at:
   ```
   http://localhost:8080/api/jobs
   ```

---

## Roadmap

- [x] Backend REST API with full CRUD
- [x] PostgreSQL integration with auto-generated schema
- [x] Database credentials handled via environment variables
- [ ] React frontend (table view + add/edit form)
- [ ] Input validation and global error handling
- [ ] Search, filter by status, and pagination
- [ ] Unit and integration tests (JUnit, Mockito)
- [ ] Dockerized setup
- [ ] Live deployment

---

## License

This project is licensed under the [MIT License](LICENSE).
