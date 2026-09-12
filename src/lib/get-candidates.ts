import candidatesJson from "../../data/candidates.json";
import type {
  DrugCandidate,
  DrugCandidateSummary,
} from "@/types/drug-candidate";
import { parseCatalog } from "@/lib/parse-candidates";

function toSummary(candidate: DrugCandidate): DrugCandidateSummary {
  return {
    id: candidate.id,
    name: candidate.name,
    status: candidate.status,
    description: candidate.description,
  };
}

const catalog: readonly DrugCandidate[] = parseCatalog(candidatesJson);

const candidatesById: ReadonlyMap<string, DrugCandidate> = new Map(
  catalog.map((candidate) => [candidate.id, candidate]),
);

/** Mock list API: list UIs call this instead of importing JSON or fetching HTTP. */
export function getCandidates(): DrugCandidateSummary[] {
  return catalog.map(toSummary);
}

/** Mock detail API: look up one candidate by id, as a `GET /candidates/:id` would. */
export function getCandidateById(id: string): DrugCandidate | undefined {
  const candidate = candidatesById.get(id);
  if (!candidate) {
    return undefined;
  }

  return {
    ...candidate,
    sideEffects: [...candidate.sideEffects],
  };
}

export function getCandidateIds(): string[] {
  return catalog.map((candidate) => candidate.id);
}
