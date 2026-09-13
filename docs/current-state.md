# Valoura — Current State

## 1. Starting decision

Valoura is being developed from a fresh start to learn full-stack
development and a team-style Git/GitHub workflow.

PostgreSQL is the selected database.
Previous MongoDB and authentication work is not assumed to exist
in this fresh repository.

## 2. Inspection evidence

Inspection method: git ls-files.
This records tracked file paths; file contents and runtime behaviour
have not yet been verified.

Inspected branch: main
Latest commit: dfc226f

## 3. Existing repository contents

| Path | Contents |
| --- | --- |
| apps/web/ | Next.js App Router scaffold with TypeScript and ESLint configuration |
| apps/web/src/app/ | Root layout, homepage, global styles and favicon |
| apps/web/public/ | Starter SVG assets |
| package.json | Root package configuration; scripts/workspaces not yet inspected |
| package-lock.json | Root dependency lockfile |
| docs/Valoura-MVP-Complete-Guide.md | Requirements, architecture, API, backlog and tests |
| docs/Valoura-Implementation-Workflow.md | Phased implementation and Git/GitHub workflow |
| .github/ISSUE_TEMPLATE/task.yml | Task issue template |
| .github/pull_request_template.md | Pull request template |
| README.md | Repository README; contents not yet reviewed |
| .gitignore | Ignore rules; contents not yet reviewed |

## 4. Implementation status

| Area | Status | Evidence / remaining work |
| --- | --- | --- |
| Frontend | Partial | Scaffold files exist under apps/web; execution and build are unverified |
| Express API | Missing from tracked inventory | No API implementation paths listed |
| Background worker | Missing from tracked inventory | No worker implementation paths listed |
| PostgreSQL integration | Missing from tracked inventory | No database configuration, schema or migration paths listed; external database setup is unknown |
| Authentication | Unverified | No dedicated auth paths listed; source contents have not been inspected |
| CI | Missing from tracked inventory | No .github/workflows files listed |
| Documentation | Partial | Both guides exist; PostgreSQL alignment remains |
| GitHub templates | Partial | Task and PR templates exist; contents/use not yet verified |

Untracked files are not covered by this inspection.
GitHub board, milestones, issues and branch protections cannot be
verified from this file list.

## 4. Reusable work

- Existing frontend scaffold and starter assets.
- Root package configuration and lockfile, subject to inspection.
- MVP guide and implementation workflow.
- Task issue and pull request templates.

## 5. Known gaps

- Verify frontend execution and production build.
- Inspect root scripts and npm workspace configuration.
- Align remaining MongoDB/Mongoose documentation with PostgreSQL.
- Implement the API and worker scaffold under V-02.
- Establish contracts and CI under V-03.
- Implement PostgreSQL integration, migrations and seeds under V-04.
- Verify GitHub planning and protection settings separately.

## 6. Next action

Complete V-01 documentation alignment and GitHub planning.
Inspect existing scaffold work against V-02 before adding or
repeating setup.