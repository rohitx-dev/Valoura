# Development Checks and API Contract Maintenance

V-03 · Place this file at `docs/checks-and-api-contracts.md`.

## Run checks locally

Run commands from the repository root (`D:\Projects\Valoura` on the current development machine).

Use the Node.js version configured in `.github/workflows/ci.yml` (the initial workflow uses Node 22). Keep the npm version consistent with the project's working setup and retain the root `package-lock.json`.

For a fresh checkout or to reproduce the locked dependency installation:

```powershell
npm ci
```

Then run each check and inspect its exit status/output:

```powershell
npm run lint
npm run typecheck
npm run build
```

| Root command | Responsibility |
| --- | --- |
| `npm run lint` | Run workspace ESLint checks; warnings fail under `--max-warnings=0` |
| `npm run typecheck` | Run workspace TypeScript checks; web first generates Next.js route types |
| `npm run build` | Produce the Next.js build and compiled API/worker output |

These scripts use `--workspaces` without `--if-present`. API, web and worker must each provide all three scripts. Add appropriate scripts when registering a contracts or other code workspace. If shared packages later require compilation before their consumers, explicitly arrange dependency build order; do not assume workspace iteration is dependency-aware.

For focused troubleshooting, run the affected workspace check, for example:

```powershell
npm run lint --workspace=apps/api
npm run typecheck --workspace=apps/web
npm run build --workspace=apps/worker
```

After fixing a problem, rerun the full root checks before submitting the PR. Do not suppress a failure by removing a workspace or restoring `--if-present`.

API and worker use `eslint src --max-warnings=0`, allowing discovery of the root `eslint.config.mjs`. Web uses its own Next.js ESLint configuration. Do not add an explicit `--config` to the backend scripts without also checking how file patterns resolve from each workspace.

If dependencies change, use `npm install` to update the manifest and lockfile together. Commit both. Keep generated output such as `dist/`, `.next/` and `node_modules/` out of Git. Use documented local environment configuration where needed; never commit real `.env` files or secrets.

## GitHub Actions

The workflow at `.github/workflows/ci.yml` runs on pull requests targeting `main` and pushes to `main`, including merges. New commits pushed to an open PR trigger another run.

The `Lint, typecheck and build` job installs with `npm ci`, then runs the three root checks in order. A failing step prevents later steps from running normally. CI does not start the development servers or deploy the application.

Inspect the PR's **Checks** tab or repository **Actions** tab. Read the first failing step, fix its cause on the same branch, verify locally, commit and push. Confirm the run for the latest PR commit succeeds before merging. A passing run for an older commit is not evidence for later code changes.

Running CI does not by itself enforce branch protection; required-check settings are configured separately in GitHub.

## Contract ownership

| File or location | Responsibility |
| --- | --- |
| [DTO/schema conventions](dto-schema-conventions.md) | Naming, organization, parsing and serialization rules |
| [OpenAPI starter](openapi.yaml) | Machine-readable HTTP contract for documented operations |
| `packages/contracts/src/` | Shared request schemas and public DTOs as feature contracts are implemented |
| `apps/api/src/lib/parse-request.ts` | Convert request-validation failures into safe application errors |
| `apps/api/src/lib/app-error.ts` | Expected error status, code, message and field details |
| `apps/api/src/middleware/error-handler.ts` | Centralized error response serialization |
| `apps/api/src/modules/` | Feature implementation and private persistence models as added |

The starter documents `GET /health`. Its existing success body is exactly:

```json
{"status":"ok","service":"valoura-api"}
```

This is a liveness check, not a database or provider readiness check. It is outside the planned `/api/v1` feature prefix and does not use a `data` envelope. Do not claim planned feature routes are implemented by adding them to the starter without implementation.

## Maintain a contract when changing an endpoint

1. Review the relevant product/API requirements and DTO conventions. Agree on the method, path, access rules, inputs, response shape and status codes.
2. Define or update request Zod schemas and derive their DTO types. Separate body, params, query and selected headers. Pass parsed input to services; preserve server-side business and authorization checks.
3. Update response DTOs and explicit response mapping. Return only allowed fields. Keep database models private and serialize IDs/dates/money according to the conventions.
4. Update `docs/openapi.yaml` in the same PR: path, unique operation ID, parameters, request body, required/optional/nullable fields, response codes, headers and examples. Reuse components through `$ref`.
5. Update affected callers, fixtures and relevant behavior checks. Document deliberate changes to the human-readable API guide in the same PR.
6. Validate the OpenAPI document and compare examples with actual responses. In particular, document query values as their wire input, even when the parser converts them internally.
7. Run root checks and record results in the PR. Identify any compatibility impact and the plan for updating consumers.

A field removal/rename, newly required input, changed type, tightened validation or changed error code can break callers. Review those changes explicitly. Adding optional data still requires checking strict response validators. Avoid silently changing a published contract.

## Shared error contract

Every JSON error response uses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted fields.",
    "fields": {"body.name": ["Invalid value."]},
    "requestId": "4e5d4f65-1f9a-49ca-8015-cd9f42606503"
  }
}
```

`fields` is `Record<string, string[]>`. Keys start with `body`, `query`, `params` or `headers`; nested paths use dots. Object-level issues use the location itself. Errors without field details use `{}`. The body request ID matches the `X-Request-Id` response header.

| Condition | HTTP status | Code |
| --- | --- | --- |
| Malformed JSON | 400 | `INVALID_JSON` |
| Unknown route | 404 | `NOT_FOUND` |
| Expected domain conflict | 409 | Feature-specific stable code |
| Request body too large | 413 | `PAYLOAD_TOO_LARGE` |
| Unsupported request encoding | 415 | `UNSUPPORTED_ENCODING` |
| Request schema validation failure | 422 | `VALIDATION_ERROR` |
| Unexpected server error | 500 | `INTERNAL_SERVER_ERROR` |

Use `AppError` only with safe public messages. Never pass a raw database/provider error message into it. Unexpected failures return the generic message `Something went wrong. Please try again later.` without stack traces, submitted secret values or internal error properties. A server response-validation bug is a server failure, not a client 422.

Preserve middleware order: request ID, JSON parser, routes, not-found handler, error handler. Remove temporary diagnostic routes and unused imports after manual testing.

## Validate OpenAPI and API behavior

The current CI checks lint, types and builds. It does not yet run an OpenAPI validator or HTTP contract tests. Passing CI alone does not prove the specification matches runtime behavior.

One standalone validation option uses Python in an isolated environment. From the repository root on Windows:

```powershell
py -m venv .venv-openapi
.\.venv-openapi\Scripts\python.exe -m pip install openapi-spec-validator
.\.venv-openapi\Scripts\python.exe -m openapi_spec_validator docs/openapi.yaml
```

Keep `.venv-openapi/` out of Git. This optional validator checks specification structure/references; it does not contact the API or prove example/runtime conformance. If validation later becomes a CI gate, pin its dependency version in the repository.

Start the API in a separate terminal:

```powershell
npm run dev --workspace=apps/api
```

The current local API uses port 4000. Substitute your configured port if changed:

```powershell
curl.exe -i http://localhost:4000/health
curl.exe -i http://localhost:4000/api/v1/does-not-exist
curl.exe -i -X POST http://localhost:4000/health -H "Content-Type: application/json" --data-binary '{'
```

Expect health 200, unknown route 404 and malformed JSON 400. For a validated endpoint, send well-formed JSON that violates its schema and verify 422. Verify an unexpected failure through an isolated test or a temporary local-only diagnostic route, then remove that route. Check the status, error shape, matching request IDs and absence of sensitive content.

## PR completion checklist

- [ ] Root lint, typecheck and build pass locally.
- [ ] CI passes for the latest PR commit.
- [ ] Schemas, DTOs, implementation and OpenAPI agree for changed endpoints.
- [ ] OpenAPI validation passes after specification changes.
- [ ] Applicable success/error paths were checked and evidence recorded.
- [ ] Temporary routes, secrets and generated output are excluded.
- [ ] Contract compatibility changes and known limitations are documented.

For V-03, local and CI success has been reported by the developer. Record the actual CI run link and tested commit in the PR; do not substitute this statement for run evidence. Keep the issue open until its acceptance criteria are satisfied and the PR is merged.
