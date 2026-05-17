# Posts App

A microservices system built with Node.js, MongoDB, Kafka, and Docker.

## Services
- **posts-service** — REST API for creating and fetching posts
- **notification-service** — Kafka consumer that processes post events

## How to run
```bash
docker compose up --build
```

## API Endpoints
- POST /api/posts
- GET /api/posts
- GET /api/posts/:id