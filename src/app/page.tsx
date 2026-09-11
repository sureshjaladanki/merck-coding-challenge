import { CandidateExplorer } from "@/components/candidate-explorer";
import { getCandidates } from "@/lib/get-candidates";

export default function Home() {
  const candidates = getCandidates();

  return (
    <main
      id="main-content"
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Drug candidates
        </h1>
        <p className="mt-2 text-slate-600">
          Browse name, status, and description. Search by name, then open a
          candidate for mechanism of action and side effects.
        </p>
      </div>
      <CandidateExplorer candidates={candidates} />
    </main>
  );
}
