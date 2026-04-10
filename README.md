# Blog Platform API

A production-ready blogging platform API built with Node.js, TypeScript, Prisma and Redis. Designed to support a modern, Medium-style blog platform with real-time engagement features, built to scale to 10,000+ daily users.



## Features

- Authentication with JWT tokens and Redis-backed logout (token blacklisting)
- Posts with soft deletes, auto-generated slugs and cursor-based pagination
- Nested comments, toggleable likes and many-to-many post tagging
- Rate limiting and feed caching via Redis
- Runtime input validation via Zod on all endpoints
- Interactive API documentation via Swagger UI at `/api-docs`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js v5 |
| ORM | Prisma 7 |
| Database | PostgreSQL (Prisma Postgres) |
| Cache / Sessions | Redis (Redis Cloud) |
| Validation | Zod |
| Documentation | Swagger / OpenAPI 3.0 |

---

## Architecture

```
routes/         → endpoint definitions, middleware wiring
controllers/    → request/response handling
service/        → business logic
repository/     → database queries (Prisma)
middleware/     → auth, rate limiting, caching, validation
schemas/        → Zod validation schemas
db/             → Prisma client, Redis client
utils/          → shared utilities
docs/           → Swagger configuration
prisma/         → schema and migrations
```

The API follows a strict layered architecture — controllers never touch the database directly, services contain all business logic, and repositories are the only layer that talks to Prisma.

---

## Database Schema

- **User** — accounts with email, username, bio, avatar
- **Post** — articles with slugs, soft deletes, publish/draft states
- **Comment** — nested replies via self-relation
- **Like** — unique per user per post (composite unique constraint)
- **Tag** — many-to-many with posts via auto-generated join table

---

## Redis Usage

| Feature | Key Pattern | TTL |
|---|---|---|
| Rate limiting | `ratelimit:{ip}` | 60s |
| Post feed cache | `cache:/posts` | 60s |
| JWT blacklist | `blacklist:{token}` | Token expiry |

---

## Getting Started

```bash
git clone https://github.com/Denis-pyth/blog-api
cd blog-api
npm install
```

Create a `.env` file with the following variables:

```
DATABASE_URL=
DIRECT_URL=
REDIS_URL=
JWT_SECRET=
PORT=
```

Run migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

API documentation is available at `http://localhost:3000/api-docs`.

---

## Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Compile TypeScript
npm start        # Run compiled build
```

