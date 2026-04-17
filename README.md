# Photography CMS — Java + React

A full-stack Photography Portfolio Management System.

## Project Structure

```
photography_java/
├── src/                        ← Spring Boot backend (Java 17)
│   └── main/java/com/photography/cms/
│       ├── config/             ← SecurityConfig, WebConfig
│       ├── controller/         ← 12 REST controllers
│       ├── dto/                ← LoginRequest, AuthResponse, RefreshRequest
│       ├── entity/             ← 10 JPA entities
│       ├── exception/          ← GlobalExceptionHandler
│       ├── repository/         ← 10 Spring Data JPA repositories
│       ├── security/           ← JWT filter, token provider, UserDetailsService
│       └── service/            ← 12 business logic services
├── frontend/                   ← React 18 + Vite frontend
│   └── src/
│       ├── api/                ← Axios instance + React Query hooks
│       ├── components/         ← HeroSlider, PortfolioGrid, BlogCard, etc.
│       └── pages/              ← Home, About, Blog, Portfolio, Contact, Pricing
├── uploads/                    ← Uploaded images (served at /uploads/**)
├── pom.xml                     ← Maven dependencies
├── start.sh                    ← Start both servers with one command
└── README.md
```

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Language  | Java 21 / JavaScript (ES2022)           |
| Backend   | Spring Boot 3.2.5                       |
| Frontend  | React 18, Vite 4, Bootstrap 5           |
| Database  | PostgreSQL                              |
| ORM       | Spring Data JPA + Hibernate 6           |
| Security  | Spring Security + JWT (jjwt 0.11.5)     |
| HTTP      | Axios + TanStack React Query            |
| Forms     | React Hook Form                         |
| Build     | Maven (backend), npm (frontend)         |

## Prerequisites

- Java 21+
- Maven 3.x
- Node.js 20+
- PostgreSQL running on port 5432

## Database Setup

```bash
sudo -u postgres psql
CREATE DATABASE photography_cms;
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

## Run (Both Together)

```bash
chmod +x start.sh
./start.sh
```

## Run (Separately)

**Backend:**
```bash
mvn spring-boot:run
# http://localhost:8080
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

## API Endpoints

| Method | Endpoint              | Access  |
|--------|-----------------------|---------|
| POST   | /api/auth/token       | Public  |
| POST   | /api/auth/token/refresh | Public |
| GET    | /api/sliders          | Public  |
| GET    | /api/portfolios       | Public  |
| GET    | /api/blogs            | Public  |
| GET    | /api/services         | Public  |
| GET    | /api/testimonials     | Public  |
| GET    | /api/membership       | Public  |
| GET    | /api/instagram        | Public  |
| GET    | /api/about            | Public  |
| POST   | /api/contacts         | Public  |
| POST   | /api/users            | Public (bootstrap) |
| *      | /api/**               | ROLE_ADMIN |
| GET    | /health               | Public  |

## First Time Setup

```bash
# 1. Create admin user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"yourpassword","isAdmin":true}'

# 2. Get JWT token
curl -X POST http://localhost:8080/api/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'

# 3. Use token on admin endpoints
curl http://localhost:8080/api/users \
  -H "Authorization: Bearer <accessToken>"
```
