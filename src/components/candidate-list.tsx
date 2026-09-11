import type { DrugCandidateSummary } from "@/types/drug-candidate";
import { CandidateListItem } from "@/components/candidate-list-item";

interface CandidateListProps {
  candidates: readonly DrugCandidateSummary[];
}

export function CandidateList({ candidates }: CandidateListProps) {
  return (
    <ul className="grid gap-3">
      {candidates.map((candidate) => (
        <CandidateListItem key={candidate.id} candidate={candidate} />
      ))}
    </ul>
  );
}
