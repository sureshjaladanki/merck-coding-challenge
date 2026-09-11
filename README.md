# Drug Candidate Explorer

A Next.js + TypeScript web app for viewing, searching, and filtering drug candidates. Built for the Merck KGaA Healthcare Digital, Data & IT R&D senior frontend coding challenge.

The UI talks to a mock API so the same architecture can scale to larger datasets. Search filters the list by name; each candidate opens a details page.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| UI | React function components |
| Styling | Tailwind CSS |
| Tests | Jest |
| Package manager | npm |

## Setup

Requires **Node.js 24.19.0** or later (LTS). The version is pinned in `.nvmrc` and `engines` in `package.json`.

```bash
npm install
```

For a clean install from the lockfile:

```bash
npm ci
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint with Next.js |
| `npm test` | Run Jest unit tests |
| `npm run test:watch` | Jest in watch mode |

Open [http://localhost:3000](http://localhost:3000) after `npm run dev`.

## Walkthrough

1. Homepage lists name, status, and description (paged if there are more rows than the page size).
2. Search `ave` for Avelumab. Search `zzz` for the empty state. Clear the field to restore the list.
3. Open a candidate for mechanism of action and side effects. Use **Back to candidates**.
4. Visit `/candidates/not-a-real-id` for the not-found page.
5. Run `npm test` for the Jest suites.

## Approach

- **List + search:** Homepage lists name, status, and description. Search filters by name with a pure domain function so filtering stays testable and independent of the UI.
- **Details:** Selecting a candidate opens a dedicated route with extra fields (mechanism of action, side effects, and similar).
- **Mock API:** Data lives under `data/` at the repo root. UI loads it through accessors such as `getCandidates()` and `getCandidateById()`, not by importing the JSON shape directly.
- **Scale:** Filtering, mapping, and paging stay in small, idempotent functions so larger payloads can be swapped in without changing presentation code.

## Layout

```text
src/app/           Next.js routes (list, details)
src/components/    Presentational UI
src/lib/           Domain helpers and mock API
src/types/         Shared domain types
data/              Mock payload (repo root)
__tests__/         Jest tests (mirrors src/)
docs/              Project documentation
```

## Documentation

| Document | Location |
| --- | --- |
| Challenge brief | [docs/coding-challenge.md](docs/coding-challenge.md) |
| Execution plan (milestones) | [docs/archive/execution-plan.md](docs/archive/execution-plan.md) |
| Coding standards | [docs/coding-standards.md](docs/coding-standards.md) |
| Repository standards | [docs/repo-standards.md](docs/repo-standards.md) |
