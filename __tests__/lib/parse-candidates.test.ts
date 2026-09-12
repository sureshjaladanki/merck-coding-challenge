import { parseCatalog } from "../../src/lib/parse-candidates";

const validCandidate = {
  id: "dc-001",
  name: "Merckolumab",
  status: "in-development",
  description: "A monoclonal antibody candidate.",
  mechanismOfAction: "Binds PD-L1.",
  sideEffects: ["Fatigue"],
  therapeuticArea: "Oncology",
  developmentPhase: "Phase II",
};

describe("parseCatalog", () => {
  test("parses a valid catalog payload", () => {
    expect(parseCatalog([validCandidate, { ...validCandidate, id: "dc-002", status: "approved" }])).toEqual([
      validCandidate,
      { ...validCandidate, id: "dc-002", status: "approved" },
    ]);
  });

  test("throws when the payload is not an array", () => {
    expect(() => parseCatalog({ candidates: [validCandidate] })).toThrow(
      "Candidate payload must be an array",
    );
  });

  test("throws when an entry is not an object", () => {
    expect(() => parseCatalog(["not-an-object"])).toThrow(
      "Each candidate must be an object",
    );
  });

  test("throws when a required string field is empty", () => {
    expect(() => parseCatalog([{ ...validCandidate, name: "  " }])).toThrow(
      'Candidate field "name" must be a non-empty string',
    );
  });

  test("throws when status is not a known drug status", () => {
    expect(() => parseCatalog([{ ...validCandidate, status: "withdrawn" }])).toThrow(
      "Invalid drug status: withdrawn",
    );
  });

  test("throws when sideEffects is not an array of strings", () => {
    expect(() => parseCatalog([{ ...validCandidate, sideEffects: ["Fatigue", 1] }])).toThrow(
      'Candidate field "sideEffects" must be an array of strings',
    );
  });
});
