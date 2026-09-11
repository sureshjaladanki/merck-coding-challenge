import { filterCandidatesByName } from "../../src/lib/filter-candidates";
import type { DrugCandidateSummary } from "../../src/types/drug-candidate";

describe("filterCandidatesByName", () => {
  const candidates: DrugCandidateSummary[] = [
    {
      id: "1",
      name: "Alpha",
      status: "approved",
      description: "",
    },
    {
      id: "2",
      name: "Beta",
      status: "in-development",
      description: "",
    },
  ];

  test("returns all candidates when the query is empty", () => {
    expect(filterCandidatesByName(candidates, "  ")).toEqual(candidates);
  });

  test("returns a new array when the query is empty", () => {
    const result = filterCandidatesByName(candidates, "");
    expect(result).not.toBe(candidates);
  });

  test("matches names from the start, case-insensitively", () => {
    expect(filterCandidatesByName(candidates, "alp")).toEqual([candidates[0]]);
  });

  test("does not match a query in the middle of a name", () => {
    expect(filterCandidatesByName(candidates, "lph")).toEqual([]);
  });

  test("does not mutate the input list", () => {
    const snapshot = [...candidates];
    filterCandidatesByName(candidates, "beta");
    expect(candidates).toEqual(snapshot);
  });
});
