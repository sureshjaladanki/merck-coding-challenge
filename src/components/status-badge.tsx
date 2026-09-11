import type { DrugStatus } from "@/types/drug-candidate";
import { formatStatus } from "@/lib/format-status";

interface StatusBadgeProps {
  status: DrugStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isApproved = status === "approved";

  return (
    <span
      className={
        isApproved
          ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-900"
          : "inline-flex rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-900"
      }
    >
      {formatStatus(status)}
    </span>
  );
}
