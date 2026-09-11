import type { DrugCandidateSummary } from "@/types/drug-candidate";

/**
 * Returns a new array. An empty query copies the input so callers never
 * share a mutable reference with the source list.
 */
export function filterCandidatesByName(
  candidates: readonly DrugCandidateSummary[],
  query: string,
): DrugCandidateSummary[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return [...candidates];
  }

  return candidates.filter((candidate) =>
    candidate.name.toLowerCase().startsWith(normalizedQuery),
  );
}
