import { render, screen } from "@testing-library/react";
import { CandidateListItem } from "../../src/components/candidate-list-item";
import type { DrugCandidateSummary } from "../../src/types/drug-candidate";

const candidate: DrugCandidateSummary = {
  id: "dc-001",
  name: "Merckolumab",
  status: "approved",
  description: "A monoclonal antibody candidate.",
};

describe("CandidateListItem", () => {
  test("links the candidate name to its details page", () => {
    render(
      <ul>
        <CandidateListItem candidate={candidate} />
      </ul>,
    );

    expect(
      screen.getByRole("link", { name: /merckolumab/i }),
    ).toHaveAttribute("href", "/candidates/dc-001");
    expect(screen.getByText("A monoclonal antibody candidate.")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });
});
