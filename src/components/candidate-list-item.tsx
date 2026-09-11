import Link from "next/link";
import type { DrugCandidateSummary } from "@/types/drug-candidate";
import { StatusBadge } from "@/components/status-badge";

interface CandidateListItemProps {
  candidate: DrugCandidateSummary;
}

export function CandidateListItem({ candidate }: CandidateListItemProps) {
  return (
    <li>
      <Link
        href={`/candidates/${candidate.id}`}
        className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-base font-semibold text-slate-900">{candidate.name}</h2>
          <StatusBadge status={candidate.status} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{candidate.description}</p>
      </Link>
    </li>
  );
}
