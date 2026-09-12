import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import CandidateDetailsPage, {
  generateMetadata,
  generateStaticParams,
} from "../../src/app/candidates/[id]/page";
import { getCandidateIds, getCandidates } from "../../src/lib/get-candidates";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("CandidateDetailsPage", () => {
  test("generateStaticParams uses catalog ids", () => {
    expect(generateStaticParams()).toEqual(
      getCandidateIds().map((id) => ({ id })),
    );
  });

  test("generateMetadata uses the candidate name", async () => {
    const [summary] = getCandidates();
    const metadata = await generateMetadata({
      params: Promise.resolve({ id: summary.id }),
    });

    expect(metadata).toEqual({
      title: `${summary.name} · Drug Candidate Explorer`,
    });
  });

  test("generateMetadata falls back when the id is unknown", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ id: "missing" }),
    });

    expect(metadata).toEqual({ title: "Candidate not found" });
  });

  test("renders detail fields for a known candidate", async () => {
    const [summary] = getCandidates();
    const page = await CandidateDetailsPage({
      params: Promise.resolve({ id: summary.id }),
    });

    render(page);

    expect(screen.getByRole("heading", { name: summary.name })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /mechanism of action/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /side effects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to candidates/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  test("calls notFound for an unknown id", async () => {
    await expect(
      CandidateDetailsPage({ params: Promise.resolve({ id: "missing" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
