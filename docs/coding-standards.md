# Coding Standards

This project is a Next.js + React application written in TypeScript and styled with Tailwind CSS. Code must be **idempotent**, **type-safe**, and **easy to name and reuse**. Follow functional programming (FP) and DRY principles throughout.

## Stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript (strict) |
| UI | React function components |
| Framework | Next.js App Router |
| Styling | Tailwind CSS |

Do not introduce CSS modules, styled-components, or inline `style={{}}` except for values that cannot be expressed as Tailwind utilities (for example dynamic pixel values from data).

## Type safety

Enable and keep TypeScript `strict` mode. Prefer explicit types at public boundaries (modules, components, hooks, API helpers). Infer locally when the type is obvious.

- Use `interface` for object shapes that may be extended (domain models, component props).
- Use `type` for unions, intersections, mapped types, and aliases.
- Never use `any`. Use `unknown` and narrow, or a precise generic.
- Avoid `as` casts. If a cast is required, isolate it next to a runtime check.
- Type function parameters and return values for exported functions.
- Model domain data as named types (`DrugCandidate`, `DrugStatus`) rather than anonymous objects.

```ts
export type DrugStatus = "in-development" | "approved";

export interface DrugCandidate {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
}

export function getDisplayName(candidate: DrugCandidate): string {
  return candidate.name.trim();
}
```

## Naming (TypeScript / JavaScript nomenclature)

Names must describe meaning, not implementation trivia.

- **PascalCase** for classes, types, interfaces, and React components.
- **camelCase** for variables, functions, methods, and hooks.
- **kebab-case** for files and folders (not PascalCase filenames).

| Kind | Convention | Example |
| --- | --- | --- |
| Variables, functions, methods | `camelCase` | `filterCandidates`, `isApproved` |
| Booleans | predicate prefix | `isLoading`, `hasResults`, `canSubmit` |
| Classes, types, and interfaces | `PascalCase` | `DrugCandidate`, `SearchFilters` |
| React components | `PascalCase` | `CandidateList`, `SearchBar` |
| Hooks | `use` + `camelCase` | `useCandidateSearch` |
| Constants | `SCREAMING_SNAKE_CASE` only for true constants | `DEFAULT_PAGE_SIZE` |
| Files and folders | kebab-case | `candidate-list.tsx`, `get-candidates.ts` |
| Event handlers | `handle` + event | `handleSearchChange` |
| Callback props | `on` + event | `onSearchChange` |

Avoid abbreviations (`btn`, `data1`, `tmp`) and Hungarian notation (`IDrug`, `strName`).

## Idempotent TypeScript

A function is idempotent when calling it once or many times with the same inputs yields the same result and does not accumulate extra side effects.

- Prefer **pure functions**: same arguments → same return value; no mutation of inputs.
- Do not mutate arguments, shared objects, or module-level collections. Return new values.
- Keep I/O (fetch, storage, logging) at the edges. Core domain logic stays pure so it is safe to re-run.
- Initialize from props/arguments, not from leftover module state.
- Avoid hidden defaults that change after the first call (counters, caches without keys, `Date.now()` inside pure mappers).
- When a cache is needed, key it by input and make reads repeatable.

```ts
// ❌ Mutates input; second call sees a different list
function markApproved(candidates: DrugCandidate[]): DrugCandidate[] {
  candidates.forEach((item) => {
    item.status = "approved";
  });
  return candidates;
}

// ✅ Idempotent: same input always yields the same new array
function markApproved(candidates: readonly DrugCandidate[]): DrugCandidate[] {
  return candidates.map((item) => ({ ...item, status: "approved" }));
}
```

## Idempotent Next.js and React

- Components must be **pure with respect to props and state**: rendering twice must not change results or mutate data.
- Do not write to module-scoped `let` stores, mutate imported arrays, or call `Math.random()` / `Date.now()` during render.
- Data fetching belongs in Server Components, `fetch` with explicit cache options, or dedicated loaders — not in render with side effects.
- Route handlers: **GET** must be safe to retry and must not change server state. Mutations use **POST/PUT/PATCH/DELETE** and should be designed so retries do not create duplicate records (stable ids, upserts).
- Client effects (`useEffect`) must tolerate React Strict Mode double-invocation: subscriptions clean up; fetches abort or ignore stale responses.
- Keys in lists must be stable ids, never array indexes when the list can reorder.

```tsx
// ❌ Side effect during render
let renderCount = 0;
export function CandidateCount({ total }: { total: number }) {
  renderCount += 1;
  return <p>{total}</p>;
}

// ✅ Pure render; no accumulated side effects
export function CandidateCount({ total }: { total: number }) {
  return <p>{total}</p>;
}
```

## Functional programming and DRY

- Prefer composition of small functions over classes and inheritance.
- Use `map`, `filter`, `reduce`, and early returns instead of nested imperative loops when they stay readable.
- Do not copy-paste filters, formatters, or fetch wrappers. Extract a named function or hook.
- Colocate a helper with its only consumer; promote it when a second consumer appears.
- Keep components focused: presentational UI vs. data/hooks vs. domain functions.
- Avoid over-abstraction. DRY applies to **knowledge**, not to accidental similarity of two lines of JSX.

```ts
export function filterCandidatesByName(
  candidates: readonly DrugCandidate[],
  query: string,
): DrugCandidate[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return [...candidates];
  }

  return candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(normalizedQuery),
  );
}
```

## React components

- Use function components only. No class components.
- Type props with `interface` (or `type` when the props are a union).
- Derive values during render when they are cheap and pure. Use `useMemo` / `useCallback` only when measured or when referential stability is required.
- Custom hooks own reusable stateful logic; they return a typed object or tuple.
- Server Components by default; add `"use client"` only for interactivity, browser APIs, or hooks.

```tsx
interface SearchBarProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ value, onSearchChange }: SearchBarProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">Search by name</span>
      <input
        className="rounded-md border border-slate-300 px-3 py-2"
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  );
}
```

## Tailwind CSS

- Style with utility classes on JSX. Keep class lists readable; extract a small component when the same cluster repeats.
- Use layout utilities (`flex`, `grid`, `gap`) instead of custom CSS.
- Prefer theme tokens (`text-slate-700`, `bg-white`) over arbitrary values (`text-[#123]`).
- Responsive design uses breakpoint prefixes (`sm:`, `md:`, `lg:`).
- Do not share styles by copying long class strings; share via a component or a `cva`/clsx helper if variants exist.

## File and module layout

- One primary export per file when the export is a component or a domain type module.
- Barrel files are optional; do not create barrels that re-export everything and hide circular deps.
- Keep mock API access behind functions such as `getCandidates()` / `getCandidateById()` so UI never depends on a raw JSON import shape spreading through the tree.

## Testing and documentation

- Pure domain functions are the first tests (filters, mappers, formatters).
- Component tests cover user-visible behavior (search, navigation), not Tailwind class strings.
- Public functions and non-obvious domain rules get a short comment or JSDoc **why**, not a restatement of the code.
