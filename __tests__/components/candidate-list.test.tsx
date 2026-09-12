import { render, screen } from "@testing-library/react";
import { CandidateList } from "../../src/components/candidate-list";
import type { DrugCandidateSummary } from "../../src/types/drug-candidate";

const candidates: DrugCandidateSummary[] = [
  {
    id: "dc-001",
    name: "Merckolumab",
    status: "approved",
    description: "First candidate.",
  },
  {
    id: "dc-002",
    name: "Sotivant",
    status: "in-development",
    description: "Second candidate.",
  },
];

describe("CandidateList", () => {
  test("renders a link for each candidate", () => {
    render(<CandidateList candidates={candidates} />);

    expect(screen.getByRole("link", { name: /merckolumab/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sotivant/i })).toBeInTheDocument();
  });
});
