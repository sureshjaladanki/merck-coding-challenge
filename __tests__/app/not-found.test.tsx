import { render, screen } from "@testing-library/react";
import NotFound from "../../src/app/not-found";

describe("NotFound", () => {
  test("explains that the candidate is missing and links home", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: /candidate not found/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to candidates/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
