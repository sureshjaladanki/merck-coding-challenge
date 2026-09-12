import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CandidateExplorer } from "../../src/components/candidate-explorer";
import type { DrugCandidateSummary } from "../../src/types/drug-candidate";

function makeCandidate(index: number): DrugCandidateSummary {
  return {
    id: `dc-${String(index).padStart(3, "0")}`,
    name: `Candidate ${index}`,
    status: index % 2 === 0 ? "approved" : "in-development",
    description: `Description ${index}`,
  };
}

const sixCandidates = [1, 2, 3, 4, 5, 6].map(makeCandidate);

describe("CandidateExplorer", () => {
  test("shows a singular count when one candidate matches", () => {
    render(<CandidateExplorer candidates={[sixCandidates[0]]} />);
    expect(screen.getByText("1 candidate")).toBeInTheDocument();
  });

  test("filters by name and shows an empty message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<CandidateExplorer candidates={sixCandidates} />);

    await user.type(
      screen.getByRole("searchbox", { name: /search by name/i }),
      "zzz",
    );

    expect(screen.getByText("No candidates match that name.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("pages through results and resets to the first page on search", async () => {
    const user = userEvent.setup();
    render(<CandidateExplorer candidates={sixCandidates} />);

    expect(screen.getByText("6 candidates")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    expect(screen.getByRole("link", { name: /candidate 6/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /previous/i }));
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    await user.type(
      screen.getByRole("searchbox", { name: /search by name/i }),
      "Candidate 1",
    );

    expect(screen.getByText("1 candidate")).toBeInTheDocument();
    expect(screen.queryByText(/page /i)).not.toBeInTheDocument();
  });
});
