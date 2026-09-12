import { render, screen } from "@testing-library/react";
import Home from "../../src/app/page";

describe("Home", () => {
  test("renders the catalog heading and search", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /drug candidates/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: /search by name/i }),
    ).toBeInTheDocument();
  });
});
