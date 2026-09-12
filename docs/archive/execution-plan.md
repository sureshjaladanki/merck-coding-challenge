# Execution plan — milestone tracking

Tracking document for the Merck KGaA senior frontend coding challenge ([coding-challenge.md](./coding-challenge.md)).

**Goal:** a Next.js + TypeScript app to view, search, and open drug candidates via a mock API, with tests, docs, and an architecture that can scale to larger datasets.

**How to use:** mark checkboxes as work lands. Update the **Status** column when a milestone is done. Do not start the next milestone’s “done” criteria until the current one’s exit criteria pass.

| Status | Meaning |
| --- | --- |
| Done | Exit criteria met |
| In progress | Implementation started |
| Not started | No work yet |

## Milestone board

| ID | Milestone | Status | Exit criteria |
| --- | --- | --- | --- |
| M0 | Scaffold and standards | Done | Next.js App Router, TypeScript strict, Tailwind, npm, Node pin, docs/standards present |
| M1 | Domain, mock data, accessors | Done | Typed models, JSON catalog, `getCandidates` / `getCandidateById`, parse / filter / paginate / format helpers |
| M2 | List, search, details UI | Done | Homepage list + name search, details route, 404, Tailwind layout; UI does not import JSON |
| M3 | Jest unit tests | Done | `npm test` green; domain, component, and route tests; `src` coverage collected |
| M4 | Documentation and walkthrough verification | Done | README accurate; lint, tsc, browser flows pass |

## M0 — Scaffold and standards

**Status:** Done (repo starting point)

- [x] Next.js App Router + React function components
- [x] TypeScript `strict`
- [x] Tailwind CSS
- [x] npm + `package-lock.json`; Node version in `.nvmrc` / `engines`
- [x] Challenge brief and coding/repo standards in `docs/`

## M1 — Domain, mock data, accessors

**Status:** Done

Architecture: list vs detail shapes; I/O only in accessors; O(1) id lookup; UI never imports `data/*.json`.

- [x] `src/types/drug-candidate.ts` — `DrugStatus`, `DrugCandidateSummary`, `DrugCandidate`
- [x] `data/candidates.json` — ~8–12 records, mixed statuses, detail-only fields
- [x] `src/lib/get-candidates.ts` — `getCandidates()`, `getCandidateById()`, `getCandidateIds()`, id map
- [x] `src/lib/parse-candidates.ts` — catalog validation for the JSON payload
- [x] `src/lib/filter-candidates.ts` — case-insensitive name filter; empty query copies the list
- [x] `src/lib/paginate-candidates.ts` — `DEFAULT_PAGE_SIZE` + page slice
- [x] `src/lib/format-status.ts` — display labels

**Exit:** accessors return summaries for the list and full records by id; unknown id is `undefined`.

## M2 — List, search, details UI

**Status:** Done

- [x] Root layout: skip-to-content, header home link, `max-w` shell, slate/sky tokens
- [x] Homepage RSC loads via `getCandidates()` and renders `CandidateExplorer`
- [x] Client search island + `SearchBar` (labeled input)
- [x] Candidate list / list item with `Link` to `/candidates/[id]`, stable `id` keys
- [x] `StatusBadge` (text + color, not color-only)
- [x] Details page: description, mechanism of action, side effects, extra fields; `notFound()` for missing id
- [x] App `not-found` page and back navigation
- [x] Browser check: list fields, search match / no match / clear, details + back, unknown id 404, narrow viewport

**Exit:** a user can search by name and open details without importing JSON from UI code.

## M3 — Jest unit tests

**Status:** Done

- [x] Install Jest + Testing Library (npm devDependencies only)
- [x] `jest.config.ts`, `jest.setup.ts`, path alias `@/*`
- [x] Scripts: `test`, `test:watch`
- [x] `__tests__/lib/filter-candidates.test.ts`
- [x] `__tests__/lib/paginate-candidates.test.ts`
- [x] `__tests__/lib/format-status.test.ts`
- [x] `__tests__/lib/get-candidates.test.ts`
- [x] `__tests__/lib/parse-candidates.test.ts`
- [x] `__tests__/components/search-bar.test.tsx`
- [x] `__tests__/components/status-badge.test.tsx`
- [x] `__tests__/components/candidate-list-item.test.tsx`
- [x] `__tests__/components/candidate-list.test.tsx`
- [x] `__tests__/components/candidate-explorer.test.tsx`
- [x] `__tests__/app/page.test.tsx`
- [x] `__tests__/app/layout.test.tsx`
- [x] `__tests__/app/not-found.test.tsx`
- [x] `__tests__/app/candidates-page.test.tsx`
- [x] `collectCoverageFrom` for `src/**/*.{ts,tsx}` (excluding types)

**Exit:** `npm test` passes. Domain tests first; component and route tests cover user-visible behavior, not class strings.

## M4 — Documentation and walkthrough verification

**Status:** Done

- [x] README: setup, scripts, walkthrough, link to this plan
- [x] `npm test`, `npm run lint`, `npx tsc --noEmit` clean
- [x] Confirm no `data/*.json` imports under `src/app` or `src/components`
- [x] Walkthrough path: list → search → details → 404 → tests

**Exit:** the app is demo-ready for the code walkthrough.

## Sequence

```text
M0 (done) → M1 (done) → M2 (done) → M3 (done) → M4 (done)
```

## Out of scope

Auth, real backend, mutations, status filter, virtual lists, public REST layer, CI YAML, extra CSS systems.

## Related docs

| Document | Path |
| --- | --- |
| Challenge brief | [coding-challenge.md](./coding-challenge.md) |
| Coding standards | [coding-standards.md](./coding-standards.md) |
| Repository standards | [repo-standards.md](./repo-standards.md) |
| How to run | [../README.md](../README.md) |
