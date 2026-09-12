import {
  getCandidateById,
  getCandidateIds,
  getCandidates,
} from "../../src/lib/get-candidates";

describe("getCandidates", () => {
  test("returns summaries without detail-only fields", () => {
    const summaries = getCandidates();

    expect(summaries.length).toBeGreaterThan(0);
    const [first] = summaries;
    expect(first).toEqual({
      id: first.id,
      name: first.name,
      status: first.status,
      description: first.description,
    });
    expect(first).not.toHaveProperty("mechanismOfAction");
    expect(first).not.toHaveProperty("sideEffects");
    expect(first).not.toHaveProperty("therapeuticArea");
    expect(first).not.toHaveProperty("developmentPhase");
  });
});

describe("getCandidateById", () => {
  test("returns undefined for an unknown id", () => {
    expect(getCandidateById("not-a-real-id")).toBeUndefined();
  });

  test("returns extra detail fields for a known id", () => {
    const [summary] = getCandidates();
    const candidate = getCandidateById(summary.id);

    expect(candidate).toBeDefined();
    expect(candidate?.id).toBe(summary.id);
    expect(candidate?.name).toBe(summary.name);
    expect(candidate?.mechanismOfAction.length).toBeGreaterThan(0);
    expect(candidate?.sideEffects.length).toBeGreaterThan(0);
    expect(candidate?.therapeuticArea.length).toBeGreaterThan(0);
    expect(candidate?.developmentPhase.length).toBeGreaterThan(0);
  });

  test("returns a new sideEffects array on each read", () => {
    const [summary] = getCandidates();
    const firstRead = getCandidateById(summary.id);
    const secondRead = getCandidateById(summary.id);

    expect(firstRead?.sideEffects).not.toBe(secondRead?.sideEffects);
    expect(firstRead?.sideEffects).toEqual(secondRead?.sideEffects);
  });
});

describe("getCandidateIds", () => {
  test("returns ids in catalog order", () => {
    expect(getCandidateIds()).toEqual(getCandidates().map((candidate) => candidate.id));
  });
});
