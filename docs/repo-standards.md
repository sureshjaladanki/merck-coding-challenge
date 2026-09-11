# Repository Standards

Conventions for tooling, tests, documentation, and layout in this repository. Coding style lives in `docs/coding-standards.md`.

## Folder structure

Use this layout. Put unit tests in **`__tests__/`** (Jest’s default), not `tests/`. Mirror `src/` so a module and its tests stay easy to find.

```text
.
├── README.md
├── package.json
├── package-lock.json
├── jest.config.ts
├── docs/
│   ├── coding-challenge.md
│   ├── coding-standards.md
│   └── repo-standards.md
├── public/
├── data/                         # mock JSON / in-memory seed data
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx              # candidate list + search
│   │   └── candidates/
│   │       └── [id]/
│   │           └── page.tsx      # candidate details
│   ├── components/               # React UI (PascalCase files)
│   ├── lib/                      # domain + mock API (kebab-case)
│   └── types/                    # shared domain types
└── __tests__/                    # Jest unit tests (mirrors src)
    ├── lib/
    └── components/
```

| Path | Role |
| --- | --- |
| `src/app/` | Routes and layouts only |
| `src/components/` | Presentational UI |
| `src/lib/` | Pure domain functions and mock API accessors (`getCandidates`, `getCandidateById`) |
| `src/types/` | Named domain types (`DrugCandidate`, `DrugStatus`) |
| `data/` | Mock payload; UI must not import this JSON shape directly |
| `__tests__/` | Jest tests: `*.test.ts` / `*.test.tsx` |
| `docs/` | Project Markdown |

Do not add a root `tests/` folder. Colocate a `*.test.ts` next to a module only when a single helper is easier to keep local; default is `__tests__/`.

## Package manager

Use **npm** only. Do not add Yarn, pnpm, or Bun lockfiles or scripts.

| Item | Standard |
| --- | --- |
| Client | `npm` |
| Lockfile | `package-lock.json` (committed) |
| Install | `npm install` |
| Run scripts | `npm run <script>` |
| Add a dependency | `npm install <pkg>` / `npm install -D <pkg>` |

- Keep `package-lock.json` in git. Do not delete it to “refresh” installs.
- Pin Node to an LTS version in `.nvmrc` (or `engines` in `package.json`) when the app is set up; document that version in the project README.
- Prefer `npm ci` in CI and for a clean local install from the lockfile.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Unit tests

Use **Jest** as the unit test runner. Do not introduce Vitest, Mocha, or other runners for unit tests.

- Prefer testing **pure domain functions** first (filters, mappers, formatters).
- Component tests cover user-visible behavior, not Tailwind class strings.
- Place tests under `__tests__/`, mirroring `src/` (`src/lib/filter-candidates.ts` → `__tests__/lib/filter-candidates.test.ts`).
- Name files `*.test.ts` or `*.test.tsx`.
- Use `describe` / `test` with names that state the behavior.
- Keep tests deterministic: no network, no `Date.now()` / `Math.random()` unless injected.
- Mock I/O at the edges. Do not mock the function under test.

```ts
import { filterCandidatesByName } from "../../src/lib/filter-candidates";

describe("filterCandidatesByName", () => {
  const candidates = [
    { id: "1", name: "Alpha", status: "approved" as const, description: "" },
    { id: "2", name: "Beta", status: "in-development" as const, description: "" },
  ];

  test("returns all candidates when the query is empty", () => {
    expect(filterCandidatesByName(candidates, "  ")).toEqual(candidates);
  });

  test("matches names case-insensitively", () => {
    expect(filterCandidatesByName(candidates, "alp")).toEqual([candidates[0]]);
  });
});
```

Run tests with `npm test`. Watch mode: `npm run test:watch`.

## Documentation

Write project documentation as **Markdown (`.md`)** files.

| Document | Location |
| --- | --- |
| Challenge brief | `docs/coding-challenge.md` |
| Coding standards | `docs/coding-standards.md` |
| Repository standards | `docs/repo-standards.md` |
| Approach / how to run | `README.md` and additional `docs/*.md` as needed |

- Use GitHub-flavored Markdown: headings, tables, fenced code blocks with a language tag.
- Prefer `docs/` for lasting project docs. Keep `README.md` short: purpose, setup (`npm install`), scripts, and links into `docs/`.
- Document **why** and how to run/test the app. Do not duplicate code that already has a clear name.
- Do not use Word, Confluence exports, or HTML as the source of truth for repo docs.
