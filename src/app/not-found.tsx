import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6"
    >
      <h1 className="text-2xl font-semibold text-slate-900">
        Candidate not found
      </h1>
      <p className="mt-2 text-slate-600">
        That drug candidate does not exist in the catalog.
      </p>
      <p className="mt-6">
        <Link
          href="/"
          className="text-sm font-medium text-sky-800 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        >
          Back to candidates
        </Link>
      </p>
    </main>
  );
}
