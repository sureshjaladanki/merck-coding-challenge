"use client";

import { useMemo, useState } from "react";
import type { DrugCandidateSummary } from "@/types/drug-candidate";
import { CandidateList } from "@/components/candidate-list";
import { SearchBar } from "@/components/search-bar";
import { filterCandidatesByName } from "@/lib/filter-candidates";
import {
  DEFAULT_PAGE_SIZE,
  paginateCandidates,
} from "@/lib/paginate-candidates";

interface CandidateExplorerProps {
  candidates: readonly DrugCandidateSummary[];
}

export function CandidateExplorer({ candidates }: CandidateExplorerProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const matchingCandidates = useMemo(
    () => filterCandidatesByName(candidates, query),
    [candidates, query],
  );

  const paginated = paginateCandidates(
    matchingCandidates,
    page,
    Math.ceil(DEFAULT_PAGE_SIZE / 2),
  );

  function handleSearchChange(value: string): void {
    setQuery(value);
    setPage(1);
  }

  const hasMatches = matchingCandidates.length > 0;
  const showPager = paginated.totalPages > 1;

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={query} onSearchChange={handleSearchChange} />
      <p className="text-sm text-slate-600" aria-live="polite">
        {hasMatches
          ? `${matchingCandidates.length} candidate${matchingCandidates.length === 1 ? "" : "s"}`
          : "No candidates match that name."}
      </p>
      {hasMatches ? <CandidateList candidates={paginated.items} /> : null}
      {showPager && (
        <nav
          aria-label="Candidate list pages"
          className="flex items-center justify-between gap-4"
        >
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={paginated.page <= 1}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Previous
          </button>
          <p className="text-sm text-slate-600">
            Page {paginated.page} of {paginated.totalPages}
          </p>
          <button
            type="button"
            onClick={() =>
              setPage((current) =>
                Math.min(paginated.totalPages, current + 1),
              )
            }
            disabled={paginated.page >= paginated.totalPages}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
