import type { DrugStatus } from "@/types/drug-candidate.ts";

const STATUS_LABELS: Record<DrugStatus, string> = {
  "in-development": "In Development",
  approved: "Approved",
};

export function formatStatus(status: DrugStatus): string {
  return STATUS_LABELS[status];
}
