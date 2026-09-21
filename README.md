# Valoura

Valoura is a full-stack wedding marketplace for discovering vendors, checking availability, submitting booking requests, managing reservations and handling payments.

## Project structure

```text
Valoura/
├── apps/
│   ├── web/       # Next.js frontend
│   ├── api/       # Express API
│   └── worker/    # Background worker
├── packages/      # Shared packages and contracts
├── docs/          # Planning and implementation documentation
└── .github/       # GitHub templates and workflow configuration
```

## Technology stack

* Next.js and React
* TypeScript
* Tailwind CSS
* Node.js and Express
* Zod
* npm workspaces

MongoDB, Mongoose and other feature-specific dependencies will be introduced in their corresponding implementation issues.

## Prerequisites

Install the following before running Valoura:

* Node.js
* npm
* Git

Confirm they are available:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository and enter its directory:

```bash
git clone https://github.com/rohitx-dev/Valoura.git
cd Valoura
```

Install dependencies for all workspaces from the repository root:

```bash
npm install
```

## Environment setup

Create local environment files from the committed examples.

In PowerShell:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/worker/.env.example apps/worker/.env
```

The example files contain safe development placeholders. Real `.env` files must never be committed.

## Running the project

Start the web application, API and worker together from the repository root:

```bash
npm run dev
```

Development services:

| Service          | Address                                           |
| ---------------- | ------------------------------------------------- |
| Web application  | `http://localhost:3000`                           |
| API              | `http://localhost:4000`                           |
| API health check | `http://localhost:4000/health`                    |
| Worker           | Runs in the terminal and prints its ready message |

To run only one application:

```bash
npm run dev --workspace=apps/web
npm run dev --workspace=apps/api
npm run dev --workspace=apps/worker
```

## Validation commands

Run these commands from the repository root:

```bash
npm run typecheck
npm run lint
npm run build
```

* `npm run typecheck` checks TypeScript across the workspaces.
* `npm run lint` runs available lint checks.
* `npm run build` creates production builds.

## Health check

With the API running, request:

```http
GET http://localhost:4000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "valoura-api"
}
```

## Documentation

See the `docs/` directory for the MVP plan, architecture decisions, backlog and implementation workflow.

- [Development checks and API contract maintenance](docs/checks-and-api-contracts.md)