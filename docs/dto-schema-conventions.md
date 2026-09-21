# Valoura — DTO and Zod Schema Conventions

Backlog: V-03 · Task 1 · Intended repository path: `docs/dto-schema-conventions.md`

## 1. Purpose and scope

A DTO (Data Transfer Object) describes data exchanged through the API. A request DTO describes accepted input; a response DTO describes returned JSON. A Zod schema validates data at runtime. TypeScript types alone do not validate incoming requests.

This document defines project conventions. It does not implement endpoints, error middleware, OpenAPI or CI. Those remain separate V-03 tasks. The current Valoura MVP guide, especially sections 04, 06 and 07, governs business rules and API shapes.

## 2. Ownership and organization

Shared contracts live in `packages/contracts/src/`, organized by feature. Create files when their feature needs them; this document does not require scaffolding every module now.

| Path relative to repository root | Responsibility |
| --- | --- |
| `packages/contracts/src/common/primitives.schema.ts` | Shared identifier, date and money validators |
| `packages/contracts/src/common/api.dto.ts` | Success envelope, pagination and error DTOs |
| `packages/contracts/src/auth/register.schema.ts` | Registration request schema and inferred request types |
| `packages/contracts/src/auth/login.schema.ts` | Login request schema and inferred request types |
| `packages/contracts/src/auth/auth.dto.ts` | Authentication response DTOs |
| `packages/contracts/src/users/user.dto.ts` | Safe user representation |
| `packages/contracts/src/vendors/list-vendors.schema.ts` | Vendor filter and pagination query schema |
| `packages/contracts/src/vendors/vendor.dto.ts` | Public vendor card/detail DTOs |
| `packages/contracts/src/bookings/create-booking.schema.ts` | Booking creation request schema and inferred types |
| `packages/contracts/src/bookings/booking.dto.ts` | Booking response DTOs |
| `packages/contracts/src/index.ts` | Deliberate public exports |
| `apps/api/src/modules/<feature>/` | Controllers, services, private models and response mappers |

Shared contracts must remain browser-safe: no Express, Mongoose, database access, environment secrets or imports from `apps/*`. API-only provider/job validation stays in its owning server module. A web-only form schema may add UI fields such as `confirmPassword`; it must reuse relevant shared rules and remove UI-only fields before submission.

Dependency direction: web/API may import contracts; contracts must not import web/API. Use the contracts workspace's declared package name when package exports are configured. Avoid cross-app relative imports and deep imports into private files. Use `import type` for DTO-only imports.

## 3. Naming conventions

| Item | Convention | Example |
| --- | --- | --- |
| File | kebab-case with responsibility suffix | `create-booking.schema.ts`, `booking.dto.ts` |
| Request body schema | camelCase + `BodySchema` | `createBookingBodySchema` |
| Route parameter schema | camelCase + `ParamsSchema` | `getBookingParamsSchema` |
| Query schema | camelCase + `QuerySchema` | `listVendorsQuerySchema` |
| Selected header schema | camelCase + `HeadersSchema` | `createBookingHeadersSchema` |
| Parsed request DTO | PascalCase + location + `Dto` | `CreateBookingBodyDto`, `ListVendorsQueryDto` |
| Pre-parse input type, when needed | PascalCase + location + `Input` | `ListVendorsQueryInput` |
| Reusable returned resource | PascalCase + `Dto` | `UserDto`, `VendorCardDto` |
| Complete endpoint response | PascalCase + `ResponseDto` | `RegisterResponseDto` |
| Optional runtime response schema | camelCase + `ResponseSchema` | `registerResponseSchema` |
| API response mapper | `to` + DTO name | `toUserDto` |

Prefer operation-specific names over `schema.ts`, `data.ts` or a single all-purpose `UserSchema`. Keep body, query, params and headers distinct so their validation rules and error paths remain clear.

## 4. Types and runtime validation

Define request schemas first. Derive parsed request DTOs using `z.output<typeof schema>` (equivalent to `z.infer`); do not manually repeat their fields in an interface. Use `z.input<typeof schema>` for pre-parse values when normalization, defaults or transformations make the distinction relevant. Untrusted HTTP input remains untrusted until parsed. See [Zod basic usage](https://zod.dev/basics).

Response-only DTOs may be TypeScript types. If a runtime response schema is introduced, infer its type instead of maintaining a second definition. Response DTO names describe serialized JSON, not database documents.

The example below uses Zod 4 syntax. Check the repository's installed version before implementing it; Task 1 does not require a dependency upgrade.

```ts
// packages/contracts/src/auth/register.schema.ts
import { z } from "zod";

export const registerBodySchema = z.strictObject({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(12).max(128),
  role: z.enum(["customer", "vendor"]),
});

export type RegisterBodyDto = z.output<typeof registerBodySchema>;
export type RegisterBodyInput = z.input<typeof registerBodySchema>;
```

This allows only customer/vendor registration, normalizes email and preserves password whitespace. Strict objects reject unknown properties. Zod's schema operations are documented in its [API reference](https://zod.dev/api).

## 5. Validation rules

- Validate every applicable body, query and parameter on the server before calling a service. Frontend validation provides feedback but cannot replace server validation.
- Use parsed output from `parse`/`safeParse`; never validate and then pass the original raw request to a service. Do not use a type assertion to bypass parsing.
- Reject unknown writable body properties, including nested object properties. Build explicit writable-field allowlists; never derive request bodies from a database model. Registration must reject `admin`, `status` and server-owned fields.
- Query schemas allow only documented filters. Reject malformed numbers, repeated values/arrays where a scalar is required, and unexpected objects. Convert valid numeric strings explicitly; do not let empty strings or booleans turn into valid numbers through broad coercion.
- Public list defaults are page 1 and limit 12; admin limit defaults to 25; maximum limit is 50. Page and limit must be positive integers. Reject invalid supplied values rather than silently substituting defaults.
- JSON numeric fields must be numbers, including integer paise and guest counts. Do not accept a numeric string merely because query parameters require conversion.
- Normalize human-readable fields only as specified. Never trim, lowercase or truncate passwords or tokens.
- `.optional()` means a field may be absent; `.nullable()` means JSON `null` is accepted. Declare either deliberately. For PATCH, omitted means unchanged; accept null only for fields explicitly allowed to be cleared. Reject empty updates where no action would result.
- Validate cross-field relationships, such as minimum price not exceeding maximum price, in the schema. Keep database existence, unique-email checks, authorization, availability and state transitions in services/database constraints.
- Parse only required application headers, such as the idempotency key, from the complete header collection. Do not reject ordinary browser headers through a strict schema on all headers. Preserve raw webhook bytes for provider signature verification.

## 6. Wire formats and response safety

| Value | Valoura convention |
| --- | --- |
| JSON properties | camelCase, preserving documented provider field names where required |
| Identifier | `id` string, not `_id`; current guide uses ObjectId strings except slugs/references |
| Instant | ISO 8601 UTC string; never a Date object in a wire DTO |
| Event date | Real calendar date in `YYYY-MM-DD`, interpreted in Asia/Kolkata |
| Money | Integer paise, field suffix `Paise`, currency `INR` |
| Roles | `customer`, `vendor`, `admin`; public registration excludes admin |
| Missing nullable value | Explicit null only where the endpoint contract permits it |

A date regex alone does not establish calendar validity. Services enforce the booking date window using server time in Asia/Kolkata. Identifier syntax validation does not prove existence or permission.

Map database records into explicit allowlisted DTOs. Do not spread whole records into responses. Convert database IDs and timestamps, and omit password hashes, token hashes, session metadata and private payout/moderation information. Use separate public, owner and admin projections where visibility differs.

```ts
// common/api.dto.ts
export type ApiResponseDto<T> = { data: T };

export type PaginationMetaDto = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponseDto<T> = {
  data: T[];
  meta: PaginationMetaDto;
};

// users/user.dto.ts
export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "vendor" | "admin";
  status: "active" | "suspended";
  emailVerified: boolean;
};

// auth/auth.dto.ts (imports omitted in this documentation excerpt)
export type RegisterResponseDto = ApiResponseDto<{
  user: UserDto;
  verificationRequired: true;
}>;
```

Resource responses use `{ data: ... }`; paginated responses use `{ data: [...], meta: ... }`. A ResponseDto includes its envelope; a UserDto or VendorCardDto does not. HTTP 204 returns no JSON body. Keep explicit endpoint exceptions, such as the provider webhook acknowledgement, as documented in the API guide.

## 7. Error contract handoff

Preserve the documented envelope:

```json
{
  "error": {
    "code": "DATE_UNAVAILABLE",
    "message": "This vendor is unavailable for the selected date.",
    "fields": {},
    "requestId": "req_example"
  }
}
```

Malformed JSON returns 400; request validation returns 422; domain conflicts such as unavailable dates return 409. The centralized error handler owns converting validation failures into this envelope. Do not send raw Zod errors, stack traces or submitted secret values to clients. Response-validation failures indicate a server defect, not a client 422.

The guide does not specify the detailed value type/path convention inside `fields` or the generic validation error code. Finalize those in the error-contract task, reusing any already documented implementation decision. Do not independently invent a competing error shape in each feature schema.

## 8. Contract changes and review

When implementing an endpoint, keep its schemas, DTOs, API documentation, fixtures and applicable tests aligned in the same PR. Once the OpenAPI starter exists, update it too. Preserve wire input types in OpenAPI when parsing transforms query strings into numbers.

Task 1 review checklist:

- [ ] Shared contract location and import boundaries are documented.
- [ ] Body/query/params/header/schema/DTO naming is unambiguous.
- [ ] Request types derive from schemas and raw input is distinguished from parsed output.
- [ ] Unknown fields, normalization, optional/null and pagination rules are documented.
- [ ] Response envelopes, serialization and private-field exclusion match the MVP guide.
- [ ] Validation and business-rule responsibilities are separated.

Documentation review completes this task. V-03 remains open until its error handling, OpenAPI and CI acceptance criteria are verified. This document does not claim lint, typecheck or build have run against the repository.
