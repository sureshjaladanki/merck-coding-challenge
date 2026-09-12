import { render, screen } from "@testing-library/react";
import { StatusBadge } from "../../src/components/status-badge";

describe("StatusBadge", () => {
  test("shows the approved label", () => {
    render(<StatusBadge status="approved" />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  test("shows the in-development label", () => {
    render(<StatusBadge status="in-development" />);
    expect(screen.getByText("In Development")).toBeInTheDocument();
  });
});
