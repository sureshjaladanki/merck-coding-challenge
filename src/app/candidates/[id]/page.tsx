import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { getCandidateById, getCandidateIds } from "@/lib/get-candidates";

interface CandidateDetailsPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams(): { id: string }[] {
  return getCandidateIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: CandidateDetailsPageProps) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (candidate === undefined) {
    return { title: "Candidate not found" };
  }

  return { title: `${candidate.name} · Drug Candidate Explorer` };
}

export default async function CandidateDetailsPage({
  params,
}: CandidateDetailsPageProps) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (candidate === undefined) {
    notFound();
  }

  return (
    <main
      id="main-content"
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <p className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-sky-800 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        >
          Back to candidates
        </Link>
      </p>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {candidate.name}
        </h1>
        <StatusBadge status={candidate.status} />
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {candidate.therapeuticArea} · {candidate.developmentPhase}
      </p>
      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Description
        </h2>
        <p className="mt-2 text-slate-800">{candidate.description}</p>
      </section>
      <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Mechanism of action
        </h2>
        <p className="mt-2 text-slate-800">{candidate.mechanismOfAction}</p>
      </section>
      <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Side effects
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-800">
          {candidate.sideEffects.map((effect) => (
            <li key={effect}>{effect}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
