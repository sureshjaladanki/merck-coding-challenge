export type DrugStatus = "in-development" | "approved";

export interface DrugCandidateSummary {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
}

export interface DrugCandidate extends DrugCandidateSummary {
  mechanismOfAction: string;
  sideEffects: readonly string[];
  therapeuticArea: string;
  developmentPhase: string;
}
