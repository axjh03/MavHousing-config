# MavHousing

## Overview

**Team:** The Builders Squad  
A comprehensive housing management platform for UTA's MavHousing, built with a **NestJS monorepo** backend and a **Next.js** student/admin portal — managing everything from applications and leasing to maintenance, payments, and automated communications.

## Technology Stack

### Core Infrastructure
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend Architecture**: [NestJS](https://nestjs.com/) (Enterprise-grade monorepo design)
- **Frontend Architecture**: [Next.js](https://nextjs.org/) (App Router, React, TailwindCSS)
- **Component UI**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)

### Data & Persistence
- **Relational Hub**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Document Store**: [MongoDB Atlas](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Object Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (Distributed S3-compatible storage)
- **Caching & Job Queue**: [Redis](https://redis.io/) via [BullMQ](https://docs.bullmq.io/)

### Intelligence & Services
- **AI/ML Engine**: [Google Gemini 2.5](https://deepmind.google/technologies/gemini/) (Intelligent OCR & Document Analysis)
- **Computer Vision**: `face-api.js` (Client-side localized image processing)
- **Email Delivery**: [Resend](https://resend.com/) (High-deliverability transactional engine)
- **API Documentation**: [Swagger/OpenAPI](https://swagger.io/) (Automated via `@nestjs/swagger`)

---

## Prerequisites

Ensure your development environment meets the following specifications before initializing the platform:

### Runtime & Tooling
- **[Node.js](https://nodejs.org/)**: Version 18.x or higher (LTS stable recommended).
- **[npm](https://www.npmjs.com/)**: Version 9.x or higher.
- **[Git](https://git-scm.com/)**: Required for repository cloning and version management.

### Data & Background Persistence
- **[PostgreSQL](https://www.postgresql.org/)**: v14.0+ (Required for primary relational data).
- **[Redis](https://redis.io/)**: v6.2+ (Essential for **BullMQ** job handling and caching).
- **[MongoDB](https://www.mongodb.com/)**: v5.0+ (Required for flexible document-based chat storage).

### External API Connectivity
Functional credentials and secure tokens are required to enable the following integrations:
- **Google Gemini (AI & Vision)**: Powers the Intelligent OCR engine for automated student ID verification and application parsing.
- **Cloudflare R2 (Object Storage)**: Provides globally distributed, S3-compatible storage for user-uploaded media, maintenance attachments, and generated PDF reports.
- **Resend (Communications)**: High-performance transactional email delivery engine for administrative reports and system notifications.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:axjh03/MavHousing-config.git
cd MavHousing-config
```

### 2. Install Dependencies
Dependencies must be installed in both the root directory (for backend services) and the `apps/web` directory (for the Next.js frontend). You must run `npm install` in both places:

```bash
# 1. Install root dependencies
npm install

# 2. Install web application dependencies
cd apps/web
npm install
cd ../..
```

### 3. Configure Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Your `.env` file must be configured with following secure keys:

| Category | Variable | Description |
| :--- | :--- | :--- |
| **Auth** | `JWT_SECRET` | 256-bit key for securing stateless API tokens. |
| **Databases** | `SQL_DATABASE_URL` | PostgreSQL connection string for Prisma. |
| | `MONGO_URI` | MongoDB Atlas cluster connection string. |
| **Jobs** | `REDIS_HOST` | Hostname for BullMQ/Redis (Default: localhost). |
| | `REDIS_PORT` | Port for BullMQ/Redis (Default: 6379). |
| **Communication** | `RESEND_API` | Transactional email key for report delivery. |
| | `WEBHOOK_PROXY_URL` | Smee.io proxy URL for Resend Webhooks. |
| **AI/Storage** | `GEMINI_API_KEY` | Google Gemini key for intelligent OCR systems. |
| | `R2_ACCESS_KEY_ID` | Cloudflare R2 Access ID. |
| | `R2_SECRET_ACCESS_KEY` | Cloudflare R2 Secret Key. |
| | `R2_BUCKET_NAME` | Main media bucket name. |
| | `R2_ENDPOINT` | Cloudflare Distributed Endpoint URL. |


#### **Resend Webhooks (Local Development)**
To receive incoming emails locally, you must configure a proxy using [smee.io](https://smee.io/).
1. Visit [smee.io](https://smee.io/) and click "Start a new channel".
2. Copy the generated Webhook Proxy URL and update the `WEBHOOK_PROXY_URL` variable in your `.env` file.
3. In your Resend dashboard, add a new webhook pointing to your smee.io URL and configure it to listen for the `email.received` event.

### 4. Set Up the Database

First, make sure PostgreSQL is running and you have created a database (e.g. `mavhousing`).

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Seed the database with mock data:

```bash
npm run seed
```

#### **Quick Reset/Reseed**
To quickly reset the database, apply all migrations, and re-seed in one command, you can use the provided utility script:
```bash
./prisma/prismaReset.sh
```

### 5. Run the Application

To start all backend microservices simultaneously, use the provided script:

```bash
./run-all.sh
```

Alternatively, you can run the primary API service:

```bash
npm run start:dev internal-api
```

> **Note:** Running `internal-api` will start all configured services together since they are wired in the monorepo.

---

## Project Structure

```
mav-housing-config/
├── apps/                        # Microservice applications
│   ├── auth-server/             # Authentication & authorization (JWT, RBAC)
│   ├── comms-server/            # Communications (Email via Resend)
│   ├── internal-api/            # Core API (Applications, Leases, Maintenance, Payments)
│   └── web/                     # Student & Admin frontend application (Next.js)
├── common/                      # Shared utilities & validators
├── libs/                        # Shared libraries
│   ├── auth/                    # Auth helpers
│   ├── common/                  # Common utilities
│   ├── config/                  # Configuration module
│   ├── contracts/               # Shared interfaces & contracts
│   ├── db/                      # Database module (Prisma service)
│   ├── graphql/                 # GraphQL module
│   └── messaging/               # Messaging module
├── prisma/                      # Database configuration & seeding
│   ├── schema.prisma            # Primary data models & relations
│   ├── seed.ts                  # Mock data generation script
│   ├── prismaReset.sh           # One-click DB reset & re-seed utility
│   └── migrations/              # Version-controlled DB schema changes
├── docs/                        # Technical documentation & project requirements
├── generated/                   # Local Prisma client build artifacts
├── mock_db/                     # Local persistence & research snapshots
├── product_screenshots/         # UI previews & branding assets
├── .env.example                 # Master environment variable template
├── nest-cli.json                # NestJS monorepo workspace config
├── package.json                 # Project-wide dependencies & global scripts
└── tsconfig.json                # Base TypeScript compiler settings
```

---

## Microservices

| Service          | Port   | Swagger UI                                      | Description                                            |
| ---------------- | ------ | ----------------------------------------------- | ------------------------------------------------------ |
| **auth-server**  | `3004` | [localhost:3004/api](http://localhost:3004/api) | Authentication, JWT, user management, RBAC             |
| **comms-server** | `3000` | [localhost:3000/api](http://localhost:3000/api) | Email (Resend) notifications            |
| **internal-api** | `3009` | [localhost:3009/api](http://localhost:3009/api) | Core API — applications, leases, maintenance, payments |

Run any individual service:

```bash
npm run start:dev <service-name>
```

Example:

```bash
npm run start:dev auth-server
```

---

## Core Architecture

### 1. Monorepo & Service Design
MavHousing is architected as a **NestJS Monorepo**, ensuring consistency across multiple specialized microservices:
- **`auth-server`**: Single point of entry for user authentication, password management, and permission logic.
- **`comms-server`**: Decoupled notification service handling the complexities of Resend (Email) delivery.
- **`internal-api`**: The operational hub managing core business entities (Leases, Maintenance, Payments).

### 2. Dual-Database Strategy
- **Relational Hub (PostgreSQL + Prisma)**: All mission-critical, high-integrity data (Financials, Lease Contracts, User Roles) resides in Postgres.
- **Real-Time Layer (MongoDB + Mongoose)**: High-velocity data like chat messages and maintenance comments are stored as flexible documents to support features like media attachments and rich content.

### 3. Background Processing (BullMQ)
The system offloads heavy computations—such as generating high-fidelity PDF reports—from the main request/response cycle to background workers via **Redis**. This ensures the student dashboard remains fast even during heavy reporting periods.

### 4. Shared Libraries (`libs/`)
- **`db`**: Unified Prisma service injected across all Postgres-dependent apps.
- **`contracts`**: Shared TypeScript interfaces ensuring strict typing between frontend and backend.
- **`auth`**: Common guards and strategies for consistent RBAC enforcement.


---

## Database Operations

| Command                                | Description                                        |
| -------------------------------------- | -------------------------------------------------- |
| `npx prisma generate`                  | Regenerate the Prisma client                       |
| `npx prisma migrate dev --name <name>` | Create & apply a new migration                     |
| `npx prisma migrate reset`             | **Reset the database** (drops all data & re-seeds) |
| `npx prisma studio`                    | Open Prisma Studio (visual DB browser)             |
| `npx prisma db push`                   | Push schema changes without creating a migration   |

---

---

## Background Jobs (BullMQ)

MavHousing uses **BullMQ** for handling long-running or asynchronous background tasks.

### 1. Prerequisites
- **Redis**: Ensure Redis is installed and running on your machine.
  ```bash
  redis-server
  ```
- **Configuration**: Ensure your `.env` has the correct Redis credentials:
  ```env
  REDIS_HOST=localhost
  REDIS_PORT=6379
  ```

### BullMQ & Background Jobs
MavHousing uses **BullMQ** for background task processing (PDF generation, reporting, etc.).

#### **Monitoring & Manual Triggering**
The **Bull Board** interface is available at `/queues`. You can monitor job statuses and **manually trigger** work by clicking **"Add Job"** and providing the **JSON Payload** specified in the table below.

| Queue Name | Processor | Purpose | Expected JSON Payload for Bull Board |
| :--- | :--- | :--- | :--- |
| **`property-reports`** | `PropertyReportProcessor` | Generates a roster of assigned residents. | `{}` |
| **`lease-reports`** | `LeaseReportProcessor` | Master landscape ledger of all leases. | `{}` |
| **`finance-reports`** | `FinanceReportProcessor` | Payment summary and student audits. | **All Payments**: `{}` <br> **Specific Student**: `{"netId": "abc1234"}` <br> **Sorted by Name**: `{"sortBy": "person"}` |
| **`occupancy-report`** | `OccupancyReportProcessor` | Monthly occupancy & vacancy percentages. | `{"type": "AUTOMATED"}` |
| **`hello-world`** | `HelloWorldProcessor` | System health check (logs to console). | `{"message": "Hello!"}` |

---

#### **Automated Job Schedule**
All administrative reports are automatically scheduled via `OnModuleInit` to run at **midnight on the 1st of every month**.

---

## API Documentation

Each microservice exposes a **Swagger UI** at the `/api` endpoint:

- **Auth Server:** [http://localhost:3004/api](http://localhost:3004/api)
- **Comms Server:** [http://localhost:3000/api](http://localhost:3000/api)
- **Internal API:** [http://localhost:3009/api](http://localhost:3009/api)

The Swagger UI provides interactive API documentation where you can test endpoints directly.

---

## License

This project is **UNLICENSED** — proprietary and for internal use only.
