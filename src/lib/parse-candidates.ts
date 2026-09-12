import type { DrugCandidate, DrugStatus } from "@/types/drug-candidate";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDrugStatus(value: unknown): value is DrugStatus {
  return value === "in-development" || value === "approved";
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Candidate field "${key}" must be a non-empty string`);
  }
  return value;
}

function parseSideEffects(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error("Candidate field \"sideEffects\" must be an array of strings");
  }
  return value;
}

function recordStatus(record: Record<string, unknown>): DrugStatus {
  if (!isDrugStatus(record.status)) {
    throw new Error(`Invalid drug status: ${String(record.status)}`);
  }
  return record.status;
}

function parseCandidate(value: unknown): DrugCandidate {
  if (!isRecord(value)) {
    throw new Error("Each candidate must be an object");
  }

  const status = recordStatus(value);

  return {
    id: readString(value, "id"),
    name: readString(value, "name"),
    status,
    description: readString(value, "description"),
    mechanismOfAction: readString(value, "mechanismOfAction"),
    sideEffects: parseSideEffects(value.sideEffects),
    therapeuticArea: readString(value, "therapeuticArea"),
    developmentPhase: readString(value, "developmentPhase"),
  };
}

export function parseCatalog(payload: unknown): readonly DrugCandidate[] {
  if (!Array.isArray(payload)) {
    throw new Error("Candidate payload must be an array");
  }
  return payload.map(parseCandidate);
}
