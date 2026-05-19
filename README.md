# Posts & Notification Microservices

A backend system built with Node.js, MongoDB, Apache Kafka, and Docker — deployed on AWS. Demonstrates event-driven architecture, clean DDD layering, and production-ready patterns across two independent services.

---

## Architecture Overview

```
┌─────────────────┐        ┌─────────────┐        ┌──────────────────────┐
│   REST Client   │──────▶ │    Nginx    │──────▶ │    Posts Service     │
└─────────────────┘        │ (API Gateway)│        │   Express + MongoDB  │
                           └─────────────┘        └──────────┬───────────┘
                                                             │
                                                     publishes event
                                                             │
                                                             ▼
                                                    ┌────────────────┐
                                                    │     Kafka      │
                                                    │  post.created  │
                                                    └───────┬────────┘
                                                            │
                                                    consumes event
                                                            │
                                                            ▼
                                                  ┌─────────────────────┐
                                                  │ Notification Service │
                                                  │  Consumer + MongoDB  │
                                                  └─────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22 |
| Framework | Express 5 |
| Database | MongoDB 7 (Mongoose) |
| Messaging | Apache Kafka 4 (KRaft Mode) |
| Compression | Snappy via kafkajs-snappy |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| Deployment | AWS EC2 (Free Tier) |

---

## Services

### Posts Service
REST API for managing posts. On every post creation, publishes an event to Kafka.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/posts` | Create a post |
| GET | `/api/posts` | List all posts |
| GET | `/api/posts/:id` | Get post by ID |

### Notification Service
Kafka consumer. Listens for post events and saves a notification record to its own MongoDB database.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notification/healthy` | Service health check |

> **Local:** Posts service runs on port 3000, Notification on port 4000.
> **Production (AWS):** No ports exposed directly — all traffic goes through Nginx on port 80.

---

## Project Structure

```
├── shared/                        # Shared event contract (producer + consumer)
├── posts-service/
│   └── src/
│       ├── domain/                # Entities, errors, repository interfaces, event definitions
│       ├── application/usecases/  # CreatePost, GetPost, ListPosts
│       ├── infrastructure/        # MongoDB + Kafka implementations
│       ├── api/                   # Controllers, routes, middlewares
│       └── container/             # Dependency wiring
├── notification-service/
│   └── src/
│       ├── application/usecases/  # ProcessPostCreated
│       ├── infrastructure/        # MongoDB + Kafka consumer
│       ├── api/                   # Health controller
│       └── container/             # Dependency wiring
└── docker-compose.yml
```

> Notification service has no domain layer — it has no domain logic worth isolating. Folders reflect what actually exists, not ceremony.

---

## Key Design Decisions

### DDD Layering + Dependency Injection
Each layer has a single responsibility — domain knows nothing about Express or Kafka, use cases know nothing about MongoDB. All dependencies are wired in a central container through constructor injection. Swapping any implementation requires touching one file.

### Database Per Service
Posts service owns `postsdb`. Notification service owns `notificationsdb`. Same Mongo instance physically, fully isolated logically.

### Shared Event Contract
A local shared package defines the event schema used by both services. Producer validates before publishing, consumer validates before processing — single source of truth, no silent drift.

### Kafka Producer
- **Idempotent** — retries on network failure without duplicating messages on the broker
- **Concurrent request cap** — limits in-flight requests to maintain ordering guarantees alongside idempotency
- **Snappy compression** — messages compressed before sending, less network overhead and broker storage

### Kafka Consumer
- **Manual offset commit** — offset only committed after successful processing, no silent data loss on crash
- **Idempotent handler** — checks for existing notification before saving, safe against Kafka's at-least-once redelivery
- **3 partitions, replication factor 1** — allows parallel scaling, appropriate for single-broker setup

### Nginx as Single Entry Point
In production no service port is exposed to the internet. All traffic enters through Nginx, routed by path. One public-facing point, one place to extend with auth or rate limiting later.

---

## Running the App

### Prerequisites
- Docker + Docker Compose
- `.env.production` file in each service (see `.env.example`)

### Development
```bash
docker compose --env-file .env.production up -d --build
```

### Production
```bash
docker compose --env-file .env.production \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  up -d --build
```

---

## Deployment — AWS EC2

### Infrastructure
- VPC `10.0.0.0/24` with a single public subnet `10.0.0.0/28`
- Internet Gateway attached, route table sends `0.0.0.0/0` to IGW
- Ubuntu EC2 instance (Free Tier), Docker + Docker Compose installed

### Security Groups

| Port | Protocol | Source | Reason |
|---|---|---|---|
| 80 | HTTP | `0.0.0.0/0` | Public API access through Nginx — the only intended entry point |
| 22 | SSH | My IP only | Remote access locked to a single IP, not exposed publicly |
| 8080 | TCP | `0.0.0.0/0` | Kafka UI — open for showcase purposes only, should be restricted post-demo |

No service ports (MongoDB, Kafka, Express) are exposed to the internet. Everything runs inside Docker networks and is only reachable through Nginx on port 80.

---

## Kafka UI

Inspect topics, partitions, consumer groups, and live message flow at:
```
http://<your-ip>:8080
```